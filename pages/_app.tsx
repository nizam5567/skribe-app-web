import '../styles/globals.scss';
import type { AppProps } from 'next/app';
import { ThemeProvider } from '@mui/material/styles';
import Script from 'next/script';
import { getSkribeTheme } from '@skribe/theme';
import { Provider } from 'react-redux';
import { Amplify } from 'aws-amplify';
import { AuthProvider } from '../contexts/AuthContext';
import CustomizedSnackbars from '../components/snackbar/index';
import store from '../redux/store/store';
import PrivateRoute from '../components/PrivateRoute';
import MobileInfoModal from '../components/v2/common/MobileInfoModal';
import { PrivateRouteNew } from '../components/PrivateRouteNew';

Amplify.configure({
  'Auth': {
    'region': process.env.NEXT_PUBLIC_REGION,
    'identityPoolRegion': process.env.NEXT_PUBLIC_REGION,
    'userPoolId': process.env.NEXT_PUBLIC_USERPOOL_ID,
    'userPoolWebClientId': process.env.NEXT_PUBLIC_USER_POOL_WEB_CLIENT_ID
  }
});

function MyApp ({ Component, pageProps }: AppProps) {
  const theme = getSkribeTheme({});
  // Add your public routes here
  return (
    <Provider store={store}>
      <AuthProvider pageProps={pageProps}>
        <PrivateRouteNew>
          <ThemeProvider theme={theme}>
            <Script id="gtm-script" strategy="lazyOnload" src={'https://www.googletagmanager.com/gtag/js?id=G-9K7GKQYK4S'} />

            <Script id="google-analytics" strategy="lazyOnload">
              {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-9K7GKQYK4S');`}
            </Script>
            <MobileInfoModal />
            <CustomizedSnackbars />
            <Component {...pageProps} />
          </ThemeProvider>
        </PrivateRouteNew>
      </AuthProvider>
    </Provider>
  );
}

export default MyApp;
