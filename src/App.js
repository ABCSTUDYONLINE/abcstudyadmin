import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

//components
import Layout from './components/layout/Layout';
import Login from './pages/login/Login';
import Error from './pages/error/Error';


function App() {
  return (
    <Router>
        <Switch>
        <Route exact path="/" render={() => {
          return localStorage.getItem("accessToken") ? <Layout /> : <Redirect to="/login" />
        }}>
        </Route>
        <Route exact path="/login" component={Login} />
        <Route path="*" component={Error} />

      </Switch>
    </Router>
     
      
  );
}
export default App;
