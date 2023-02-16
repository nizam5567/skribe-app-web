/** @type {import('next').NextConfig} */
const { withSentryConfig } = require('@sentry/nextjs');
const path = require('path');

const sentryWebpackPluginOptions = {
  // Additional config options for the Sentry Webpack plugin. Keep in mind that
  // the following options are set automatically, and overriding them is not
  // recommended:
  //   release, url, org, project, authToken, configFile, stripPrefix,
  //   urlPrefix, include, ignore

  'silent': true // Suppresses all logs
  // For all available options, see:
  // https://github.com/getsentry/sentry-webpack-plugin#options.
};
const withTM = require('next-transpile-modules')(['react-documents']);

const config = withTM(withSentryConfig(
  {
    'reactStrictMode': true,
    async redirects () {
      return [
        {
          'source': '/',
          'destination': '/home',
          'permanent': true
        }
      ];
    },
    'exportPathMap': async function (defaultPathMap, { dev, dir, outDir, distDir, buildId }) {
      return {
        '/': { 'page': '/' },
        '/signup': { 'page': '/signup' },
        '/signin': { 'page': '/signin' },
        '/home': { 'page': '/home' }
        // "/events": { page: "/events" },
        // "/event-details": { page: "/event-details" },
        // '/event-invitation': { page: '/event-invitation' },
        // '/event-room': { page: '/event-room' },
        // "/matters": { page: "/matters" },
        // "/matter-details": { page: "/matter-details" },
      };
    },
    'poweredByHeader': false,
    // images: {
    //   loader: "akamai",
    //   path: "/",
    // },
    // assetPrefix: './',
    'sentry': {
      // See the 'Configure Source Maps' and 'Configure Legacy Browser Support'
      // sections below for information on the following options:
      //   - disableServerWebpackPlugin
      //   - disableClientWebpackPlugin
      //   - hideSourceMaps
      //   - widenClientFileUpload
      //   - transpileClientSDK
    }
  },
  sentryWebpackPluginOptions
));
config.eslint = {
  // Warning: This allows production builds to successfully complete even if
  // your project has ESLint errors.
  'ignoreDuringBuilds': true
};

module.exports = config;
