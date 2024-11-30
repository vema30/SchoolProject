import React from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
const Register = () => {
      const[email,setEmail]=useState('');
      const[name,setName]=useState('');
      const[password,setPassword]=useState('');
      function handleSubmit(e) {
        e.preventDefault(); // Prevent default form submission behavior
        console.log('Submitting form');
      
        const data = {
          email,   // Assuming email, name, and password are states or variables defined elsewhere
          name,
          password, // Fixing the password field to use the password variable instead of name
        };
      
        axios
          .post('http://localhost:3000/user', data)
          .then((response) => {
            alert('registered sucessfully');
            console.log('Form submitted successfully:', response.data);
          })
          .catch((error) => {
            alert('registerion failed');
            console.error('Error submitting form:', error);
          });
      }
  return (
    <div className='h-screen w-screen flex justify-center items-center bg-slate-400'>
        {/*<p>email :{email}</p>
        <p>name :{name}</p>
        <p>password :{password}</p>*/}
      <div className='bg-gray-500 p-5 rounded-md shadow-md'>
        <form className='flex flex-col space-y-4' onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className='block mb-1'>Email:</label>
            <input
              type="email"
              id="email"
              onChange={(e)=>setEmail(e.target.value)}
              name="email"
              className='border block bg-slate-200 p-2 rounded-md w-full'
              placeholder="Enter your email"
              required
            />
          </div>
          <div>
            <label htmlFor="name" className=' mb-1'>name:</label>
            <input
              type="text"
              id="name"
              name="text"
              onChange={(e)=>setName(e.target.value)}
              className='border block bg-slate-200 p-2 rounded-md w-full'
              placeholder="Enter your name"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className='block mb-1'>Password:</label>
            <input
            onChange={(e)=>setPassword(e.target.value)}
              type="password"
              id="password"
              name="password"
              className='border bg-slate-200 p-2 rounded-md w-full'
              placeholder="Enter your password"
              required
            />
          </div>
          <button
            type="submit"
            className='bg-green-500 p-2 rounded-md text-white font-semibold hover:bg-green-600 transition duration-200'
          >
          Register
          </button>
        </form>
        <Link to='/login' className='flex justify-end text-blue-800 underline text-xl'>
        login</Link>
      </div>
    </div>
  );
};

export default Register;
