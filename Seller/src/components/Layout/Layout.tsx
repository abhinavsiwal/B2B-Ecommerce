import React from 'react'
import Script from 'next/script';
import Sidebar from './Sidebar';


const Layout:React.FC = (props) => {
    return <React.Fragment>
        <Sidebar />
        <main className='main-wrap' >{props.children}</main>
       {/* <script src='../../../styles/js/jquery-3.5.0.min' />
       <script src='../../../styles/js/scriptc619' />
       <script src='../../../styles/js/bootstrap.bundle.min' /> */}
       <script src='/js/jquery-3.5.0.min' />
       <script src='/js/scriptc619' />
       <script src='/js/bootstrap.bundle.min' />
    </React.Fragment>;
  };

export default Layout