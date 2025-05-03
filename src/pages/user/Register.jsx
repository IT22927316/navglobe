import { useState, useRef } from 'react';
import API from '../../api';
import { useNavigate, Link } from 'react-router-dom';
import gsap from 'gsap';

const Register = () => {
  const [form, setForm] = useState({ fullName: '', email: '', password: '' });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const liquidRef = useRef(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const validate = () => {
    const tempErrors = {};
    let valid = true;

    if (!form.fullName.trim()) {
      tempErrors.fullName = 'Full name is required';
      valid = false;
    }
    if (!form.email.trim()) {
      tempErrors.email = 'Email is required';
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      tempErrors.email = 'Invalid email format';
      valid = false;
    }
    if (!form.password.trim()) {
      tempErrors.password = 'Password is required';
      valid = false;
    } else if (form.password.length < 6) {
      tempErrors.password = 'Password must be at least 6 characters';
      valid = false;
    }

    setErrors(tempErrors);
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      // Register the user
      await API.post('/users/register', { ...form, role: 'user' });

      // Then login the user immediately
      const loginRes = await API.post('/users/login', {
        email: form.email,
        password: form.password,
      });

      // Store token and user in localStorage
      localStorage.setItem('token', loginRes.data.token);
      localStorage.setItem('user', JSON.stringify(loginRes.data.user));

      alert('Registration successful!');
      navigate('/'); // Redirect to home or dashboard
    } catch (err) {
      alert(err.response?.data?.message || 'Registration failed');
    }
  };

  const handleMouseEnter = () => {
    gsap.to(liquidRef.current, {
      x: 0,
      duration: 0.5,
      ease: 'power2.out',
    });
  };

  const handleMouseLeave = () => {
    gsap.to(liquidRef.current, {
      x: '-100%',
      duration: 0.5,
      ease: 'power2.inOut',
    });
  };

  return (
    <div className="flex h-screen w-full bg-gradient-to-r from-green-100 via-white to-blue-200 font-sans">
      {/* Left Panel - Glass Card */}
      <div className="w-full md:w-1/2 flex justify-center items-center px-6">
        <div className="w-full max-w-md bg-white/30 backdrop-blur-md p-8 rounded-2xl shadow-xl border border-white/40">
          <h2 className="text-4xl font-bold mb-2 font-playfair text-gray-900 text-center">
            Create Your Account
          </h2>
          <p className="text-gray-600 mb-6 text-center">
            Join Our Community Today!
          </p>

          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            {['fullName', 'email', 'password'].map((field) => (
              <div key={field}>
                <input
                  type={field === 'password' ? 'password' : 'text'}
                  name={field}
                  placeholder={
                    field === 'fullName'
                      ? 'Full Name'
                      : field.charAt(0).toUpperCase() + field.slice(1)
                  }
                  value={form[field]}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 bg-white/70 rounded-full border focus:outline-none focus:ring-2 ${
                    errors[field]
                      ? 'border-red-500'
                      : 'focus:ring-green-500'
                  }`}
                />
                {errors[field] && (
                  <p className="text-red-500 text-sm mt-1">{errors[field]}</p>
                )}
              </div>
            ))}

            {/* GSAP Button */}
            <div className="relative w-full mt-2">
              <button
                type="submit"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                className="w-full relative bg-black text-white py-3 rounded-full overflow-hidden z-10"
              >
                <span className="relative z-20">Register</span>
                <div
                  ref={liquidRef}
                  className="absolute top-0 left-0 h-full w-full bg-green-500 rounded-full z-10"
                  style={{ transform: 'translateX(-100%)' }}
                />
              </button>
            </div>
          </form>

          <Link to="/login">
            <p className="text-center text-sm mt-6">
              Already have an account?{' '}
              <span className="text-green-600 hover:underline cursor-pointer">
                Login here
              </span>
            </p>
          </Link>
        </div>
      </div>

      {/* Right Panel - Image */}
      <div className="hidden md:flex w-1/2 justify-center items-center px-10 py-10">
        <img
          src="https://images.pexels.com/photos/355935/pexels-photo-355935.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt="Register Visual"
          className="rounded-2xl w-full h-full object-cover shadow-md"
        />
      </div>
    </div>
  );
};

export default Register;
