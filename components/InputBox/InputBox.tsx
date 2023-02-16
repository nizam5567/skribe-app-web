import { TextField } from '@mui/material';
import { styled } from '@mui/system';

const InputContainer = styled(TextField)`
  width: 100%;
  height: 42px;
  background: none;
  margin-bottom: 2rem;
  border: 0;
  .MuiInputLabel-root {
    font-size: 0.8rem;
    color: #b5b9bd;
    transform: translate(0.75rem, 1.188rem) scale(1);
    &.Mui-focused {
      font-size: 0.8rem;
      color: #b5b9bd;
      transform: translate(0.75rem, 0.5rem) scale(1);
    }
    &.MuiFormLabel-filled {
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
  .MuiFilledInput-input {
    font-size: 0.875rem;
  }
  .MuiFormHelperText-root {
    &.Mui-error {
      margin-top: -3rem;
      font-size: 0.8rem;
    }
  }
`;

const InputBox = ({
  label,
  type,
  required = false,
  name,
  onChange,
  value,
  error = false,
  helperText = ''
}: {
  label: string
  type: string
  required?: boolean
  name: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  value: string
  error?: boolean
  helperText?: string
}) => (
    <InputContainer
      name={name}
      id="filled-basic"
      label={label}
      variant="filled"
      required={required}
      type={type}
      onChange={onChange}
      value={value}
      error={error}
      helperText={error ? helperText : ''}
    />
);

export default InputBox;
