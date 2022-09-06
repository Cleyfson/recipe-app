import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

const Cuisine = () => {
  const [cuisine, setCuisine] = useState([]);
  let params = useParams();

  const getCuisine = async (name) => {
    const data = await fetch(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${
        import.meta.env.VITE_API_KEY
      }&cuisine=${name}`
    );
    const recipes = await data.json();
    setCuisine(recipes.results);
  };

  useEffect(() => {
    getCuisine(params.type);
  }, [params.type]);

  return (
    <div className='grid'>
      {cuisine.map((item) => {
        return (
          <div className='grid__card' key={item.id}>
            <Link to={'/recipe/' + item.id}>
              <img src={item.image} alt='' />
              <h4>{item.title}</h4>
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default Cuisine;
