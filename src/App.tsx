/** @format */

import { useState } from 'react';
import './App.css';
import { Posts } from './Posts';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const qc = new QueryClient();

function App() {
  const [count, setCount] = useState(0);

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
