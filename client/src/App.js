import React,{Fragment} from 'react';
import tailwindlogo from './tailwind-css-logo.svg';
import reactlogo from './react-logo.png';
import Navbar from './component/Navbar';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Signup from './component/Signup';
import Signin from './component/Signin';
import Weather from './component/Weather';
import Home from './component/Home';
import { Provider } from "react-redux";
import store from "./store";



const App = () => {
  return (
    <Provider store={store}>
    <Router>
    <Fragment className="">
      <Navbar/>
<Switch>
<Route exact path="/signup" component={Signup} />
<Route exact path="/signin" component={Signin} /> 
<Route exact path="/weather" component={Weather} /> 
<Route exact path="/home" component={Home} /> 

      </Switch>
    </Fragment>
    </Router>
     </Provider>
  );
}

export default App;
