'use client';

import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { useQuery } from 'src/components/use-query';
import { useNameValue } from 'src/utils/locale-utils';
import { RHFTextField } from 'src/components/hook-form';
import RHFSwitch from 'src/components/hook-form/rhf-switch';
import { Card, Stack, CardProps, CardContent } from '@mui/material';
import RHFAutocomplete from 'src/components/hook-form/rhf-autocomplete';

import { useFormStore } from './form-store';

export default function ProductFormInfo(props: CardProps) {
  const nameVal = useNameValue();
  const { setValue } = useFormContext();
  const { categories, subCategories, labels, product } = useFormStore();
  const { values, changeQueries } = useQuery(['mainCategoryId']);

  useEffect(() => {
    changeQueries({ mainCategoryId: product?.category.parentCategory?.id }, true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product]);

  return (
    <Card {...props}>
      <CardContent>
        <Stack spacing={2}>
          <RHFTextField name="NameAr" color="primary" label={labels.NameAr} />
          <RHFTextField name="NameEn" color="primary" label={labels.NameEn} />
          <RHFTextField
            name="Barcode"
            color="primary"
            label={labels.Barcode}
            slotProps={{ input: { inputProps: { maxLength: 21 } } }}
          />
          <RHFTextField name="DescriptionAr" color="primary" label={labels.DescriptionAr} />
          <RHFTextField name="DescriptionEn" color="primary" label={labels.DescriptionEn} />
          {/* here */}
          <RHFAutocomplete
            name="mainCategory"
            color="primary"
            label={labels.Category}
            options={categories}
            value={categories.find((item) => item.id === values.mainCategoryId)}
            getOptionLabel={(option) =>
              typeof option === 'string'
                ? categories.find((item) => item.id === option)?.[nameVal] || option
                : option[nameVal] || ''
            }
            onChange={(_, newValue) => {
              if (typeof newValue === 'string' || Array.isArray(newValue)) return;
              setValue('mainCategory', newValue);
              setValue('Category', null);
              changeQueries({ mainCategoryId: newValue?.id });
            }}
          />
          <RHFAutocomplete
            name="Category"
            color="primary"
            label={labels.SubCategory}
            options={subCategories}
            getOptionLabel={(option) =>
              typeof option === 'string'
                ? categories.find((item) => item.id === option)?.[nameVal] || option
                : option[nameVal] || ''
            }
          />
          <RHFSwitch name="IsActive" label={labels.IsActive} />
        </Stack>
      </CardContent>
    </Card>
  );
}
