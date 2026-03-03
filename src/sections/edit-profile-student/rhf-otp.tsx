
'use client';

import Stack from '@mui/material/Stack';
import { useRef, useEffect } from 'react';
import TextField, { TextFieldProps } from '@mui/material/TextField';

interface OTPInputProps {
  value: string;
  onChange: (otp: string) => void;
  disabled?: boolean;
  error?: boolean;
  helperText?: string;
  inputCount?: number;
}

export default function OTPInput({
  value,
  onChange,
  disabled = false,
  error = false,
  helperText = '',
  inputCount = 4,
  ...other
}: OTPInputProps & Omit<TextFieldProps, 'onChange'>) {
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);

  const handleChange = (index: number, input: string) => {
    const newValue = value.split('');
    newValue[index] = input;
    const newOtp = newValue.join('');
    onChange(newOtp);

    if (input && index < inputCount - 1) {
      setTimeout(() => {
        inputsRef.current[index + 1]?.focus();
      }, 10);
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !value[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  useEffect(() => {
    inputsRef.current[0]?.focus();
  }, []);

  return (
    <Stack
      direction="row"
      justifyContent="center"
      spacing={{ xs: 1.5, sm: 2 }}
      dir="ltr"
      flexWrap="nowrap"
    >
      {Array.from({ length: inputCount }).map((_, index) => (
        <TextField
          key={index}
          inputRef={(el: HTMLInputElement) => {
            inputsRef.current[index] = el;
          }}
          variant="outlined"
          value={value[index] || ''}
          onChange={(e) =>
            handleChange(index, e.target.value.replace(/\D/g, '').slice(-1))
          }
          onKeyDown={(e) =>
            handleKeyDown(index, e as React.KeyboardEvent<HTMLInputElement>)
          }
          type='text'
          inputMode='numeric'
          disabled={disabled}
          sx={{
            width: {
              xs: 55,
              sm: 70,
              md: 80,
              lg: 80,
            },
            height: {
              xs: 65,
              sm: 85,
              md: 95,
              lg: 95,
            },
            '& .MuiInputBase-root': {
              height: '100%',
              fontSize: { xs: '28px', sm: '34px', md: '40px' },
              textAlign: 'center',
              borderRadius: '8px',
            },
            '& .MuiInputBase-input': {
              padding: 0,
              textAlign: 'center',
              fontSize: { xs: '28px', sm: '34px', md: '40px' },
              fontWeight: 'bold',
              lineHeight: { xs: '65px', sm: '85px', md: '95px' },
              letterSpacing: '2px',
            },
          }}
          inputProps={{
            maxLength: 1,
            pattern: '[0-9]*',
            'aria-label': `الرقم ${index + 1} من رمز التحقق`
          }}
          error={error}
          helperText={index === 0 ? helperText : ''}
          placeholder="-"
          {...other}
        />
      ))}
    </Stack>
  );
}