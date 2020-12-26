import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../actions/auth';

const Navbar = ({ auth: { isAuthenticated }, logout }) => {
  const authLinks = (
    <ul className="flex space-y-1">
      <li className='m-3'>
        <Link to="/home">Home</Link>
      </li>
      <li className='m-3'>
        <Link to="/weather">weather</Link>
      </li>
      {/* <li>
        <Link to="/dashboard">
          <i className="fas fa-user" />{' '}
          <span className="">Dashboard</span>
        </Link>
      </li> */}
      <li className='m-3'>
        <a onClick={logout} >
          Logout
        </a>
      </li>
    </ul>
  );

  const guestLinks = (
    <ul className= 'flex '>
      {/* <li>
        <Link to="/profiles">Developers</Link>
      </li> */}
      <li className='m-3'>
        <Link to="/signup">Signup</Link>
      </li>
      <li className='m-3'>
        <Link to="/signin">Signin</Link>
      </li>
    </ul>
  );

  return (
   <Fragment>
   <nav id="header" className="w-full z-30 top-5 py-1 bg-white shadow-lg border-b border-blue-400 ">
 <div className="w-full flex items-center justify-between mt-0 px-6 py-2"> 
    <div className="order-2 md:order-3 flex flex-wrap items-center justify-end mr-0 md:mr-4" id="nav-content">
       <div className="auth flex items-center w-full md:w-full">
      {isAuthenticated ? authLinks : guestLinks}
      </div>
         </div>
      </div>
   </nav>
   </Fragment>
   
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logout })(Navbar);
