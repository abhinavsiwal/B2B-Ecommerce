import React from 'react';
import Navbar from './Navbar';
;

const Layout:React.FC = (props) => {
  return <div>
      <Navbar />
      <main className='page-wrapper'>{props.children}</main>
  </div>;
};

export default Layout;
