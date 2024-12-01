import React, { useState, useContext } from 'react'; // Added useContext import
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UserContext } from './UseContext';
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear previous errors

    if (!email || !password) {
      setError('Please fill in all fields.');
      toast.error('Please fill in all fields.');
      return;
    }

    try {
      const formData = { email, password };
      const res = await axios.post('http://localhost:3000/user/login', formData);

      // Log the success response
      console.log('Response:', res.data.user.name);
      setUser(res.data.user.name);

      // Set the user context value
       // Assuming `res.data` is the full user object or contains the relevant user info

      // Show success toast
      toast.success('Login successful!');

      // Save token to localStorage (or sessionStorage)
      localStorage.setItem('authToken', res.data.token);

      // Redirect to the dashboard or another page
      navigate('/index');
    } catch (error) {
      console.error('Error:', error.response ? error.response.data : error.message);

      // Set error message and display toast notification
      const errorMessage = error.response?.data?.message || 'An error occurred while logging in.';
      setError(errorMessage);
      toast.error(errorMessage);
    }
  };

  return (
    <div className="h-screen w-screen flex justify-center items-center bg-slate-400">
      <div className="bg-gray-500 p-5 rounded-md shadow-md">
        <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block mb-1">Email:</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              id="email"
              name="email"
              className="border bg-slate-200 p-2 rounded-md w-full"
              placeholder="Enter your email"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block mb-1">Password:</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              id="password"
              name="password"
              className="border bg-slate-200 p-2 rounded-md w-full"
              placeholder="Enter your password"
              required
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            className="bg-green-500 p-2 rounded-md text-white font-semibold hover:bg-green-600 transition duration-200"
          >
            Login
          </button>
        </form>
        <Link to="/register" className="flex justify-end text-blue-800 underline text-xl mt-2">
          Register
        </Link>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
