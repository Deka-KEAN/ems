
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { Login } from "./pages/Login";
import { Dashboard } from "./pages/Dashboard";
import { Register } from "./pages/Register";
import { EmployeeDashboard } from "./pages/EmployeesDashboard";

function App() {
  return (
    <div>
      <h1>EMS</h1>
      <div>
        <Router>
          <Routes>
            <Route path="/*" element={<Dashboard/>}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/dashboard" element={<Dashboard/>}/>
            <Route path="/employee-dashboard" element={<EmployeeDashboard/>}/>
          </Routes>
        </Router>
      </div>
    </div>
  )
}

export default App
