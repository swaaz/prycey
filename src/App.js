import Styles from "./App.module.scss"
import Home from "./components/home/Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Signup from "./components/signup/Signup";
import Signin from "./components/signin/Signin";
import Search from "./components/search/Search";
import ProductPage from "./components/productPage/ProductPage";
function App() {
  return (
    <Router>
      <div className="Styles.App">
        <Switch>
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
