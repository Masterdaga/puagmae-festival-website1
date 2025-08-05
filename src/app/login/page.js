'use client';
import { useState } from 'react';

export default function LoginPage() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost/my-auth-app/login.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await res.json();
      if (res.ok) {
        setMessage('✅ Login successful!');
        // You can redirect or save user session here
      } else {
        setMessage(result.message || '❌ Login failed.');
      }
    } catch (err) {
      console.error(err);
      setMessage('⚠️ Server error.');
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Login</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required className="border p-2" />
        <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required className="border p-2" />
        <button type="submit" className="bg-green-600 text-white py-2">Login</button>
      </form>
      {message && <p className="mt-4 text-red-600">{message}</p>}
    </div>
  );
}
