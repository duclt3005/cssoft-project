// libs
import "bootstrap";
import { Suspense } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Provider as ReduxProvider } from "react-redux";
// routes
import appRoutes from "@/routers";
// others
import { store } from "@/redux/store";
import "@/styles/base.scss";

/**
 * App
 */
export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback="Suspensed">
        <ReduxProvider store={store}>
          <Switch>
            {appRoutes.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                exact={route.exact}
                component={route.component}
              />
            ))}
          </Switch>
        </ReduxProvider>
      </Suspense>
    </BrowserRouter>
  );
}
