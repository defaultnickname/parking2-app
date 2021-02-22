import React, {Component} from "react";
import {render} from "react-dom";
import {BrowserRouter, Switch} from "react-router-dom";
import Route from "react-router-dom/Route"
import 'react-week-calendar/dist/style.less';
import MyCustomCalendar from "./CustonCalendar";
import Register from "./Register"
import Login from "./Login"
import Profile from "./Profile"
import {authenticationService} from "../services/authenticationservice";
import {PrivateRoute} from "../services/privateroute";


export default class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentUser: null
        };
    }

   



    render() {
        return (<div>

                <BrowserRouter>
                    <div>

                        <div className="jumbotron">
                            <div className="container">
                                <div className="row">
                                    <div className="col-md-6 offset-md-3">

                                        <PrivateRoute exact path="/profile" component={Profile}/>
                                        <Route path="/login" component={Login}/>
                                        <Route path="/register" component={Register}/>
                                        <PrivateRoute exact path="/" component={MyCustomCalendar}/>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </BrowserRouter>
            </div>
        );
    }
}


const appDiv = document.getElementById("app");
render(<App/>, appDiv);