import { Outlet } from 'react-router';
import './App.css';
import Footer from './assets/Shared/Footer';
import Header from './assets/Shared/Header';
import HeaderAdmin from './assets/Shared/headerComponents/HeaderAdmin';


function App() {
 
return (
    
  <>
  <Header />
    <Outlet />
    <Footer />
  </>
    
  );
}

export default App;