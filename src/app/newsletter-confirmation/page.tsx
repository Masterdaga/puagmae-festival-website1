"use client";
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function NewsletterConfirmation() {
  const [status, setStatus] = useState<'loading' | 'confirmed' | 'unsubscribed' | 'error'>('loading');
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Get the newsletter status from URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const newsletterStatus = urlParams.get('newsletter');

    if (newsletterStatus === 'confirmed') {
      setStatus('confirmed');
      setMessage('Your newsletter subscription has been confirmed successfully!');
    } else if (newsletterStatus === 'unsubscribed') {
      setStatus('unsubscribed');
      setMessage('You have been successfully unsubscribed from our newsletter.');
    } else {
      setStatus('error');
      setMessage('Invalid confirmation link or the link has expired.');
    }
  }, []);

  return (
    <div className="min-h-screen text-white py-20 relative overflow-hidden">
      {/* Background */}
      <div
        className="fixed inset-0 bg-cover bg-center -z-10"
        style={{ backgroundImage: "url('/new-adeyababa.jpg')" }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-black via-[#3b2f23] to-black opacity-80 -z-10" />

      <div className="container mx-auto max-w-4xl px-4">
        <div className="text-center">
          {/* Status Icon */}
          <div className="mb-8">
            {status === 'loading' && (
              <div className="w-24 h-24 mx-auto bg-yellow-400/20 rounded-full flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400"></div>
              </div>
            )}
            {status === 'confirmed' && (
              <div className="w-24 h-24 mx-auto bg-green-400/20 rounded-full flex items-center justify-center">
                <div className="text-4xl">✅</div>
              </div>
            )}
            {status === 'unsubscribed' && (
              <div className="w-24 h-24 mx-auto bg-blue-400/20 rounded-full flex items-center justify-center">
                <div className="text-4xl">📧</div>
              </div>
            )}
            {status === 'error' && (
              <div className="w-24 h-24 mx-auto bg-red-400/20 rounded-full flex items-center justify-center">
                <div className="text-4xl">❌</div>
              </div>
            )}
          </div>

          {/* Title */}
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-600 bg-clip-text text-transparent drop-shadow-lg tracking-wide">
            {status === 'loading' && 'Processing...'}
            {status === 'confirmed' && 'Subscription Confirmed!'}
            {status === 'unsubscribed' && 'Unsubscribed Successfully'}
            {status === 'error' && 'Confirmation Error'}
          </h1>

          {/* Message */}
          <div className="max-w-2xl mx-auto mb-8">
            <p className="text-xl text-yellow-200/90 leading-relaxed">
              {message}
            </p>
          </div>

          {/* Additional Info */}
          {status === 'confirmed' && (
            <div className="bg-black/40 backdrop-blur-sm p-6 rounded-xl border border-yellow-400/30 mb-8">
              <h3 className="text-yellow-400 text-lg font-semibold mb-3">What's Next?</h3>
              <ul className="text-yellow-200/90 text-left space-y-2">
                <li>• You'll receive our latest festival updates and news</li>
                <li>• Get exclusive access to event announcements</li>
                <li>• Stay connected with the PUAGMAE Festival community</li>
              </ul>
            </div>
          )}

          {status === 'unsubscribed' && (
            <div className="bg-black/40 backdrop-blur-sm p-6 rounded-xl border border-yellow-400/30 mb-8">
              <h3 className="text-yellow-400 text-lg font-semibold mb-3">We'll Miss You!</h3>
              <p className="text-yellow-200/90">
                You can always resubscribe anytime by visiting our website and using the newsletter signup form.
              </p>
            </div>
          )}

          {status === 'error' && (
            <div className="bg-black/40 backdrop-blur-sm p-6 rounded-xl border border-red-400/30 mb-8">
              <h3 className="text-red-400 text-lg font-semibold mb-3">What Happened?</h3>
              <ul className="text-yellow-200/90 text-left space-y-2">
                <li>• The confirmation link may have expired</li>
                <li>• The link might be invalid or corrupted</li>
                <li>• You can try subscribing again from our website</li>
              </ul>
            </div>
          )}

          {/* Action Buttons */}
          <div className="space-y-4">
            <Link
              href="/"
              className="inline-block px-8 py-4 font-bold text-lg rounded-lg bg-gradient-to-r from-yellow-400 to-yellow-500 text-black hover:from-yellow-500 hover:to-yellow-600 hover:scale-105 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Return to Homepage
            </Link>

            {status === 'confirmed' && (
              <div className="mt-4">
                <Link
                  href="/schedule"
                  className="inline-block px-6 py-3 font-semibold rounded-lg bg-black/60 border border-yellow-400/30 text-yellow-400 hover:bg-yellow-400/10 hover:border-yellow-400 transition-all duration-300"
                >
                  View Festival Schedule
                </Link>
              </div>
            )}

            {status === 'error' && (
              <div className="mt-4">
                <Link
                  href="/"
                  className="inline-block px-6 py-3 font-semibold rounded-lg bg-black/60 border border-yellow-400/30 text-yellow-400 hover:bg-yellow-400/10 hover:border-yellow-400 transition-all duration-300"
                >
                  Subscribe Again
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
