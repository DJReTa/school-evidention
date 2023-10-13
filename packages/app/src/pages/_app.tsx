import ProtectedRoute from "@/components/ProtectedRoute";
import Provider from "@/context/Provider";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useState } from "react";
import { Hydrate, QueryClient, QueryClientProvider } from "react-query";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <Provider>
          <ProtectedRoute>
            <Component {...pageProps} />
            <ToastContainer />
          </ProtectedRoute>
        </Provider>
      </Hydrate>
    </QueryClientProvider>
  );
}
