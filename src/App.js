import { Routes, Route } from "react-router-dom";
import Home from "./components/home/Home";
import FleetList from "./components/tech/FleetList";
import FleetForm from "./components/fleet-manager/FleetForm";
import Customerprogress from "./components/customer/CustomerProgress";
import SigninForm from "./components/signin/SigninForm";
function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/fleetform" element={<FleetForm />} />
        <Route path="/technicianfleets" element={<FleetList />} />
        <Route path="/customerfleets" element={<Customerprogress />} />
        <Route path="sign-in" element={<SigninForm />}/>
      </Routes>
    </div>
  );
}

export default App;
