import { Route, Routes, useNavigate, useNavigation } from "react-router-dom";
import Home from "./container/Home";
import { useEffect } from "react";
import Login from "./components/Login";

const App = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const User = localStorage.getItem('user') !== 'undefined' ? JSON.parse(localStorage.getItem('user')) : localStorage.clear();

    if (!User) navigate('/login');
  }, []);

  return (
    <Routes>
      <Route path='login' element={<Login />} />
      <Route path='/*' element={<Home />} />
    </Routes>
  );
};

export default App;
