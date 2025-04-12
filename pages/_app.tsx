
import { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { store } from '../app/store';
import { CssBaseline, ThemeProvider } from '@mui/material';
import theme from '../theme';// optional MUI theme
import '../styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store ={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </Provider>
  );
}

