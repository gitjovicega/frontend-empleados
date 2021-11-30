
//import { Container } from 'react-bootstrap';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
//import Login from './components/login/login';
import Menu from './components/Navbar/Navbar';

import AppRouter from './components/Router/Router';

function App() {
  return (
    <div className="App">
      
      <Menu />
        <AppRouter />
      
    </div>
  );
}

export default App;
