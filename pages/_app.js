import 'tailwindcss/tailwind.css';

import { useEffect } from 'react';

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    if (window.netlifyIdentity) {
      window.netlifyIdentity.on('init', user => {
        if (!user) {
          window.netlifyIdentity.on('login', () => {
            document.location.href = '/admin/';
          });
        }
      });
    }
  });

  return <Component {...pageProps} />;
}

export default MyApp;
