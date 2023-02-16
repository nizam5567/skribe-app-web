import { useMediaQuery } from '@mui/material';

export const useMeetingWindowSize = () => {
  const md = useMediaQuery('(min-width:960px)', { 'noSsr': true });
  const lg = useMediaQuery('(min-width:1366px)', { 'noSsr': true });
  if (lg) {
    return { 'width': 990, 'height': 542 };
  }
  if (md) {
    return { 'width': 600, 'height': 338 };
  }

  return { 'width': 600, 'height': 338 };
};
