import { Outlet } from 'react-router-dom';
import BottomNav from './components/BottomNav';

function App() {
  return (
    <div className='App min-h-screen w-[600px]'>
      <Outlet />
      <BottomNav/>
    </div>
  );
}

export default App;
