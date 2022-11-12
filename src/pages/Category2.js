import React, { useCallback, useState } from 'react';
import { Button, Col, Row } from 'rsuite';
import { Link, useParams } from 'react-router-dom';
import fakeProducts from '../components/products.json';
import categories from '../components/categories.json';
import { useFilters } from '../context/useFilters';
import FilterCheckbox from '../components/FilterCheckbox';
import Products from './CategoryComponents/Products';
import { useCart } from '../context/cart.context';

function getComputedProducts(products, filters) {
  // const result = products; would create a reference thus doesn't apply
  // [...someArray] creates a new array from elements of someArray
  let result = [...products];

  if (filters.delivery) {
    result = result.filter(p => p.delivery === true);
  }

  if (filters.inStock) {
    result = result.filter(p => p.inStock === true);
  }

  if (filters.expensive) {
    result = result.filter(p => p.price > 100);
  }

  return result;
}

const Category = ({ category }) => {
  const [products] = useState(
    fakeProducts.filter(p => p.categoryId === category.id)
  );
  const [filter, dispatchFilter] = useFilters({
    delivery: false,
    inStock: false,
    expensive: false,
  });
  const filteredProducts = getComputedProducts(products, filter);

  const onCheckboxChange = useCallback(
    (_,checked,event) => {

      dispatchFilter({
        type: 'SET',
        filterName: event.target.name,
        value: checked,
      });
    },
    [dispatchFilter]
  );

  const cart = useCart();
  
  const totalItemsInCart = cart.reduce((total,item) => total+item.quantity,0);
  const totalCostInCart = cart.reduce((sum,item) => sum+item.quantity*item.price,0);

 
  console.log(totalItemsInCart);
  return (
    <Row>
      <Col xs={12} md={6} className="position-relative">
        <div className="fixed-md">
          <h2 className="h3">Filters</h2>
          <FilterCheckbox
            id="delivery"
            name="delivery"
            checked={filter.delivery}
            onChange={onCheckboxChange}
            label="Delivery"
          />
          <FilterCheckbox
            id="inStock"
            name="inStock"
            checked={filter.inStock}
            onChange={onCheckboxChange}
            label="In stock only"
          />
          <FilterCheckbox
            id="expensive"
            name="expensive"
            checked={filter.expensive}
            onChange={onCheckboxChange}
            label="Expensive (100+ USD)"
          />
          <div className="mt-">
            Showing {filteredProducts.length} out of {products.length}
          </div>
        </div>
      </Col>
      <Col xs={12} md={16} className="mt-3 mt-md-0">
        <div className='d-flex align-items-center justify-content-between'>
        <h1 className="h3 br-circle">{category.name}</h1>
          
            <Link to='/checkout' className='link-unstyled'>
            <div className='d-flex'>
            <Button className='br-circle mr-1' size="sm" color="green">{totalItemsInCart}</Button>
            <h4 className='text-green'>{` $ ${totalCostInCart}`}</h4>
            </div>
            </Link>
          
        </div>
        <div className="d-flex justify-content-center">
          <Products products={filteredProducts} />
        </div>
      </Col>
    </Row>
  );
};

const CategoryContainer = () => {
  const { id } = useParams();

  const category = categories.find(c => c.id === id);

  if (!category) {
    return <div>Category with id {id} does not exist</div>;
  }

  return <Category category={category} />;
};

export default CategoryContainer;
