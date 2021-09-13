import React,{useState} from "react";
import RegisterPage from './Component/RegisterPage'
import LoginPage from "./Component/LoginPage"
import {
  BrowserRouter as Router,
  Switch,
  Route

} from "react-router-dom";
import Dashboard from './Component/Dashboard';

function App() {
  
const [token, setToken] = useState();
if (!token) {
  return <LoginPage setToken={setToken} />
}
  return (
    <Router>
      <div>
        <Switch>
          <Route>
          <Route  path="/Register" component={RegisterPage} exact/>
          <Route path="/Dashboard" component={Dashboard} exact/>
          </Route>
                </Switch>
    
      </div>
    </Router>
  );
}

export default App;
