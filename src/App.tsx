import { Outlet } from 'react-router-dom';
import { RecoilRoot } from 'recoil';

import BottomNav from './components/navigation/BottomNav';

function App() {
  return (
    <RecoilRoot>
      <div className='App min-h-screen w-[600px]'>
        <Outlet />
        <BottomNav />
      </div>
    </RecoilRoot>
  );
}

export default App;
