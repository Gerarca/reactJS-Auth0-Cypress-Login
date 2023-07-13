import { BrowserRouter ,Routes, Route } from 'react-router-dom'
import Header from './layout/header'; 
import Profile from './pages/profile';
import Home from './pages/home';
import Dashboard from './pages/dashboard';
import Contact from './pages/contact';
import About from './pages/about';
import Settings from './pages/settings';

function App() {

  return (    
    <BrowserRouter >
      <Header /> 
      <Routes>  
        <Route path='/' Component={Home} />
        <Route path='/home' Component={Home} />
        <Route path='/dashboard' Component={Dashboard} />
        <Route path='profile' Component={Profile} />
        <Route path='/contact' Component={Contact} />
        <Route path='/about' Component={About} />
        <Route path='/settings' Component={Settings} /> 
      </Routes>
    </BrowserRouter >
  );
}

export default App;
