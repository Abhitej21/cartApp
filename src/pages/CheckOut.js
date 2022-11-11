import React, { useCallback, useState } from 'react'
import { useCart, useCartDispatch } from '../context/cart.context'
import PRODUCTS from '../components/products.json';
import { Button, ButtonGroup,  Table } from 'rsuite';


const {Column,HeaderCell,Cell} = Table;
function checkOutItems(products,cartItems){
  const productsInCart = products.filter(product => 
    cartItems.some(item => item.id===product.id));

    return productsInCart.map(product => {
      return {
        ...product,
        quantity: cartItems.find(item => item.id===product.id).quantity,
      };
    });
}



const CheckOut = () => {
  const cart = useCart();
  const dispatchCart = useCartDispatch();
  const [products] = useState(PRODUCTS);
  const checkOutItemsList = checkOutItems(products,cart);
  const cartPriceTotal = checkOutItemsList.reduce((total,item) => 
  total+item.price*item.quantity,0);
  const handleAdd = useCallback(id => {
    dispatchCart({type: 'ADD_ONE',id});
  },[dispatchCart]);
  

  const handleRemoveOne = useCallback(id => {
    dispatchCart({type: 'REMOVE_ONE',id});
  },[dispatchCart]);

  const handleRemove = useCallback(id => {
    dispatchCart({type: 'REMOVE',id});
  },[dispatchCart]);

  return (
    <div>
      <h1 className='h3 mb-4'>Checkout</h1>
      <div className='bg-white p-4 shadow-sm rounded-lg'>
        <Table>
          <Table.HeaderCell>
            <Table.ColumnGroup>
            <Column> <HeaderCell style={{borderTop: 0}}></HeaderCell><Cell dataKey='no'/> </Column> 
             <Column> <HeaderCell style={{borderTop: 0}}>Name</HeaderCell><Cell dataKey='name'/> </Column>
             <Column> <HeaderCell style={{borderTop: 0}}>Price</HeaderCell><Cell dataKey='price'/>  </Column>
             <Column> <HeaderCell style={{borderTop: 0}}>Quantity</HeaderCell><Cell dataKey='quantity'/> </Column>
            <Column> <HeaderCell style={{borderTop: 0}}></HeaderCell><Cell dataKey=''/> </Column>
            </Table.ColumnGroup>
          </Table.HeaderCell>
          <tbody>
            {checkOutItemsList.map(ele => (
              <tr key={ele.id}>
                <td>
                  <img src={ele.thumbnail} alt={ele["name"]}
                  style={{width: 50, height: 'auto'}}/>
                </td>
                <td className='font-weigth-bold align-middle text-nowrap'>
                  {ele.name}
                </td>
                <td className='font-weight-bold align-middle'>
                  ${ele.price}
                </td>
                <td className='font-weight-bold align-middle'>
                  <ButtonGroup>
                    <Button size='sm' type="button" onClick={() => handleRemoveOne(ele.id)}>
                      -
                    </Button>
                    <Button disabled style={{width: 45}}>
                      {ele.quantity}
                    </Button>
                    <Button size='sm' type="button" onClick={() => handleAdd(ele.id)}>
                      +
                    </Button>
                  </ButtonGroup>
                </td>
                <td className='font-weight-bold align-middle'>
                <Button
                    color="cyan"
                    className="rounded-circle d-flex justify-content-center align-content-center"
                    style={{
                      width: 30,
                      height: 30,
                      lineHeight: 0.6,
                      fontSize: 20,
                    }}
                    type="button"
                    onClick={() => handleRemove(ele.id)}
                  >
                    &times;
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <hr/>
        <div className='text-right'>
          <div className='h3'>Total ${cartPriceTotal}</div>
        </div>
      </div>
    </div>
  );
};

export default CheckOut;