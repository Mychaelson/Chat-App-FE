import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./component/navbar";
import LoginPage from "./pages/login";
import RegisterPage from "./pages/register";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
