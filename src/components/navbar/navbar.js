import React from 'react';
import { Link } from 'react-router-dom';
import { MenuItems } from './menuItems';

const Navbar = () => {
  return (
    <header className="bg-gradient-to-r from-indigo-900 to-red-500">
      <nav className="mx-auto max-w-7xl px-6 lg:px-8" aria-label="Top">
        <div className="flex w-full items-center justify-between border-b border-indigo-500 py-6 lg:border-none">
          <div className="flex items-center">
              <h1 className="ml-2 text-white text-2xl font-bold">Draftligan</h1>
            <Link to="/">
              <img className="h-12 w-auto" src="./././efterkloka.png" alt="" />
            </Link>
            <div className="ml-10 hidden space-x-8 lg:block">
              {MenuItems.map((item, index) => (
                <Link key={index} to={item.url} className="text-base font-medium text-white hover:text-indigo-50">
                  {item.title}
                </Link>
              ))}
            </div>
          </div>
        </div>
        <div className="flex flex-wrap justify-center gap-x-6 py-4 lg:hidden">
          {MenuItems.map((item, index) => (
            <Link key={index} to={item.url} className="text-base font-medium text-white hover:text-indigo-50">
              {item.title}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
