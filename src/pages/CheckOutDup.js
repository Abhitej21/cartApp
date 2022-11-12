import React, { useMemo } from 'react'
import { useTable } from 'react-table'
import { Input } from 'rsuite';
import { useCart } from '../context/cart.context';
import {columnList} from '../components/columns';
import { checkOutItems } from './CheckOut';
import fakeProducts from '../components/products.json';
import '../styles/table.css';




const CheckOutDup = () => {
    const cart = useCart();
    const setQuantity = (value,ev) => {
        const clickedItemId = ev.target.id;
        const {id,price,inStock} = fakeProducts.filter(eachProduct => eachProduct.id===clickedItemId)[0];
        

    }

    
    const checkoutList = checkOutItems(fakeProducts,cart);
  const withImages = checkoutList.filter(checkItem => 
    fakeProducts.some(item => item.id===checkItem.id)
    );
    const columns = useMemo(() => columnList,[]);
    const data = useMemo(() => withImages,[]);

    const tableInstance = useTable({ columns,data });
  
  const {getTableProps,getTableBodyProps,headerGroups,rows,prepareRow} = tableInstance;
  
    return (
    <table {...getTableProps()}>
        <thead>
            {
                headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                    {

                        headerGroup.headers.map((column) => (
                            <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                        ))
                    }
                    
                </tr>
                ))
            }
            
        </thead>
        <tbody {...getTableBodyProps()}>
            {
                rows.map(row => {
                    prepareRow(row)
                    console.log(row);
                    return (
                        <tr key={row.values.id} {...row.getRowProps()}>
                            {
                                row.cells.map(cell => {
                                    return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                })
                            }
                            <td>
                                <Input id={row.values.id} defaultValue="Hi" onChange={setQuantity}/>
                            </td>
                        </tr>
                    )
                })
            }
        </tbody>
    </table>
  )
}

export default CheckOutDup