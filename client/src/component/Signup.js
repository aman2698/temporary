import React,{useState} from 'react'
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { register } from "../actions/auth";
import PropTypes from "prop-types";

const Signup = (props) => {

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        password2: "",
      });
    
      const { name, email, password, password2 } = formData;
    
      const onChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });
    
      const onSubmit = async (e) => {
        e.preventDefault();
        if (password !== password2) {
         return console.log('password not match');
        } else {
        console.log(formData);
        props.register({name,email,password})
        }
      };

       //redirect
    if (props.isAuthenticated) {
        return <Redirect to="/weather" />;
      }

    return (
    
            <div className="flex items-center min-h-screen p-2 bg-gray-100 lg:justify-center">
      <div
        className="flex flex-col overflow-hidden bg-white rounded-md shadow-lg max md:flex-row md:flex-1 lg:max-w-screen-md"
      >
          <div className="p-5 bg-white md:flex-1">
          <h3 className="my-4 text-2xl font-semibold text-gray-700">Sign up</h3>
          <form action="#" className="flex flex-col space-y-5"  onSubmit={(e) => onSubmit(e)}>
            <div className="flex flex-col space-y-1">
              <input
              placeholder='Your Name'
                type="text"
                name="name"
                value={name}
                onChange={(e) => onChange(e)}
               
                className="px-4 py-1 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"
              />
            </div>
            <div className="flex flex-col space-y-1">
              <input
              placeholder='Email'
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => onChange(e)}
            
                className="px-4 py-1 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"
              />
            </div>
            <div className="flex flex-col space-y-1">
              <input
              placeholder='Password'
                type="password"
                id="email"
                name="password"
          
            value={password}
            onChange={(e) => onChange(e)}
                className="px-4 py-1 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"
              />
            </div>
            <div className="flex flex-col space-y-1">
              <input
              placeholder='Repeat Your Password'
                type="password"
                id="email"
                name="password2"
    
                value={password2}
                onChange={(e) => onChange(e)}
                className="px-4 py-1 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"
              />
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="remember"
                className="w-4 h-4 transition duration-300 rounded focus:ring-2 focus:ring-offset-0 focus:outline-none focus:ring-blue-200"
              />
              <label for="remember" className="text-sm font-semibold text-gray-500">I Agree all statement in Terms Of Services</label>
            </div>
            <div>
              <button
                type="submit"
                className="w-full px-4 py-2 text-lg font-semibold text-white transition-colors duration-300 bg-blue-500 rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring-blue-200 focus:ring-4"
              >
                Register
              </button>
            </div>
          </form>
        </div>
        <div
          className="p-4 py-6 text-white bg-white-500 md:w-80 md:flex-shrink-0 md:flex md:flex-col md:items-center md:justify-evenly"
        >
         <img src='Assets/signup-image.webp' alt='signup'/>  
        </div>
        
      </div>
    </div>
    
    )
}
Signup.propTypes = {
    setAlert: PropTypes.func.isRequired,
    register:PropTypes.func.isRequired,
    isAuthenticated:PropTypes.bool,
  };
  
  const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
  });

export default connect(mapStateToProps, { register })(Signup)
