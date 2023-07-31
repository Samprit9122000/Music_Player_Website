
import './App.css';
import { Route,Routes } from 'react-router-dom';
import Regform from './components/forms/Regform';
import Login from './components/forms/Login';
import Frontpage from './components/frontpage/Frontpage';
import Home from './components/home/Home';
import About from './components/about/About';
import Dashboard from './components/dashboard/Dashboard';
import Contact from './components/contact/Contact';

function App() {
  return (
    <div className="App">
      
      {/* <Regform/> */}
      <Routes>

        <Route path='/' element={<Frontpage />} />
        <Route path='/register' element={<Regform />}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/home' element={<Home/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='/contact' element={<Contact/>}/>

      </Routes>


    </div>
  );
}

export default App;
