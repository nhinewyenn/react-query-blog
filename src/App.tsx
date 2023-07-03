/** @format */

import './App.css';
import { Posts } from './Posts';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const qc = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={qc}>
      <div className='App'>
        <h1>Blog Posts</h1>
        <Posts />
      </div>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
