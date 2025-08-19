'use client';
import { useState } from 'react';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });

  const [status, setStatus] = useState<'idle'|'loading'|'success'|'error'>('idle');
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (status === 'error') setStatus('idle');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setError('');

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000';
      
      const response = await fetch(`${apiUrl}/register`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim()
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.error || data?.message || 'Registration failed');
      }

      setStatus('success');
      setFormData({ name: '', email: '', phone: '' });

      // Auto-reset success message after 5 seconds
      setTimeout(() => setStatus('idle'), 5000);
      
    } catch (err: any) {
      console.error('Registration error:', err);
      setStatus('error');
      setError(
        err.message || 'Failed to complete registration. Please try again.'
      );
    }
  };

  return (
    <div
      id="register"
      className="min-h-screen pt-24 relative overflow-hidden px-4 py-16 flex items-center justify-center"
    >
      <div
        className="fixed inset-0 bg-cover bg-center -z-10"
        style={{ backgroundImage: "url('/new-adeyababa.jpg')" }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-black via-[#3b2f23] to-black opacity-80 -z-10" />

      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-32 h-32 bg-yellow-400 rounded-full blur-3xl"></div>
        <div className="absolute top-40 right-20 w-48 h-48 bg-amber-400 rounded-full blur-3xl"></div>
        <div className="absolute bottom-32 left-1/4 w-40 h-40 bg-orange-400 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-1/3 w-36 h-36 bg-yellow-300 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-amber-300 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>
      </div>

      <div className="relative bg-white/90 backdrop-blur-sm shadow-md border border-[#c8b580] rounded-xl p-8 w-full max-w-lg mt-20">
        <h1 className="text-3xl font-bold text-yellow-700 mb-6 text-center">
          Register for PUAGME Festival
        </h1>

        {status === 'success' ? (
          <div className="text-center text-green-600 font-semibold animate-fade-in">
            ✅ Registration successful! Check your email for confirmation.
          </div>
        ) : (
          <>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-slate-700 mb-1"
                >
                  Full Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  minLength={2}
                  maxLength={100}
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-yellow-600 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-slate-700 mb-1"
                >
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-yellow-600 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  placeholder="Enter your email address"
                />
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-slate-700 mb-1"
                >
                  Phone Number
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  minLength={10}
                  maxLength={15}
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-yellow-600 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  placeholder="Enter your phone number"
                />
              </div>

              <button
                type="submit"
                disabled={status === 'loading'}
                className={`w-full bg-yellow-600 hover:bg-yellow-700 text-white font-semibold py-2 rounded-md transition-all duration-300 ${
                  status === 'loading' ? 'opacity-70 cursor-not-allowed' : ''
                }`}
              >
                {status === 'loading' ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </span>
                ) : (
                  'Submit'
                )}
              </button>
            </form>

            {status === 'error' && (
              <div className="mt-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-md text-center animate-fade-in">
                {error || 'Registration failed. Please try again.'}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}