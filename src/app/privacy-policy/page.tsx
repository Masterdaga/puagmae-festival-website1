'use client';

import Link from 'next/link';

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen relative overflow-x-hidden pt-24 pb-12">
      {/* Background Image */}
      <div
        className="fixed inset-0 bg-cover bg-center -z-10"
        style={{ backgroundImage: "url('/new-adeyababa.jpg')" }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-black via-[#3b2f23] to-black opacity-80 -z-10" />

      {/* Subtle gold accent */}
      <div className="pointer-events-none fixed top-0 left-0 z-0">
        <div className="w-40 h-40 bg-yellow-500 opacity-20 rounded-full blur-2xl" />
      </div>

      {/* Background and main content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-amber-400 mb-4">
            PRIVACY POLICY
          </h1>
          <p className="text-lg text-amber-100/80 mb-2">
            Last updated:{' '}
            {new Date().toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-amber-400 mx-auto rounded-full"></div>
        </div>

        {/* Content */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-black/40 backdrop-blur-sm rounded-2xl p-8 border border-yellow-400/20">
            <div className="prose prose-invert prose-yellow max-w-none">
              <div className="space-y-8 text-yellow-200/90">
                <section>
                  <h2 className="text-2xl font-bold text-yellow-400 mb-4">
                    1. Information We Collect
                  </h2>
                  <div className="space-y-3 text-sm leading-relaxed">
                    <p>
                      We collect information you provide directly to us, such as
                      when you:
                    </p>
                    <ul className="list-disc list-inside ml-4 space-y-2">
                      <li>Subscribe to our newsletter</li>
                      <li>Contact us through our website</li>
                      <li>Register for festival events</li>
                      <li>Participate in surveys or promotions</li>
                    </ul>
                    <p>
                      This information may include your name, email address,
                      phone number, and any other information you choose to
                      provide.
                    </p>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-yellow-400 mb-4">
                    2. How We Use Your Information
                  </h2>
                  <div className="space-y-3 text-sm leading-relaxed">
                    <p>We use the information we collect to:</p>
                    <ul className="list-disc list-inside ml-4 space-y-2">
                      <li>Provide, maintain, and improve our services</li>
                      <li>Send you technical notices and support messages</li>
                      <li>
                        Communicate with you about products, services, and
                        events
                      </li>
                      <li>Respond to your comments and questions</li>
                      <li>Develop new products and services</li>
                    </ul>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-yellow-400 mb-4">
                    3. Information Sharing
                  </h2>
                  <div className="space-y-3 text-sm leading-relaxed">
                    <p>
                      We do not sell, trade, or otherwise transfer your personal
                      information to third parties without your consent, except
                      in the following circumstances:
                    </p>
                    <ul className="list-disc list-inside ml-4 space-y-2">
                      <li>To comply with legal obligations</li>
                      <li>To protect our rights and safety</li>
                      <li>
                        With service providers who assist us in operating our
                        website
                      </li>
                      <li>In connection with a business transfer or merger</li>
                    </ul>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-yellow-400 mb-4">
                    4. Data Security
                  </h2>
                  <div className="space-y-3 text-sm leading-relaxed">
                    <p>
                      We implement appropriate security measures to protect your
                      personal information against unauthorized access,
                      alteration, disclosure, or destruction. However, no method
                      of transmission over the internet is 100% secure.
                    </p>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-yellow-400 mb-4">
                    5. Cookies and Tracking Technologies
                  </h2>
                  <div className="space-y-3 text-sm leading-relaxed">
                    <p>
                      We use cookies and similar tracking technologies to
                      enhance your experience on our website. You can control
                      cookie settings through your browser preferences.
                    </p>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-yellow-400 mb-4">
                    6. Your Rights
                  </h2>
                  <div className="space-y-3 text-sm leading-relaxed">
                    <p>You have the right to:</p>
                    <ul className="list-disc list-inside ml-4 space-y-2">
                      <li>Access your personal information</li>
                      <li>Correct inaccurate information</li>
                      <li>Request deletion of your information</li>
                      <li>Opt-out of marketing communications</li>
                      <li>Lodge a complaint with supervisory authorities</li>
                    </ul>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-yellow-400 mb-4">
                    7. Children&apos;s Privacy
                  </h2>
                  <div className="space-y-3 text-sm leading-relaxed">
                    <p>
                      Our services are not intended for children under 13 years
                      of age. We do not knowingly collect personal information
                      from children under 13.
                    </p>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-yellow-400 mb-4">
                    8. Changes to This Policy
                  </h2>
                  <div className="space-y-3 text-sm leading-relaxed">
                    <p>
                      We may update this Privacy Policy from time to time. We
                      will notify you of any changes by posting the new Privacy
                      Policy on this page and updating the &quot;Last
                      updated&quot; date.
                    </p>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-yellow-400 mb-4">
                    9. Contact Us
                  </h2>
                  <div className="space-y-3 text-sm leading-relaxed">
                    <p>
                      If you have any questions about this Privacy Policy,
                      please contact us at:
                    </p>
                    <div className="bg-yellow-400/10 p-4 rounded-lg border border-yellow-400/20">
                      <p className="font-semibold text-yellow-300">
                        Puagmae Festival
                      </p>
                      <p>Email: puagmaef@gmail.com</p>
                      <p>Phone: +251 911 234 567</p>
                      <p>
                        Address: Ledeta Kefleketema, Kebele 49, At last floor of
                        Haven Hotel
                      </p>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>

        {/* Back to Home Button */}
        <div className="text-center mt-8">
          <Link
            href="/"
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black font-bold rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
