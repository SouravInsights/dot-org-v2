/* eslint-disable import/no-unresolved */
/* eslint-disable react/jsx-props-no-spreading */
import '@rainbow-me/rainbowkit/styles.css';
import type { AppProps } from 'next/app';
// import { DefaultSeo } from 'next-seo';
import { SessionProvider } from 'next-auth/react';
import { WagmiConfig } from 'wagmi';
import { QueryClient, QueryClientProvider, QueryCache } from '@tanstack/react-query';
import { RGThemeProvider, useToast } from '@raidguild/design-system';
import { RainbowKitProvider, darkTheme } from '@rainbow-me/rainbowkit';
import { RainbowKitSiweNextAuthProvider } from '@rainbow-me/rainbowkit-siwe-next-auth';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { chains } from '../utils/chains';
import { wagmiClient } from '../utils/wagmiClient';
import { AppContextProvider } from '../context/appState';
// import '@raidguild/design-system/src/assets/css/fonts.css';
import '@fontsource/jetbrains-mono';

export default function App({ Component, pageProps }: AppProps) {
  const toast = useToast();
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchInterval: 120 * 1000,
        refetchOnWindowFocus: false,
      },
    },
    queryCache: new QueryCache({
      onError: (error) => {
        toast.success({
          title: 'Something went wrong.',
          description: `Please try again: ${error}`,
        });
      },
    }),
  });

  return (
    <RGThemeProvider>
      <WagmiConfig client={wagmiClient}>
        <SessionProvider refetchInterval={120} session={pageProps.session}>
          <RainbowKitSiweNextAuthProvider>
            <RainbowKitProvider chains={chains} theme={darkTheme()}>
              <QueryClientProvider client={queryClient}>
                <AppContextProvider>
                  <Component {...pageProps} />
                  <ReactQueryDevtools initialIsOpen={false} />
                </AppContextProvider>
              </QueryClientProvider>
            </RainbowKitProvider>
          </RainbowKitSiweNextAuthProvider>
        </SessionProvider>
      </WagmiConfig>
    </RGThemeProvider>
  );
}
