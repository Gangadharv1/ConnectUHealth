import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import FindDoctors from './pages/FindDoctors';
import RequestAppointment from './pages/RequestAppointment';

function App() {
  return (
    <div className="container">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/find-doctors" element={<FindDoctors />} />
        <Route path="/request-appointment" element={<RequestAppointment />} />
      </Routes>
    </div>
  );
}

export default App;