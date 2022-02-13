import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

const Layout:React.FC = (props) => {
  return <div>
      <Navbar />
      <main className='page-wrapper'>{props.children}</main>
      <Footer />
  </div>;
};

export default Layout;
