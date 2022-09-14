import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';

const Cuisine = () => {
  const [cuisine, setCuisine] = useState([]);
  let params = useParams();

  const getCuisine = async (name) => {
    const check = localStorage.getItem(`cuisine${name}`);
    if (check) {
      setCuisine(JSON.parse(check));
    } else {
      const data = await fetch(
        `https://api.spoonacular.com/recipes/complexSearch?apiKey=${
          import.meta.env.VITE_API_KEY
        }&cuisine=${name}`
      );
      const recipes = await data.json();
      localStorage.setItem('cuisine', JSON.stringify(recipes.results));
      setCuisine(recipes.results);
    }
  };

  useEffect(() => {
    getCuisine(params.type);
  }, [params.type]);

  return (
    <motion.div
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className='grid'>
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
    </motion.div>
  );
};

export default Cuisine;
