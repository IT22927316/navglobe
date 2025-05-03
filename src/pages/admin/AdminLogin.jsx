import { useState, useRef } from 'react';
import API from '../../api';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';

const AdminLogin = () => {
  const [form, setForm] = useState({ email: '', password: '' });
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
    }

    setErrors(tempErrors);
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const res = await API.post('/users/login', form);
      const { token, user } = res.data;

      if (user.role !== 'admin') {
        alert('Access denied. You are not an admin.');
        return;
      }

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      alert('Admin login successful!');
      navigate('/admin-dashboard');
    } catch (err) {
      alert(err.response?.data?.message || 'Login failed');
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
    <div className="flex h-screen w-full bg-gradient-to-r from-gray-100 via-white to-blue-100 font-sans">
      <div className="w-full md:w-1/2 flex justify-center items-center px-6">
        <div className="w-full max-w-md bg-white/30 backdrop-blur-md p-8 rounded-2xl shadow-xl border border-white/40">
          <h2 className="text-4xl font-bold mb-2 text-gray-900 text-center">Admin Panel</h2>
          <p className="text-gray-600 mb-6 text-center">Login as Admin</p>

          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            {['email', 'password'].map((field) => (
              <div key={field}>
                <input
                  type={field === 'password' ? 'password' : 'email'}
                  name={field}
                  placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                  value={form[field]}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 bg-white/70 rounded-full border focus:outline-none focus:ring-2 ${
                    errors[field] ? 'border-red-500' : 'focus:ring-blue-500'
                  }`}
                />
                {errors[field] && (
                  <p className="text-red-500 text-sm mt-1">{errors[field]}</p>
                )}
              </div>
            ))}

            <div className="relative w-full mt-2">
              <button
                type="submit"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                className="w-full relative bg-black text-white py-3 rounded-full overflow-hidden z-10"
              >
                <span className="relative z-20">Login</span>
                <div
                  ref={liquidRef}
                  className="absolute top-0 left-0 h-full w-full bg-blue-500 rounded-full z-10"
                  style={{ transform: 'translateX(-100%)' }}
                />
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Right Image Section (Optional) */}
      <div className="hidden md:flex w-1/2 justify-center items-center px-10 py-10">
        <img
          src="https://images.pexels.com/photos/4792285/pexels-photo-4792285.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt="Admin Visual"
          className="rounded-2xl w-full h-full object-cover shadow-md"
        />
      </div>
    </div>
  );
};

export default AdminLogin;
