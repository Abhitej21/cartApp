import React, { useCallback, useState } from 'react'
import {Col, Row } from 'rsuite';
import Products from './CategoryComponents/Products';
import fakeProducts from '../components/products.json'
import { useFilters } from '../context/useFilters';
import FilterCheckbox from '../components/FilterCheckbox';



function getComputedProducts(products, filters) {

    let result = [...products];
  
    if (filters.delivery) {
      result = result.filter(p => p.delivery === true);
    }
  
    return result;
}

const Category2 = ({ category }) => {
    console.log(category);
    const [products] = useState(
      fakeProducts.filter(p => p.categoryId === category.id)
    );
    const [filter, dispatchFilter] = useFilters({
      delivery: true,
    });
    const filteredProducts = getComputedProducts(products, filter);
  
    const onCheckboxChange = useCallback(
      ev => {
        const checkbox = ev.target;
        console.log(checkbox);
        dispatchFilter({
          type: 'SET',
          filterName: checkbox["name"],
          value: checkbox.checked,
        });
      },
      [dispatchFilter]
    );
  
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
            
            <div className="mt-">
              Showing {filteredProducts.length} out of {products.length}
            </div>
          </div>
        </Col>
        <Col xs={12} md={6} className="mt-3 mt-md-0">
          <h1 className="h3">{category.name}</h1>
          <div>
            <Products products={filteredProducts} />
          </div>
        </Col>
      </Row>
    );
  };
  



export default Category2;