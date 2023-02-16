import styled from '@emotion/styled';
import { DatePicker, LocalizationProvider } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { TextField } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import React from 'react';
import { Box } from '@mui/system';
import DatePickerIcon from '../svg-components/DatePickerIcon';

const InputContainer = styled(TextField)`
  width: 100%;
  height: 42px;
  background: none;
  margin-bottom: 0.8rem;
  border: 0;
  .MuiInputLabel-root {
    font-size: 0.8rem;
    color: #b5b9bd;
    height: 100%;
    width: 100%;
    z-index: 0;
    transform: translate(0.75rem, 0.5rem) scale(1);
    transition: all 0.2s;
    &:after {
      font-size: 0.875rem;
      color: #000000;
      content: "Select Date";
      margin: 1.2rem;
      position: absolute;
      left: -1.2rem;
    }
    &.Mui-focused {
      font-size: 0.8rem;
      color: #b5b9bd;
      transform: translate(0.75rem, 0.5rem) scale(1);
    }
    &.MuiFormLabel-filled {
      transform: translate(0.75rem, 0.5rem) scale(1);
      width: 4rem;
      &:after {
        content: "";
      }
    }
    &.Mui-error {
      &:after {
        content: "";
      }
    }
  }
  .MuiFilledInput-root {
    background: 0;
    border: 0px solid #e8ebf2;
    border-radius: 0.25rem;
    outline: 0;
    &:hover {
      background: none;
      border: 0px solid #c5c7cc;
      &:not(.Mui-disabled):before {
        border: 0;
      }
    }
    &.Mui-focused {
      background: none;
      &:after {
        border: 0;
      }
    }
    &:before {
      border: 0;
    }
    &:after {
      transition: none;
    }
    .MuiIconButton-root {
      color: #3954e3;
    }
  }
  .MuiFilledInput-input {
    font-size: 0.875rem;
    &::-webkit-input-placeholder {
      color: transparent;
      -webkit-transition: color 0.2s ease;
      transition: color 0.2s ease;
    }

    &:-moz-placeholder {
      /* Firefox 18- */
      color: transparent;
      -webkit-transition: color 0.2s ease;
      transition: color 0.2s ease;
    }

    &::-moz-placeholder {
      /* Firefox 19+ */
      color: transparent;
      -webkit-transition: color 0.2s ease;
      transition: color 0.2s ease;
    }

    &:-ms-input-placeholder {
      color: transparent;
      -webkit-transition: color 0.2s ease;
      transition: color 0.2s ease;
    }
  }
  .MuiFormHelperText-root {
    margin-top: -1.7rem;
  }
`;

interface DatePickerProps {
  dateValue: Date | null | undefined
  setDateValue: (item: any) => void
  error: boolean
  helperText: string
}

function DatePickers ({
  dateValue,
  setDateValue,
  error,
  helperText
}: DatePickerProps) {
  const [value, setValue] = React.useState<Date | null>(null);
  return (
    <Box
      sx={{
        'display': 'flex',
        'alignItems': 'baseline',
        'justifyContent': 'space-evenly',
        'border': '1px solid #e8ebf2',
        'paddingLeft': '1rem',
        'width': '100%',
        'borderRadius': '0.25rem',
        '&:hover': {
          'border': '1px solid #c5c7cc'
        }
      }}
    >
      <DatePickerIcon color="#3954E3" />
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
          label="Date"
          value={dateValue}
          disablePast
          components={{
            'OpenPickerIcon': KeyboardArrowDownIcon
          }}
          onChange={(newValue: any) => {
            setDateValue(newValue);
          }}
          renderInput={(params: any) => (
            <InputContainer
              {...params}
              placeholder="Select Date"
              variant="filled"
              error={error}
              helperText={error ? helperText : ''}
            />
          )}
        />
      </LocalizationProvider>
    </Box>
  );
}

export default DatePickers;
