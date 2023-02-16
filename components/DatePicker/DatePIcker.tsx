import { DatePicker, LocalizationProvider } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { TextField } from '@mui/material';
import React from 'react';

function DatePIcker () {
  const [value, setValue] = React.useState<Date | null>(null);
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DatePicker
        label="Helper text example"
        value={value}
        onChange={(newValue: any) => {
          setValue(newValue);
        }}
        renderInput={(params: any) => (
          <TextField {...params} helperText={params?.inputProps?.placeholder} />
        )}
      />
    </LocalizationProvider>
  );
}

export default DatePIcker;
