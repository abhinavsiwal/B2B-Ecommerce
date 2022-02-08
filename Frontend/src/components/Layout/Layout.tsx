import React from 'react';
import Navbar from './Navbar';
import Navbar1 from './Navbar1';
import Navbar2 from './Navbar2';

const Layout:React.FC = (props) => {
  return <div>
      <Navbar2 />
      <main className='page-wrapper'>{props.children}</main>
  </div>;
};

export default Layout;
