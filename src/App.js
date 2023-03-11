import Register from "./components/Register";
import ipConfig from "./ipConfig.json";
import { Route, Switch } from "react-router-dom";
import Login from "./components/Login";
import Products from "./components/Products";

export const config = {
  endpoint: `http://${ipConfig.workspaceIp}:8082/api/v1`,
};

function App() {
  return (
    <div className="App">
<<<<<<< HEAD
      {/* TODO: CRIO_TASK_MODULE_LOGIN - To add configure routes and their mapping */}
          <Switch>
            <Route exact path = "/">
              <Products/>
            </Route>
            <Route exact path = "/register">
              <Register/>
            </Route>
            <Route exact path = "/login">
              <Login/>
            </Route>
          </Switch>
     </div>
=======
          <Register />
    </div>
>>>>>>> 87cebf390493aafc619e78b8de78058180be64ca
  );
}

export default App;
