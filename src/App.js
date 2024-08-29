import { Route, Routes } from 'react-router-dom';
import AdminDash from './pages/AdminDash';
import AddProd from './pages/AddProd';
import PhonePage from './pages/PhonePage';
import PC from './pages/PC';
import ConsGamePage from './pages/ConsGamePage';
import './App.css';

function App() {
  return (
    <Routes>
      <Route path="/PPGadminsite" element={<AdminDash />} />
      <Route path="/addproduct" element={<AddProd />} />
      <Route path="/PC" element={<PC />} />
      <Route path="/phone" element={<PhonePage />} />
      <Route path="/consgame" element={<ConsGamePage />} />
    </Routes>
  );
}

export default App;
