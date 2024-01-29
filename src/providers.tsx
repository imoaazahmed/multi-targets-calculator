import { useNavigate } from 'react-router-dom';

// Next UI
import { NextUIProvider } from '@nextui-org/react';

// Redux
import { Provider } from 'react-redux';
import store from '@/redux/store';

// React query
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

export function Providers({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();

  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <NextUIProvider navigate={navigate}>{children}</NextUIProvider>
      </Provider>

      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
