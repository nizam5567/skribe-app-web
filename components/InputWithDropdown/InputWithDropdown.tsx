import { styled } from '@mui/system';
import {
  SelectChangeEvent,
  TextField,
  Autocomplete,
  Card,
  Button
} from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import React, { useState } from 'react';
import { boolean } from 'yup/lib/locale';
import { BaseTextField } from '@skribe/theme';
import { validateYupSchema } from 'formik';

const AutoCompleteContainer = styled(Autocomplete)`
  width: 100% !important;
  .css-viou3o-MuiAutocomplete-root {
    width: 100%;
  }
  .MuiOutlinedInput-notchedOutline {
    //border: none;
  }
  + .MuiAutocomplete-popper {
    border: 1px solid #c5c7cc;
    font-size: 0.8rem;
    .MuiAutocomplete-option {
      margin: 0rem 1rem;
      padding: 0.7rem 1rem;
      border-radius: 0.25rem;
      font-size: 0.875rem;
    }
  }
`;

const InputWithDropdown = ({
  eventName = '',
  title,
  name,
  required = false,
  onChange,
  onInputChange,
  value,
  options,
  addNew = false,
  error = false,
  helperText = ''
}: {
  eventName?: string
  title: string
  name: string
  required?: boolean
  onChange: (e: React.SyntheticEvent) => void
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  value: string
  options: Array<{ label: string }>
  addNew?: boolean
  error?: boolean
  helperText?: string
}) => {
  const InputContainer = styled(TextField)`
    width: 100%;
    height: 42px;
    background: none;
    margin-bottom: 2rem;
    border: 0;
    //border: 1px solid #E8EBF2;
    //border-radius: 4px;
    &:hover {
      .MuiInputLabel-root {
        &::after {
          //content: ${required ? "' *'" : ''};
        }
      }
    }
    .MuiInputLabel-root {
      font-size: 0.8rem;
      color: #b5b9bd;
      transform: translate(0.75rem, 1.188rem) scale(1);
      &.Mui-focused {
        font-size: 0.8rem;
        color: #b5b9bd;
        transform: translate(0.75rem, 0.5rem) scale(1);
        &::after {
          //content: ${required ? "' *'" : ''};
        }
      }
      &.MuiFormLabel-outlined {
        transform: translate(0.75rem, 0.5rem) scale(1);
      }
      &.Mui-error {
        transform: translate(0.75rem, 0.5rem) scale(1);
        color: #d32f2f;
        visibility: hidden;
      }
    }
    .MuiFilledInput-root {
      background: 0;
      border: 1px solid #e8ebf2;
      border-radius: 0.25rem;
      outline: 0;
      &:hover {
        background: none;
        border: 1px solid #c5c7cc;
        &:not(.Mui-disabled):before {
          border: 0;
        }
      }
      &.Mui-focused {
        background: none;
        border: 1px solid #3954e3;
        border-radius: 0.25rem 0.25rem 0 0;
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
    }
    .MuiAutocomplete-clearIndicator {
      display: none;
    }
    .MuiAutocomplete-popupIndicator {
      color: #3954e3;
    }
    .MuiFilledInput-input {
      font-size: 0.875rem;
    }
    .MuiFormHelperText-root {
      &.Mui-error {
        font-size: 12px;
        margin-left: 3px;
      }
    }
  `;
  return (
    <AutoCompleteContainer
      disablePortal
      id="combo-box-demo"
      options={options}
      sx={{ 'width': 300 }}
      popupIcon={<KeyboardArrowDownIcon />}
      onChange={(e: React.SyntheticEvent) => onChange(e)}
      isOptionEqualToValue={(option: any, values) => option.label === values}
      value={value === '' ? null : value}
      renderInput={(params) => (
        <BaseTextField
          {...params}
          label={title}
          type="text"
          name={name}
          value={value === '' ? null : value}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => onInputChange(e)}
          error={error}
          helperText={error ? helperText : ''}
          InputLabelProps={{ 'style': { 'color': error ? '#B5B9BD' : '' } }}
          FormHelperTextProps={{
            'style': { 'marginLeft': '3px', 'fontSize': '12px' }
          }}
          sx={{
            'bgcolor': '#fff',
            'width': '100%',
            'borderRadius': 1,
            '& .MuiOutlinedInput-root': {
              'border': 'unset',
              'fontSize': '0.875rem !important',
              'paddingTop': '19px',
              'paddingBottom': '0px'
            },
            '& .MuiInputLabel-root': {
              'fontSize': '0.875rem !important'
            }
          }}
        />
      )}
      // PaperComponent={({ children }) => (
      //   <Card>
      //     {children}

      //     {addNew ? (
      //       <Button
      //         style={{
      //           padding: "1rem 4rem",
      //           width: "100%",
      //           borderTop: "1px solid #c5c7cc",
      //           borderRadius: "0",
      //           display: "inline-flex",
      //           justifyContent: "flex-start",
      //           color: "#000000de",
      //           fontSize: "0.8rem",
      //         }}
      //         onMouseDown={() => console.log("clicked")}
      //       >
      //         + Create New {eventName}
      //       </Button>
      //     ) : (
      //       ""
      //     )}
      //   </Card>
      // )}
    />
  );
};

export default InputWithDropdown;
