import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Nav,NavbarText } from 'rsuite'
import NavItem from 'rsuite/lib/Nav/NavItem'
import {ReactComponent as CartImg} from '../components/'
import { useCart } from '../context/cart.context'


const LINKS = [{link: '/',text: 'Home'}];


const Navbar = () => {
    const cart = useCart();
    const totalCartItems = cart.reduce((total,item) => total+item.quantity,0);
    const totalCartPrice = cart.reduce((total,item) => total+item.price*item.quantity,0);
  return (
    <div>
        <Nav className="mr-auto">
            {LINKS.map(({link,text}) => (
                <NavItem key={link}>
                    <NavLink to={link} tag={Link}>
                        {text}
                    </NavLink>
                </NavItem>
            ))}
        </Nav>
        <NavbarText>
            <Link to="/checkout" className='d-flex align-items-center' style={{textDecoration: 'none'}}>
            <CartImg/>
            <div className='circle bg-dark text-light rounded-circle d-flex justify-content-center align-items-center mx-2'
            style={{width: 30,height: 30}}>
                {totalCartItems}
            </div>
            <div>${totalCartPrice}</div>
            </Link>
        </NavbarText>
    </div>
  )
}

export default Navbar;