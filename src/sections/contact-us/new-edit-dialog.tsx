import * as yup from 'yup';
import { useEffect } from 'react';
import { useSnackbar } from 'notistack';
import { LoadingButton } from '@mui/lab';
import { useForm } from 'react-hook-form';
import { useTranslations } from 'next-intl';
import { endpoints } from 'src/utils/endpoints';
import { yupResolver } from '@hookform/resolvers/yup';
import { FetchTags } from 'src/actions/config-actions';
import { editData, postData } from 'src/utils/crud-fetch-api';
import { invalidateTag } from 'src/actions/cache-invalidation';
import FormProvider, { RHFTextField } from 'src/components/hook-form';
import { RHFUploadAvatar } from 'src/components/hook-form/rhf-upload';
import { Grid2, Dialog, Button, DialogTitle, DialogContent, DialogActions } from '@mui/material';

interface Props {
  open: boolean;
  onClose: () => void;
  item?: {
    id: string;
    logoUrl: string;
    name: string;
    content: string;
  };
}

export default function NewEditSocialMediaDialog({ open, onClose, item }: Props) {
  const t = useTranslations();
  const { enqueueSnackbar } = useSnackbar();

  const isEdit = !!item;

  const labels = {
    LogoUrl: t('Global.Label.social_icon'),
    Name: t('Global.Label.name'),
    Content: t('Global.Label.content'),
  };

  const methods = useForm({
    resolver: yupResolver(
      yup.object().shape({
        LogoUrl: yup
          .mixed<File | string>()
          .required(t('Global.Validation.var_required', { var: labels.LogoUrl })),
        Name: yup.string().required(t('Global.Validation.var_required', { var: labels.Name })),
        Content: yup
          .string()
          .required(t('Global.Validation.var_required', { var: labels.Content })),
      })
    ),
    defaultValues: {
      LogoUrl: item?.logoUrl || '',
      Name: item?.name || '',
      Content: item?.content || '',
    },
  });

  const {
    handleSubmit,
    setValue,
    reset,
    formState: { isSubmitting },
  } = methods;
  const onSubmit = handleSubmit(async (data) => {
    const formData = new FormData();
    formData.append('Name', data.Name);
    formData.append('Content', data.Content);

    if (typeof data.LogoUrl !== 'string') {
      formData.append('LogoUrl', data.LogoUrl);
    }

    let res;
    if (isEdit) {
      res = await editData(endpoints.contactUs.patch(item!.id), 'PATCH', formData);
    } else {
      res = await postData(endpoints.contactUs.post, formData);
    }

    if ('error' in res) {
      enqueueSnackbar(res.error, { variant: 'error' });
    } else {
      const nameToShow = isEdit ? item?.name || data.Name : data.Name;

      enqueueSnackbar(
        isEdit
          ? t('Global.Server.Success.var_updated', {
              var: t('Pages.ContactUs.title_var', { var: nameToShow }),
            })
          : t('Global.Server.Success.var_created', {
              var: t('Pages.ContactUs.title_var', { var: nameToShow }),
            }),
        { variant: 'success' }
      );

      invalidateTag(FetchTags.ContactUs);
      onClose();
    }
  });

  useEffect(() => {
    if (open) {
      reset();
      if (item) {
        setValue('LogoUrl', item.logoUrl);
        setValue('Name', item.name);
        setValue('Content', item.content);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm" sx={{ alignItems: 'center' }}>
      <DialogTitle>
        {isEdit ? t('Pages.ContactUs.edit_title') : t('Pages.ContactUs.add_title')}
      </DialogTitle>
      <DialogContent>
        <FormProvider methods={methods}>
          <Grid2 container spacing={2} alignItems={'center'}>
            <Grid2 size={{ xs: 12, sm: 12 }}>
              <RHFUploadAvatar name="LogoUrl" label={labels.LogoUrl} />
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 6 }}>
              <RHFTextField name="Name" label={labels.Name} />
            </Grid2>
            <Grid2 size={{ xs: 12, sm: 6 }}>
              <RHFTextField name="Content" label={labels.Content} />
            </Grid2>
          </Grid2>
        </FormProvider>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={onClose}>
          {t('Global.Action.cancel')}
        </Button>
        <LoadingButton variant="contained" onClick={onSubmit} loading={isSubmitting}>
          {t('Global.Action.save')}
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
}
