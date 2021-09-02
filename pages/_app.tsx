import React from 'react';
import PropTypes from 'prop-types';
import type { AppProps /*, AppContext */ } from 'next/app';
import { ThemeProvider} from '@material-ui/core/styles';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';
import {CssBaseline} from '@material-ui/core/';
import {useStore} from '../store/configureStore'
import theme from '../theme';
import '../styles/globals.css';
function MyApp({ Component, pageProps }: AppProps) {

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement!.removeChild(jssStyles);
    }
  }, []);

  const store = useStore(pageProps.initialReduxState)

  const persistor = persistStore(store, {}, function() {
    persistor.persist()
  })

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
      </PersistGate>
    </Provider>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};


export default MyApp;
