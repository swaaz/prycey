import Home from "./components/home/Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Signup from "./components/signup/Signup";
import Signin from "./components/signin/Signin";
import Sell from "./components/sell/Sell";
import Search from "./components/search/Search";
import ProductPage from "./components/productPage/ProductPage";
import Profile from "./components/profile/Profile";
import Dashboard from "./components/dashboard/Dashboard";
import sellerInfo from "./components/sellerInfo/sellerInfo";
import searchResult from "./components/searchResult/searchResult";
function App() {
  return (
    <Router>
      <div className="Styles.App">
        <Switch>
          <Route path='/search/:value' component={searchResult} />
          <Route path='/seller' component={sellerInfo} />
          <Route path='/dashboard' component={Dashboard} />
          <Route path='/profile' component={Profile} />
          <Route path='/sell' component={Sell} />
          <Route path='/product/category/:category' component={Search} />
          <Route path='/product/:productid' component={ProductPage} />
          {/* <Route path='/search' component={Search} /> */}
          <Route path='/signin' component={Signin} />
          <Route path='/signup' component={Signup} />
          <Route path='/' exact component={Home} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
