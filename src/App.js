import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import routes from './routes';
// import './styles/style.scss';
import { connect } from 'react-redux';
// import Spinner from './components/Spinner';
import { showLoading } from './redux/layout/layoutSelector'

function RouteWithSubRoutes(route) {
  return (
    <Route
      path={route.path}
      exact={route.exact}
      render={props => {
        const { location: { pathname } = {} } = props
        return pathname === '/' ? <Redirect to="/login"/> : <route.component {...props} routes={route.routes} />
      }}
    />
  );
}

class App extends Component {
  // eslint-disable-next-line no-useless-constructor
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <>
        {/* <Spinner active={this.props.isLoading}/> */}
        <Switch>
          {routes.map((item, index) => (<RouteWithSubRoutes key={index} {...item}/>))}
        </Switch>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    isLoading: showLoading(state)
  }
}

export default connect(mapStateToProps)(App);
// export default App;