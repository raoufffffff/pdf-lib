import { Outlet } from 'react-router-dom';
import Header from './compunent/header/Header';
const App = () => {

  return (
    <div
      className='w-full  min-h-screen bg-[#eee]'
    >
      <Header />
      <Outlet />
    </div>
  );
};

export default App;
