"use client";
import { useRef, useState } from 'react';
import emailjs from 'emailjs-com';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function ContactPage() {
  const form = useRef<HTMLFormElement>(null);
         const [selectedCategory, setSelectedCategory] = useState('');
       const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    if (form.current) {
                   // Add category to the form data
             const formData = new FormData(form.current);
             formData.append('category', selectedCategory);
      
      emailjs.sendForm('service_sds66sf', 'template_p8soq3v', form.current, 'h4myckedxmxqenmOU')
        .then((result: any) => {
          console.log(result.text);
          toast.success("🎉 Message sent successfully! We'll get back to you soon!");
          setIsSubmitting(false);
        }, (error: any) => {
          console.log(error.text);
          toast.error("❌ Failed to send message, please try again.");
          setIsSubmitting(false);
        });
    }

             (e.target as HTMLFormElement).reset();
         setSelectedCategory('');
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
    <div className="min-h-screen text-white py-20 relative">
      {/* Background Image */}
      <div className="fixed inset-0 z-0">
        <img 
          src="/pattern.jpg" 
          alt="Pattern Background" 
          className="w-full h-full object-cover"
        />

      </div>
      <div className="container mx-auto max-w-6xl px-4">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-yellow-400 mb-8" style={{fontFamily: 'Caveat, cursive'}}>
            Contact Us
          </h1>
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
              <p className="text-lg text-yellow-300">ENTOTO PARK, ADDIS ABABA, ETHIOPIA</p>
            </div>
          </div>
        </div>

        {/* Contact Form - Consistent with website theme */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-black/40 backdrop-blur-sm p-8 rounded-xl border border-yellow-400/30 shadow-2xl">
            <form ref={form} onSubmit={handleFormSubmit} className="space-y-6">
              {/* Name and Email Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-lg font-semibold mb-3 text-yellow-400">
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="from_name" 
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
                    name="from_email"
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
                {selectedCategory && (
                  <input type="hidden" name="category" value={selectedCategory} />
                )}
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
                  rows={6}
                  className="w-full p-4 bg-black/60 backdrop-blur-sm text-white rounded-lg border border-yellow-400/30 focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 focus:outline-none resize-none transition-all duration-300 placeholder-yellow-200/60"
                  placeholder="Tell us about your festival-related inquiry, feedback, or collaboration idea..."
                  required
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting || !selectedCategory}
                className={`w-full py-4 font-bold text-lg rounded-lg transition-all duration-300 transform ${
                  isSubmitting || !selectedCategory
                    ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-yellow-400 to-yellow-500 text-black hover:from-yellow-500 hover:to-yellow-600 hover:scale-105 shadow-lg hover:shadow-xl'
                }`}
              >
                {isSubmitting ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-black mr-3"></div>
                    Sending Message...
                  </div>
                ) : (
                  'Send Message'
                )}
              </button>

              {/* Form Tips */}
              <div className="text-sm text-gray-400 text-center mt-4">
                <p>💡 <strong>Tip:</strong> Select a category to help us route your message to the right team member!</p>
                <p>⏰ We typically respond within 24-48 hours during festival season.</p>
              </div>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer 
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
} 