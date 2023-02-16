import { FormControlLabel, FormGroup } from '@mui/material';
import { styled } from '@mui/material/styles';
import Switch, { SwitchProps } from '@mui/material/Switch';
import { Stipulation } from './types/stipulation';

const IOSSwitch = styled((props: SwitchProps) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  'width': 42,
  'height': 26,
  'padding': 0,
  '& .MuiSwitch-switchBase': {
    'padding': 0,
    'margin': 2,
    'transitionDuration': '300ms',
    '&.Mui-checked': {
      'transform': 'translateX(16px)',
      'color': '#fff',
      '& + .MuiSwitch-track': {
        'backgroundColor': theme.palette.mode === 'dark' ? '#3954E3' : '#3954E3',
        'opacity': 1,
        'border': 0
      },
      '&.Mui-disabled + .MuiSwitch-track': {
        'opacity': 0.5
      }
    },
    '&.Mui-focusVisible .MuiSwitch-thumb': {
      'color': '#33cf4d',
      'border': '6px solid #fff'
    },
    '&.Mui-disabled .MuiSwitch-thumb': {
      'color':
        theme.palette.mode === 'light'
          ? theme.palette.grey[100]
          : theme.palette.grey[600]
    },
    '&.Mui-disabled + .MuiSwitch-track': {
      'opacity': theme.palette.mode === 'light' ? 0.7 : 0.3
    }
  },
  '& .MuiSwitch-thumb': {
    'boxSizing': 'border-box',
    'width': 22,
    'height': 22
  },
  '& .MuiSwitch-track': {
    'borderRadius': 26 / 2,
    'backgroundColor': theme.palette.mode === 'light' ? '#7C8286' : '#7C8286',
    'opacity': 1,
    'transition': theme.transitions.create(['background-color'], {
      'duration': 500
    })
  }
}));

interface CustomizedSwitchesProps {
  handleSwitch: Function
  defaultSelected: boolean
}

export default function CustomizedSwitches ({
  handleSwitch,
  defaultSelected
}: CustomizedSwitchesProps) {
  return (
    <FormGroup>
      <FormControlLabel
        control={
          <IOSSwitch
            sx={{ 'mx': 1 }}
            defaultChecked={!!defaultSelected}
            onChange={(e) => handleSwitch(e.target.checked)}
          />
        }
        label="Use Skribe Default Stipulation"
      />
    </FormGroup>
  );
}
