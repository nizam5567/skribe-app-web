import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
import createEmotionServer from '@emotion/server/create-instance';
import Document, { Head, Html, Main, NextScript } from 'next/document';
import { Children } from 'react';

function createEmotionCache () {
  return createCache({ 'key': 'css' });
}

export default class AppDocument extends Document {
  render () {
    return (
      <Html lang="en">
        <Head>
          <meta charSet="utf-8" />

          {/* Font */}

          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
            rel="stylesheet"
          />

          {/* SEO */}

          <meta name="author" content="Skribe" />

          <script src="https://apis.google.com/js/api.js" async></script>
          <script src="https://accounts.google.com/gsi/client" async></script>
        </Head>

        <body>
          <Main />
          <NextScript />
          <script id="ze-snippet" src="https://static.zdassets.com/ekr/snippet.js?key=aa67d01f-c7b5-43fc-a485-f59c36db3dcc" async />
        </body>
      </Html>
    );
  }
}

AppDocument.getInitialProps = async (ctx) => {
  const originalRenderPage = ctx.renderPage;

  // You can consider sharing the same emotion cache between all the SSR requests to speed up performance.
  // However, be aware that it can have global side effects.
  const cache = createEmotionCache();
  const { extractCriticalToChunks } = createEmotionServer(cache);

  ctx.renderPage = () => originalRenderPage({
    'enhanceApp': (App: any) => function EnhanceApp (props) {
      return <App emotionCache={cache} {...props} />;
    }
  });

  const initialProps = await Document.getInitialProps(ctx);
  // This is important. It prevents emotion to render invalid HTML.
  // See https://github.com/mui/material-ui/issues/26561#issuecomment-855286153
  const emotionStyles = extractCriticalToChunks(initialProps.html);
  const emotionStyleTags = emotionStyles.styles.map((style: any) => (
    <style
      data-emotion={`${style.key} ${style.ids.join(' ')}`}
      key={style.key}
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ '__html': style.css }}
    />
  ));

  return {
    ...initialProps,
    emotionStyleTags
  };
};
