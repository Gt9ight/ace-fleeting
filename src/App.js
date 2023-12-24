import { Routes, Route } from "react-router-dom";
import Home from "./components/home/Home";
import FleetList from "./components/tech/FleetList";
import FleetForm from "./components/fleet-manager/FleetForm";
import Customerprogress from "./components/customer/CustomerProgress";
import Authentication from "./components/authentication/Authentication";
function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/fleetform" element={<Authentication />} />
        <Route path="/technicianfleets" element={<FleetList />} />
        <Route path="/customerfleets" element={<Customerprogress />} />
      </Routes>
    </div>
  );
}

export default App;
