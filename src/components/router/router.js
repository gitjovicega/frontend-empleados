import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "../Login/Login";
import PrivateRoute from "../Auth/PrivateRoute";
import Empleados from "../empleados/index";



export default function AppRouter() {
    return(
        <Router>
            <Switch>
                <Route exact path={ [ "/", "/login" ] } component={ Login }/>
                <PrivateRoute exact path={ [ "/empleados" ] } component={ Empleados }/> 
                
                <Route path={ "*" } component={ () => (
                    <h1 style={{ marginTop: 300 }}>
                        404
                        <br />
                        Pagina no encontrada
                    </h1>
                ) } />
            </Switch>
        </Router>
     )
}

/*function home (){
    return (
        <h2 style ={{ marginTop: 200}}>Home</h2>
    )
}*/
