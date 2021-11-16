import React from 'react';
import { BrowserRouter as Router,
    Route,
    Switch, 
} from 'react-router-dom';
import Login from '../login/login';
import PrivateRoute from '../auth/privateroute';

export default function AppRouter() {
    return(
        <Router>
            <Switch>
                <Route exact path={["/", "/login"]} component={Login}/>
                <PrivateRoute exact path="/home" component={Home} />
                <Route 
                path={'*'} 
                component={() => (
                    <h2 style={{ marginTop: 200 }}>
                        404
                        <br />
                        PAGINA NO ENCONTRADA
                    </h2>
                )} 
                />
            </Switch>
        </Router>
     );
}

function Home() {
    return <h2> Home</h2>;
}