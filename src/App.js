import Home from "./components/home/Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Signup from "./components/signup/Signup";
import Signin from "./components/signin/Signin";
import Sell from "./components/sell/Sell";
import Search from "./components/search/Search";
import ProductPage from "./components/productPage/ProductPage";
import Profile from "./components/profile/Profile";
function App() {
  return (
    <Router>
      <div className="Styles.App">
        <Switch>
          <Route path='/profile' component={Profile} />
          <Route path='/sell' component={Sell} />
          <Route path='/product/category/:category' component={Search} />
          <Route path='/product/:productid' component={ProductPage} />
          <Route path='/search' component={Search} />
          <Route path='/signin' component={Signin} />
          <Route path='/signup' component={Signup} />
          <Route path='/' exact component={Home} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
