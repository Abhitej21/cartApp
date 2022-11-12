import React, { useCallback } from 'react';
import { Button } from 'rsuite';
import { useCartDispatch } from '../../context/cart.context';

const Products = ({ products }) => {
  const dispatchCart = useCartDispatch();

  const handleAddToCart = useCallback(
    (id, price, inStock) => {
      if (!inStock) {
        return;
      }

      dispatchCart({ type: 'ADD_ONE', id, price });
    },
    [dispatchCart]
  );

  if (products.length === 0) {
    return <div>No products found</div>;
  }

  return products.map(
    ({
      currency,
      delivery,
      inStock,
      name,
      price,
      thumbnail,
      ...restOfProduct
    }) => (
      
      <div key={restOfProduct.id} className="mb-3 mr-3">
        <img width="100%" src={thumbnail} alt={name} className="h-50 w-80" />
        <div className="font-weight">
          <h2 className="h5">{name}</h2>
          <p className="h5 mb-2">${price}</p>
          {delivery && <p className="mb-1">Delivery available</p>}
          <p className={inStock ? 'text-success' : 'text-danger'}>
            {inStock ? 'In stock' : 'Out of stock'}
          </p>
          <Button
            type="button"
            color="cyan"
            disabled={!inStock}
            onClick={() => handleAddToCart(restOfProduct.id, price, inStock)}
          >
            Add to cart
          </Button>
        </div>
      </div>
    )
  );
};

export default Products;
