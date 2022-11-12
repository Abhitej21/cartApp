import React from 'react';
import { Route, Switch } from 'react-router';
import 'rsuite/dist/styles/rsuite-default.css';
import { Container, Navbar } from 'rsuite';
import Home from './pages/Home';
import './styles/main.scss';
import { CartProvider } from './context/cart.context';
import CategoryContainer from './pages/Category';
import CheckOutDup from './pages/CheckOutDup';

function App() {
  return (
    <CartProvider>
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
        <CheckOutDup/>
      </Route>
    </Switch>
    </Container>
    </CartProvider>
  );
}

export default App;
