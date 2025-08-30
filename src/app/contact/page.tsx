"use client";
import { useState } from 'react';

export default function ContactPage() {
  const [selectedCategory, setSelectedCategory] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [resultMessage, setResultMessage] = useState<string | null>(null);
  const [resultType, setResultType] = useState<'success' | 'error' | null>(null);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setResultMessage(null);
    setResultType(null);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
          category: selectedCategory || 'general',
        }),
      });

      const data = await response.json();
      if (response.ok && data.success) {
        setResultType('success');
        setResultMessage('Your message has been sent successfully. We will get back to you soon.');
        setFormData({ name: '', email: '', subject: '', message: '' });
        setSelectedCategory('');
      } else {
        setResultType('error');
        setResultMessage(data.message || 'Failed to send your message. Please try again later.');
      }
    } catch {
      setResultType('error');
      setResultMessage('Failed to send your message. Please check your internet connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const categories = [
    { value: 'general', label: 'General Inquiry', icon: '💬' },
    { value: 'partnership', label: 'Partnership', icon: '🤝' },
    { value: 'volunteer', label: 'Volunteer', icon: '❤️' },
    { value: 'performance', label: 'Performance', icon: '🎭' },
    { value: 'vendor', label: 'Vendor/Exhibitor', icon: '🛍️' },
    { value: 'media', label: 'Media/Press', icon: '📰' },
    { value: 'feedback', label: 'Feedback', icon: '💭' },
    { value: 'technical', label: 'Technical Support', icon: '🔧' }
  ];

  

  return (
    <div className="min-h-screen text-white py-20 relative overflow-hidden">
      <div
        className="fixed inset-0 bg-cover bg-center -z-10"
        style={{ backgroundImage: "url('/new-adeyababa.jpg')" }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-black via-[#3b2f23] to-black opacity-80 -z-10" />
      <div className="container mx-auto max-w-6xl px-4">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-4 bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-600 bg-clip-text text-transparent drop-shadow-lg tracking-wide">
            Contact Us
          </h1>
          <div className="w-32 h-1 mx-auto rounded bg-gradient-to-r from-yellow-400 to-yellow-600 mt-4" />
          <p className="text-yellow-200/90 text-lg max-w-2xl mx-auto mt-6">
            Have questions about the festival? Want to collaborate? We&apos;d love to hear from you!
          </p>
        </div>

        {/* Paragraph Section - Separate from form */}
        <div className="max-w-4xl mx-auto mb-12 text-center relative z-10">
          <div className="space-y-6 text-yellow-200 bg-black/20 p-6 rounded-lg">
            <p className="text-lg font-medium text-yellow-300">
              If you require any info or want to share what your heart tells you, please reach out!
            </p>
            <p className="text-lg text-yellow-200">
              Our team happens thanks to your continuous feedback and support. This is a space for open dialogue and exchanging ideas. Let us know how we can be of service by filling out the form below or by sending us an email.
            </p>
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-yellow-400">PUAGMAE FESTIVAL</h3>
              <p className="text-lg text-yellow-300">Haven Hotel, Ledeta Kefleketema, ADDIS ABABA, ETHIOPIA</p>
            </div>
          </div>
        </div>

        {/* Contact Form - Simple Email Approach */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-black/40 backdrop-blur-sm p-8 rounded-xl border border-yellow-400/30 shadow-2xl">
            <div className="space-y-6">
              {/* Simple Instructions */}
              <div className="text-center mb-6">
                <p className="text-yellow-200 text-lg">
                  Fill out the form below, then click &quot;Send Email&quot; to contact our festival team!
                </p>
              </div>

              {/* Name and Email Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-lg font-semibold mb-3 text-yellow-400">
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full p-4 bg-black/60 backdrop-blur-sm text-white rounded-lg border border-yellow-400/30 focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 focus:outline-none transition-all duration-300 placeholder-yellow-200/60"
                    placeholder="Your Full Name"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-lg font-semibold mb-3 text-yellow-400">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full p-4 bg-black/60 backdrop-blur-sm text-white rounded-lg border border-yellow-400/30 focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 focus:outline-none transition-all duration-300 placeholder-yellow-200/60"
                    placeholder="your.email@example.com"
                    required
                  />
                </div>
              </div>

              {/* Category Selection */}
              <div>
                <label className="block text-lg font-semibold mb-3 text-yellow-400">
                  Message Category *
                </label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {categories.map((category) => (
                    <button
                      key={category.value}
                      type="button"
                      onClick={() => setSelectedCategory(category.value)}
                      className={`p-3 rounded-lg border-2 transition-all duration-300 text-center ${
                        selectedCategory === category.value
                          ? 'border-yellow-400 bg-yellow-400/20 text-yellow-400'
                          : 'border-yellow-400/30 bg-black/60 backdrop-blur-sm text-yellow-200 hover:border-yellow-400/50 hover:bg-yellow-400/10'
                      }`}
                    >
                      <div className="text-2xl mb-1">{category.icon}</div>
                      <div className="text-sm font-medium">{category.label}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Subject */}
              <div>
                <label htmlFor="subject" className="block text-lg font-semibold mb-3 text-yellow-400">
                  Subject *
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className="w-full p-4 bg-black/60 backdrop-blur-sm text-white rounded-lg border border-yellow-400/30 focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 focus:outline-none transition-all duration-300 placeholder-yellow-200/60"
                  placeholder="Brief description of your inquiry"
                  required
                />
              </div>
              
              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-lg font-semibold mb-3 text-yellow-400">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={6}
                  className="w-full p-4 bg-black/60 backdrop-blur-sm text-white rounded-lg border border-yellow-400/30 focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 focus:outline-none resize-none transition-all duration-300 placeholder-yellow-200/60"
                  placeholder="Tell us about your festival-related inquiry, feedback, or collaboration idea..."
                  required
                />
              </div>

              {/* Submit Button */}
              <button
                onClick={handleSubmit}
                disabled={isSubmitting || !selectedCategory || !formData.name || !formData.email || !formData.subject || !formData.message}
                className={`w-full py-4 font-bold text-lg rounded-lg transition-all duration-300 transform ${
                  isSubmitting || !selectedCategory || !formData.name || !formData.email || !formData.subject || !formData.message
                    ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-yellow-400 to-yellow-500 text-black hover:from-yellow-500 hover:to-yellow-600 hover:scale-105 shadow-lg hover:shadow-xl'
                }`}
              >
                {isSubmitting ? 'Sending…' : 'Send Message'}
              </button>

              {/* Result Message */}
              {resultMessage && (
                <div className={`text-sm text-center mt-4 ${resultType === 'success' ? 'text-green-400' : 'text-red-400'}`}>
                  {resultMessage}
                </div>
              )}
            </div>
          </div>
                </div>
      </div>
    </div>
  );
} 