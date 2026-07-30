import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router';
import { Eye, EyeOff, User, Mail, Phone, MapPin, Store, ShoppingBag, ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';

const SUDAN_CITIES = [
  'Khartoum', 'Omdurman', 'Khartoum North', 'Port Sudan', 'Kassala',
  'El Obeid', 'Wad Madani', 'Dongola', 'Al Fashir', 'Nyala',
  'Malakal', 'Atbara', 'Sennar', 'Ed Damazin',
];

export function Auth() {
  const { user, setUser } = useApp();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [mode, setMode] = useState<'login' | 'register'>(
    searchParams.get('mode') === 'register' ? 'register' : 'login'
  );
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    city: '',
    password: '',
    confirmPassword: '',
    role: 'buyer' as 'buyer' | 'seller',
  });

  useEffect(() => {
    if (user) navigate('/');
  }, [user]);

  const updateForm = (field: string, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
    setError('');
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    // Simulate login — in production, use real auth
    setTimeout(() => {
      if (!form.email || !form.password) {
        setError('Please fill in all fields');
        setLoading(false);
        return;
      }
      if (form.password.length < 6) {
        setError('Invalid credentials. Please try again.');
        setLoading(false);
        return;
      }
      // Mock user from email
      setUser({
        id: Math.random().toString(36).substring(2),
        name: form.email.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, c => c.toUpperCase()),
        email: form.email,
        phone: '+249 912 345 678',
        city: 'Khartoum',
        role: 'buyer',
      });
      navigate('/');
      setLoading(false);
    }, 800);
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setTimeout(() => {
      if (!form.name || !form.email || !form.phone || !form.city || !form.password) {
        setError('Please fill in all required fields');
        setLoading(false);
        return;
      }
      if (form.password !== form.confirmPassword) {
        setError('Passwords do not match');
        setLoading(false);
        return;
      }
      if (form.password.length < 6) {
        setError('Password must be at least 6 characters');
        setLoading(false);
        return;
      }
      setUser({
        id: Math.random().toString(36).substring(2),
        name: form.name,
        email: form.email,
        phone: form.phone,
        city: form.city,
        role: form.role,
      });
      navigate('/');
      setLoading(false);
    }, 800);
  };

  return (
    <div className="min-h-screen flex" style={{ backgroundColor: '#FAF8F2' }}>
      {/* Left panel */}
      <div className="hidden lg:flex flex-col justify-between w-96 p-10 text-white" style={{ backgroundColor: '#2D5A27' }}>
        <div>
          <div className="mb-8">
            <h1 className="text-white font-black text-3xl">JUSUR</h1>
            <p style={{ color: '#D4AF37' }} className="font-bold tracking-widest">كوش KUSH</p>
          </div>
          <h2 className="text-2xl font-bold mb-4">Sudan's Premier Marketplace</h2>
          <p className="text-green-200 leading-relaxed">
            Connect with local Sudanese businesses, discover handcrafted goods, and support the local economy.
          </p>
        </div>
        <div className="space-y-4">
          {[
            { icon: '🏺', text: '2,400+ unique products from local artisans' },
            { icon: '🚚', text: 'Delivery to all 18 states of Sudan' },
            { icon: '💼', text: 'Startup business loans available' },
            { icon: '🏪', text: 'Free store setup for sellers' },
          ].map(item => (
            <div key={item.text} className="flex items-start gap-3">
              <span className="text-xl">{item.icon}</span>
              <p className="text-sm text-green-200">{item.text}</p>
            </div>
          ))}
        </div>
        <p className="text-green-300 text-xs">جسور كوش — Bridging Business, Culture & Commerce in Sudan</p>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          {/* Mode toggle */}
          <div className="flex rounded-xl overflow-hidden border border-gray-200 mb-8 bg-white">
            <button
              onClick={() => setMode('login')}
              className={`flex-1 py-3 text-sm font-semibold transition-colors ${
                mode === 'login' ? 'text-white' : 'text-gray-500 hover:bg-gray-50'
              }`}
              style={mode === 'login' ? { backgroundColor: '#2D5A27' } : {}}
            >
              Sign In
            </button>
            <button
              onClick={() => setMode('register')}
              className={`flex-1 py-3 text-sm font-semibold transition-colors ${
                mode === 'register' ? 'text-white' : 'text-gray-500 hover:bg-gray-50'
              }`}
              style={mode === 'register' ? { backgroundColor: '#2D5A27' } : {}}
            >
              Create Account
            </button>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 p-8">
            <h2 className="font-bold text-gray-800 text-xl mb-1">
              {mode === 'login' ? 'Welcome Back!' : 'Join Jusur Kush'}
            </h2>
            <p className="text-sm text-gray-500 mb-6">
              {mode === 'login'
                ? 'Sign in to your account to continue shopping'
                : 'Create your account to start buying or selling'
              }
            </p>

            {error && (
              <div className="mb-4 p-3 rounded-lg text-sm text-red-600 bg-red-50 border border-red-200">
                {error}
              </div>
            )}

            <form onSubmit={mode === 'login' ? handleLogin : handleRegister}>
              {/* Register role selection */}
              {mode === 'register' && (
                <div className="mb-5">
                  <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2 block">I want to</label>
                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => updateForm('role', 'buyer')}
                      className={`flex-1 flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all ${
                        form.role === 'buyer' ? 'border-green-600 bg-green-50' : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <ShoppingBag className="w-6 h-6" style={{ color: form.role === 'buyer' ? '#2D5A27' : '#9ca3af' }} />
                      <span className="text-sm font-medium text-gray-700">Buy Products</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => updateForm('role', 'seller')}
                      className={`flex-1 flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all ${
                        form.role === 'seller' ? 'border-green-600 bg-green-50' : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <Store className="w-6 h-6" style={{ color: form.role === 'seller' ? '#2D5A27' : '#9ca3af' }} />
                      <span className="text-sm font-medium text-gray-700">Sell Products</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Name (register only) */}
              {mode === 'register' && (
                <div className="mb-4">
                  <label className="text-xs font-semibold text-gray-600 mb-1 block">Full Name *</label>
                  <div className="relative">
                    <User className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      value={form.name}
                      onChange={e => updateForm('name', e.target.value)}
                      placeholder="Ahmed Mohamed"
                      className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm outline-none focus:border-green-400"
                    />
                  </div>
                </div>
              )}

              {/* Email */}
              <div className="mb-4">
                <label className="text-xs font-semibold text-gray-600 mb-1 block">Email Address *</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                  <input
                    type="email"
                    value={form.email}
                    onChange={e => updateForm('email', e.target.value)}
                    placeholder="your@email.com"
                    className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm outline-none focus:border-green-400"
                  />
                </div>
              </div>

              {/* Phone & City (register only) */}
              {mode === 'register' && (
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div>
                    <label className="text-xs font-semibold text-gray-600 mb-1 block">Phone *</label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                      <input
                        type="tel"
                        value={form.phone}
                        onChange={e => updateForm('phone', e.target.value)}
                        placeholder="+249..."
                        className="w-full pl-9 pr-3 py-2.5 border border-gray-200 rounded-lg text-sm outline-none focus:border-green-400"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-gray-600 mb-1 block">City *</label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                      <select
                        value={form.city}
                        onChange={e => updateForm('city', e.target.value)}
                        className="w-full pl-9 pr-3 py-2.5 border border-gray-200 rounded-lg text-sm outline-none focus:border-green-400 bg-white"
                      >
                        <option value="">Select</option>
                        {SUDAN_CITIES.map(c => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* Password */}
              <div className="mb-4">
                <label className="text-xs font-semibold text-gray-600 mb-1 block">Password *</label>
                <div className="relative">
                  <input
                    type={showPass ? 'text' : 'password'}
                    value={form.password}
                    onChange={e => updateForm('password', e.target.value)}
                    placeholder="Min. 6 characters"
                    className="w-full pl-4 pr-10 py-2.5 border border-gray-200 rounded-lg text-sm outline-none focus:border-green-400"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass(!showPass)}
                    className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
                  >
                    {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Confirm Password (register only) */}
              {mode === 'register' && (
                <div className="mb-4">
                  <label className="text-xs font-semibold text-gray-600 mb-1 block">Confirm Password *</label>
                  <input
                    type={showPass ? 'text' : 'password'}
                    value={form.confirmPassword}
                    onChange={e => updateForm('confirmPassword', e.target.value)}
                    placeholder="Re-enter password"
                    className="w-full pl-4 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm outline-none focus:border-green-400"
                  />
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                style={{ backgroundColor: '#2D5A27' }}
                className="w-full py-3 rounded-xl text-white font-bold text-sm hover:opacity-90 transition-opacity disabled:opacity-60 flex items-center justify-center gap-2 mt-2"
              >
                {loading ? '...' : mode === 'login' ? 'Sign In' : 'Create Account'}
                {!loading && <ArrowRight className="w-4 h-4" />}
              </button>
            </form>

            {mode === 'login' && (
              <p className="text-center text-sm text-gray-500 mt-4">
                Don't have an account?{' '}
                <button onClick={() => setMode('register')} style={{ color: '#2D5A27' }} className="font-semibold hover:underline">
                  Register free
                </button>
              </p>
            )}
            {mode === 'register' && (
              <p className="text-center text-sm text-gray-500 mt-4">
                Already have an account?{' '}
                <button onClick={() => setMode('login')} style={{ color: '#2D5A27' }} className="font-semibold hover:underline">
                  Sign in
                </button>
              </p>
            )}

            {mode === 'register' && (
              <p className="text-center text-xs text-gray-400 mt-3">
                By registering, you agree to our{' '}
                <a href="#" style={{ color: '#2D5A27' }} className="hover:underline">Terms of Service</a>
                {' '}and{' '}
                <a href="#" style={{ color: '#2D5A27' }} className="hover:underline">Privacy Policy</a>
              </p>
            )}
          </div>

          {/* Loan CTA */}
          <div className="mt-4 p-4 rounded-xl text-center" style={{ backgroundColor: '#E8F5E1', borderColor: '#2D5A27' }}>
            <p className="text-sm text-gray-700">
              🏪 Want to start a business? <Link to="/loan-request" style={{ color: '#2D5A27' }} className="font-semibold hover:underline">Apply for a startup loan →</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
