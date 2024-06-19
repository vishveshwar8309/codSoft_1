import { Outlet } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function App() {
  return (
    <div >
      <div><Header /></div>
      <Outlet />
      <ToastContainer />
    </div>
  );
}

export default App;
