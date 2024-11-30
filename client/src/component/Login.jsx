import React from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <div className='h-screen w-screen flex justify-center items-center bg-slate-400'>
      <div className='bg-gray-500 p-5 rounded-md shadow-md'>
        <form className='flex flex-col space-y-4'>
          <div>
            <label htmlFor="email" className='block mb-1'>Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              className='border bg-slate-200 p-2 rounded-md w-full'
              placeholder="Enter your email"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className='block mb-1'>Password:</label>
            <input
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
            Login
          </button>
        </form>
        <Link to='/register' className='flex justify-end text-blue-800 underline text-xl'>
        register</Link>
      </div>
    </div>
  );
};

export default Login;
