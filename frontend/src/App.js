
import './App.css';
import { Route,Routes } from 'react-router-dom';
import Regform from './components/forms/Regform';
import Login from './components/forms/Login';
import Frontpage from './components/frontpage/Frontpage';

function App() {
  return (
    <div className="App">
      
      {/* <Regform/> */}
      <Routes>

        <Route path='/' element={<Frontpage />} />
        <Route path='/register' element={<Regform />}/>
        <Route path='/login' element={<Login />}/>

      </Routes>


    </div>
  );
}

export default App;
