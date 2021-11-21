import { Route, Switch } from "react-router-dom";
import routers from "./constants";

export default function RouterClass() {
  return (
    // <BrowserRouter>
    <Switch>
      {routers.map((route) => (
        <Route
          key={route.path}
          path={route.path}
          exact
          component={route.component}
        />
      ))}
    </Switch>
    // </BrowserRouter>
  );
}
