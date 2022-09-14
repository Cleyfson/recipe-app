import React, { useEffect, useState } from 'react';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/splide/dist/css/splide.min.css';
import { Link } from 'react-router-dom';

const Popular = () => {
  const [popular, setPopular] = useState([]);
  const [size, setSize] = useState(window.innerWidth);

  useEffect(() => {
    const handleWindowResize = () => setSize(window.innerWidth);
    window.addEventListener('resize', handleWindowResize);
    console.log(size);
    return () => window.removeEventListener('resize', handleWindowResize);
  }, []);

  useEffect(() => {
    getPopular();
  }, []);

  const getPopular = async () => {
    const check = localStorage.getItem('popular');
    if (check) {
      setPopular(JSON.parse(check));
    } else {
      const api = await fetch(
        `https://api.spoonacular.com/recipes/random?apiKey=${
          import.meta.env.VITE_API_KEY
        }&number=9`
      );
      const data = await api.json();
      localStorage.setItem('popular', JSON.stringify(data.recipes));
      setPopular(data.recipes);
    }
  };

  const spliderDesktop = {
    perPage: 4,
    arrows: true,
    pagination: false,
    drag: 'free',
    gap: '5rem',
  };

  const spliderMobile = {
    perPage: 2,
    arrows: true,
    pagination: false,
    drag: 'free',
    gap: '1rem',
  };

  return (
    <div className='wrapper'>
      <h3 className='wrapper__title'>Popular Picks</h3>

      <Splide options={size <= 820 ? spliderMobile : spliderDesktop}>
        {popular.map((recipe) => {
          return (
            recipe.image && (
              <SplideSlide key={recipe.id}>
                <div className='wrapper__card'>
                  <Link to={'/recipe/' + recipe.id}>
                    <p>{recipe.title}</p>
                    <img src={recipe.image} alt={recipe.title} />
                    <div className='wrapper__gradient'></div>
                  </Link>
                </div>
              </SplideSlide>
            )
          );
        })}
      </Splide>
    </div>
  );
};

export default Popular;
