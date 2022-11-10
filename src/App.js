import React from 'react';
import { Route, Switch } from 'react-router';
import 'rsuite/dist/styles/rsuite-default.css';
import Home from './pages/Home';
import './styles/main.scss';
import { ContextProvider } from './context/cart.context';
import { Container, Navbar } from 'rsuite';
import CheckOut from './pages/CheckOut';
import CategoryContainer from './pages/Category';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <ContextProvider>
      <Container>
        <Navbar/>
    <Switch>
      <Route exact path="/">
        <Home/>
      </Route>
      
      <Route exact path="/category/:id">
        <CategoryContainer/>
      </Route>
      <Route exact path="/checkout">
        <CheckOut/>
      </Route>
    </Switch>
    </Container>
    </ContextProvider>
  );
}

export default App;
