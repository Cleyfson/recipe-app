import React from 'react';
import Home from './Home';
import Searched from './Searched';
import Cuisine from './Cuisine';
import Recipe from './Recipe';
import Error from './Error';
import { Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

const Pages = () => {
  const location = useLocation();
  return (
    <AnimatePresence exitBeforeEnter>
      <Routes location={location} key={location.pathname}>
        <Route path='/' element={<Home />} />
        <Route path='/cuisine/:type' element={<Cuisine />} />
        <Route path='/searched/:search' element={<Searched />} />
        <Route path='/recipe/:name' element={<Recipe />} />
        <Route path='*' element={<Error />} />
      </Routes>
    </AnimatePresence>
  );
};

export default Pages;
