import Public from "./components/Public";
import Layout from "./components/Layout";
import Login from "./features/auth/Login"
import { Routes, Route } from 'react-router-dom';
import RequiredAuth from "./components/RequiredAuth";
import Welcome from "./components/Welcome";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>

        <Route index element={<Public />} />
        <Route path="login" element={<Login />} />

        <Route element={<RequiredAuth />}>
          <Route path="welcome" element={<Welcome />} />
        </Route>

      </Route>
    </Routes>
  );
}

export default App;
