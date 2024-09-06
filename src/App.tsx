import { Outlet } from 'react-router-dom';
import { RecoilRoot } from 'recoil';

import BottomNav from './components/navigation/BottomNav';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <div className='App min-h-screen w-[600px]'>
          <Outlet />
          <BottomNav />
        </div>
      </RecoilRoot>
    </QueryClientProvider>
  );
}

export default App;
