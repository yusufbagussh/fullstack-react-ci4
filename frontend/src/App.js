import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ProductList from "./components/ListProduct";
import AddProduct from "./components/AddProduct";
import EditProduct from "./components/EditProduct";
import ListUser from "./components/ListUser";
import AddUser from "./components/AddUser";
import EditUser from "./components/EditUser";

function App() {
  return (
    <Router>
      <div className="container">
        <Switch>
          <Route exact path="/">
            <ProductList />
          </Route>
          <Route path="/add">
            <AddProduct />
          </Route>
          <Route path="/edit/:id">
            <EditProduct />
          </Route>
          <Route exact path="/users">
            <ListUser />
          </Route>
          <Route path="/users/add">
            <AddUser />
          </Route>
          <Route path="/users/edit/:id">
            <EditUser />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
