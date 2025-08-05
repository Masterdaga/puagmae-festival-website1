'use client';
import { useState } from 'react';

export default function LoginForm() {
  const [formData, setFormData] = useState({ email: '', phone: '' });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost/your-project-folder/login.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const result = await response.json();
      setMessage(result.message || 'Login failed.');
    } catch (error) {
      setMessage('Something went wrong.');
      console.error(error);
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-xl mb-4 font-bold">Login</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="email" name="email" onChange={handleChange} placeholder="Email" className="w-full border p-2" />
        <input type="text" name="phone" onChange={handleChange} placeholder="Phone" className="w-full border p-2" />
        <button type="submit" className="bg-green-500 text-white px-4 py-2">Login</button>
      </form>
      {message && <p className="mt-2 text-center text-red-600">{message}</p>}
    </div>
  );
}
