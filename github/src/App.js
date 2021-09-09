import RegisterPage from './Component/RegisterPage'
import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route

} from "react-router-dom";
function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route>
          <RegisterPage />
  
          </Route>
        </Switch>
    
      </div>
    </Router>
  );
}

export default App;
