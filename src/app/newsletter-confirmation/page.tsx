'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function NewsletterConfirmation() {
  const [status, setStatus] = useState<
    'loading' | 'confirmed' | 'unsubscribed' | 'error'
  >('loading');
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Get the newsletter status from URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const newsletterStatus = urlParams.get('newsletter');

    if (newsletterStatus === 'confirmed') {
      setStatus('confirmed');
      setMessage(
        'Welcome to the PUAGMAE Festival community! Your newsletter subscription has been confirmed successfully.'
      );
    } else if (newsletterStatus === 'unsubscribed') {
      setStatus('unsubscribed');
      setMessage(
        'You have been successfully unsubscribed from our newsletter. We respect your decision.'
      );
    } else {
      setStatus('error');
      setMessage(
        'We encountered an issue with your confirmation link. Please try subscribing again.'
      );
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

      {/* Logo */}
      <div className="absolute top-8 left-8 z-10">
        <Link
          href="/"
          className="flex items-center gap-3 hover:opacity-90 transition-opacity"
        >
          <Image
            src="/logo.png"
            alt="PUAGMAE Festival"
            width={60}
            height={60}
            className="w-12 h-12 sm:w-16 sm:h-16 object-contain"
          />
          <span className="text-xl sm:text-2xl font-black text-yellow-400 tracking-widest hidden sm:block">
            PUAGMAE
          </span>
        </Link>
      </div>

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
                <svg
                  className="w-12 h-12 text-green-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
            )}
            {status === 'unsubscribed' && (
              <div className="w-24 h-24 mx-auto bg-blue-400/20 rounded-full flex items-center justify-center">
                <svg
                  className="w-12 h-12 text-blue-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
            )}
            {status === 'error' && (
              <div className="w-24 h-24 mx-auto bg-red-400/20 rounded-full flex items-center justify-center">
                <svg
                  className="w-12 h-12 text-red-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            )}
          </div>

          {/* Title */}
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-600 bg-clip-text text-transparent drop-shadow-lg tracking-wide">
            {status === 'loading' && 'Processing...'}
            {status === 'confirmed' && 'Welcome to PUAGMAE!'}
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
            <div className="bg-black/40 backdrop-blur-sm p-8 rounded-xl border border-yellow-400/30 mb-8">
              <h3 className="text-yellow-400 text-xl font-semibold mb-4">
                🎉 What&apos;s Next?
              </h3>
              <ul className="text-yellow-200/90 text-left space-y-3">
                <li className="flex items-start">
                  <span className="text-yellow-400 mr-2">•</span>
                  <span>
                    You&apos;ll receive exclusive festival updates and
                    announcements
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-yellow-400 mr-2">•</span>
                  <span>
                    Get early access to event registrations and special offers
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-yellow-400 mr-2">•</span>
                  <span>
                    Stay connected with the vibrant PUAGMAE Festival community
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-yellow-400 mr-2">•</span>
                  <span>
                    Be the first to know about performances, workshops, and
                    activities
                  </span>
                </li>
              </ul>
            </div>
          )}

          {status === 'unsubscribed' && (
            <div className="bg-black/40 backdrop-blur-sm p-8 rounded-xl border border-yellow-400/30 mb-8">
              <h3 className="text-yellow-400 text-xl font-semibold mb-4">
                We&apos;ll Miss You! 💛
              </h3>
              <p className="text-yellow-200/90 mb-4">
                Thank you for being part of our community. You can always
                resubscribe anytime by visiting our website and using the
                newsletter signup form in the footer.
              </p>
              <p className="text-yellow-200/70 text-sm">
                Your data has been removed from our mailing list as requested.
              </p>
            </div>
          )}

          {status === 'error' && (
            <div className="bg-black/40 backdrop-blur-sm p-8 rounded-xl border border-red-400/30 mb-8">
              <h3 className="text-red-400 text-xl font-semibold mb-4">
                What Happened?
              </h3>
              <ul className="text-yellow-200/90 text-left space-y-3">
                <li className="flex items-start">
                  <span className="text-red-400 mr-2">•</span>
                  <span>
                    The confirmation link may have expired (links are valid for
                    24 hours)
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-400 mr-2">•</span>
                  <span>The link might be invalid or corrupted</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-400 mr-2">•</span>
                  <span>
                    You can try subscribing again from our website homepage
                  </span>
                </li>
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
              <div className="mt-4 space-y-3">
                <Link
                  href="/schedule"
                  className="inline-block px-6 py-3 font-semibold rounded-lg bg-black/60 border border-yellow-400/30 text-yellow-400 hover:bg-yellow-400/10 hover:border-yellow-400 transition-all duration-300"
                >
                  View Festival Schedule
                </Link>
                <div className="block">
                  <Link
                    href="/Registration"
                    className="inline-block px-6 py-3 font-semibold rounded-lg bg-black/60 border border-yellow-400/30 text-yellow-400 hover:bg-yellow-400/10 hover:border-yellow-400 transition-all duration-300"
                  >
                    Register for Festival
                  </Link>
                </div>
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

          {/* Footer */}
          <div className="mt-12 pt-8 border-t border-yellow-400/20">
            <p className="text-yellow-200/60 text-sm">
              © 2025 PUAGMAE Festival. Celebrating the African Golden 13th
              Month.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
