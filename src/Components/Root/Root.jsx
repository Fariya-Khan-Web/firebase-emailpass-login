import React from 'react';
import Navbar from '../Navbar/Navbar';
import { Outlet } from 'react-router-dom';

const Root = () => {
    return (
        <div>
            <Navbar/>
            <Outlet/>
            {/* <h1 className='text-4xl text-center'>Root</h1> */}
        </div>
    );
};

export default Root;