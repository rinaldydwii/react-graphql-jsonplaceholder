import React from "react"
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { routes } from "./routes";

const Router = () => (
    <BrowserRouter>
        <Switch>
            { routes.map((route, index) => (
                <Route exact={route.exact} path={route.path} component={route.component} key={index} />
            ))}
        </Switch>
    </BrowserRouter>
)

export default Router;