import React from 'react';
import { useParams } from 'react-router-dom';
import categories from '../components/categories.json';
import Category2 from './Category2';



const CategoryContainer = () => {
  const { id } = useParams();

  const category = categories.find(c => c.id === id);

  if (!category) {
    return <div>Category with id {id} does not exist</div>;
  }
  return <Category2 category={category} />;
};

export default CategoryContainer;
