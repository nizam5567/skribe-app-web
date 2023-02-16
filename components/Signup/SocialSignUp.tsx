import { Box, Stack } from '@mui/material';
import { SocialLoginButton } from '@skribe/theme';
import AppleIcon from '../svg-components/AppleIcon';
import BlueGoogleIcon from '../svg-components/BlueGoogleIcon';
import MicrosoftIcon from '../svg-components/MicrosoftIcon';
import RightArrowIcon from '../svg-components/RightArrowIcon';

const SocialSignUp = () => (
    <Stack spacing={2} sx={{ 'mb': 2 }}>
      <SocialLoginButton
        icon={<BlueGoogleIcon />}
        label="Continue with Google"
      />
      <SocialLoginButton
        icon={<MicrosoftIcon />}
        label="Continue with Microsoft"
      />
      <SocialLoginButton icon={<AppleIcon />} label="Continue with Apple" />
    </Stack>
);
export default SocialSignUp;
