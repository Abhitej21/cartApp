/* eslint-disable import/no-useless-path-segments */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-console */
/* eslint-disable react-hooks/rules-of-hooks */
import React, {  useCallback, useMemo } from 'react'
import { useTable } from 'react-table'
import { Button} from 'rsuite';
import { useCart, useCartDispatch} from '../context/cart.context';
import {checkOutItems} from '../pages/CheckOut';
import {columnList} from '../components/columns';
import fakeProducts from '../components/products.json';
import '../styles/table.css';


// function checkOutItems(products,cartItems){
//     const productsInCart = products.filter(product => 
//       cartItems.some(item => item.id===product.id));
  
//       return productsInCart.map(product => {
//         return {
//           ...product,
//           quantity: cartItems.find(item => item.id===product.id).quantity,
//         };
//       });
//   }



const CheckOutDup = () => {
   
    const cart = useCart();
const dispatchCart = useCartDispatch();
// const addingToCart = useCallback((id,newQuantity) => {
//     dispatchCart({type: 'CHANGE_QUANTITY',id,newQuantity});
// },[dispatchCart]);

const onDecrement = useCallback((id) => {
    dispatchCart({type: 'REMOVE_ONE',id});
},[dispatchCart]);

const onIncrement = useCallback((id) => {
    dispatchCart({type: 'ADD_ONE',id});
},[dispatchCart]);
  
  const totalItemsInCart = cart.reduce((total,item) => total+item.quantity,0);
  const totalCostInCart = cart.reduce((sum,item) => sum+item.quantity*item.price,0);

    // const setQuantity = (value,ev) => {
    //     const clickedItemId = ev.target.id;
    //     const {id} = fakeProducts.filter(eachProduct => eachProduct.id===clickedItemId)[0];
    //     addingToCart(id,value);
    // }

    
  const checkoutList = checkOutItems(fakeProducts,cart);
  console.log(checkoutList);
  const withImages = checkoutList.filter(checkItem => 
    fakeProducts.some(item => item.id===checkItem.id)
    );
    const columns = useMemo(() => columnList,[]);
    const data = useMemo(() => withImages,[]);

    const tableInstance = useTable({ columns, data });
  
  const {getTableProps,getTableBodyProps,headerGroups,rows,prepareRow} = tableInstance;
  
    return (
        <div className='h-100 w-100 d-flex flex-column align-items-center justify-content-center'>

    
            <div className='w-100 d-flex flex-row align-items-center justify-content-between'>
            <h1>CheckOut</h1>
            <div className='w-10 d-flex align-items-center justify-content-between'>
                <Button size="md" className='br-circle'>{totalItemsInCart}</Button>
                <h4>{` $ ${totalCostInCart}`}</h4>
            </div>
            </div>
    <table {...getTableProps()}>
        <thead>
            {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map((column) => (
                            <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                        ))}
                    
                </tr>
                ))
            }
            
        </thead>
        <tbody {...getTableBodyProps()}>
            
            {
                rows.map(row => {
                    prepareRow(row)
                    return (

                        <tr key={row.values.id} {...row.getRowProps()}>
                            <td><img src={row.values.thumbnail} alt={row.values.name} style={{width: 50, height: 'auto'}}/></td>
                            {
                                row.cells.map(cell => {
                                    return <td className='fontText' {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                })
                            }
                            <td>
                            <Button onClick={onDecrement(row.values.id)}> - </Button>
                            </td>
                            <td>
                                <p id={row.values.id}>{row.values.quantity}</p>
                            </td>
                            <td>
                            <Button onClick={onIncrement(row.values.id)}> + </Button></td>
                        </tr>
                    )
                })
            }
        </tbody>
    </table>

    </div>
  )
}

export default CheckOutDup;