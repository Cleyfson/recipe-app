import React from 'react';
import Pages from './pages/Pages';
import Category from './components/Category';
import Search from './components/Search';
import { BrowserRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { GiKnifeFork } from 'react-icons/gi';

const Logo = () => <h1>Delicious</h1>;

function App() {
  return (
    <div className='app'>
      <BrowserRouter>
        <Link className='nav' to={'/'}>
          <GiKnifeFork />
          <Logo className='nav__logo' />
        </Link>
        <Search />
        <Category />
        <Pages />
      </BrowserRouter>
    </div>
  );
}

export default App;
