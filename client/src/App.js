import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import { useSelector } from 'react-redux';
import Loader from './components/Loader';
import OrderDetails from './pages/OrderDetails';

function App() {
  const { loading } = useSelector((state) => state.alerts);
  const user = localStorage.getItem("token");
  return (
    <div className="App">
      {loading && <Loader />}
      <BrowserRouter>
        <Routes>
          <Route path='/' element={user ? <Home /> : <Navigate to="/login" />} />
          <Route path='/register' element={user ? <Navigate to="/" /> : <Register />} />
          <Route path='/login' element={user ? <Navigate to="/" /> : <Login />} />
          <Route path='/get-order-details' element={user ? <OrderDetails/> : <Navigate to="/login" />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
