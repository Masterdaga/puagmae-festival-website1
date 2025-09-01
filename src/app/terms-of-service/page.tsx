'use client';

import Link from 'next/link';

export default function TermsOfService() {
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
            TERMS OF SERVICE
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
                    1. Acceptance of Terms
                  </h2>
                  <div className="space-y-3 text-sm leading-relaxed">
                    <p>
                      By accessing and using the Puagmae Festival website, you
                      accept and agree to be bound by the terms and provision of
                      this agreement. If you do not agree to abide by the above,
                      please do not use this service.
                    </p>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-yellow-400 mb-4">
                    2. Use License
                  </h2>
                  <div className="space-y-3 text-sm leading-relaxed">
                    <p>
                      Permission is granted to temporarily download one copy of
                      the materials (information or software) on Puagmae
                      Festival&apos;s website for personal, non-commercial
                      transitory viewing only. This is the grant of a license,
                      not a transfer of title, and under this license you may
                      not:
                    </p>
                    <ul className="list-disc list-inside ml-4 space-y-2">
                      <li>Modify or copy the materials</li>
                      <li>
                        Use the materials for any commercial purpose or for any
                        public display
                      </li>
                      <li>
                        Attempt to reverse engineer any software contained on
                        the website
                      </li>
                      <li>
                        Remove any copyright or other proprietary notations from
                        the materials
                      </li>
                      <li>
                        Transfer the materials to another person or
                        &quot;mirror&quot; the materials on any other server
                      </li>
                    </ul>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-yellow-400 mb-4">
                    3. Disclaimer
                  </h2>
                  <div className="space-y-3 text-sm leading-relaxed">
                    <p>
                      The materials on Puagmae Festival&apos;s website are
                      provided on an &apos;as is&apos; basis. Puagmae Festival
                      makes no warranties, expressed or implied, and hereby
                      disclaims and negates all other warranties including
                      without limitation, implied warranties or conditions of
                      merchantability, fitness for a particular purpose, or
                      non-infringement of intellectual property or other
                      violation of rights.
                    </p>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-yellow-400 mb-4">
                    4. Limitations
                  </h2>
                  <div className="space-y-3 text-sm leading-relaxed">
                    <p>
                      In no event shall Puagmae Festival or its suppliers be
                      liable for any damages (including, without limitation,
                      damages for loss of data or profit, or due to business
                      interruption) arising out of the use or inability to use
                      the materials on Puagmae Festival&apos;s website, even if
                      Puagmae Festival or a Puagmae Festival authorized
                      representative has been notified orally or in writing of
                      the possibility of such damage.
                    </p>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-yellow-400 mb-4">
                    5. Accuracy of Materials
                  </h2>
                  <div className="space-y-3 text-sm leading-relaxed">
                    <p>
                      The materials appearing on Puagmae Festival&apos;s website
                      could include technical, typographical, or photographic
                      errors. Puagmae Festival does not warrant that any of the
                      materials on its website are accurate, complete, or
                      current. Puagmae Festival may make changes to the
                      materials contained on its website at any time without
                      notice.
                    </p>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-yellow-400 mb-4">
                    6. Modifications
                  </h2>
                  <div className="space-y-3 text-sm leading-relaxed">
                    <p>
                      Puagmae Festival may revise these terms of service for its
                      website at any time without notice. By using this website
                      you are agreeing to be bound by the then current version
                      of these Terms of Service.
                    </p>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-yellow-400 mb-4">
                    7. Governing Law
                  </h2>
                  <div className="space-y-3 text-sm leading-relaxed">
                    <p>
                      These terms and conditions are governed by and construed
                      in accordance with the laws of Ethiopia and you
                      irrevocably submit to the exclusive jurisdiction of the
                      courts in that location.
                    </p>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-yellow-400 mb-4">
                    8. Event Registration and Cancellation
                  </h2>
                  <div className="space-y-3 text-sm leading-relaxed">
                    <p>When registering for festival events:</p>
                    <ul className="list-disc list-inside ml-4 space-y-2">
                      <li>All registrations are subject to availability</li>
                      <li>
                        Registration is free and requires only basic contact
                        information
                      </li>
                      <li>No payment is required for registration</li>
                      <li>
                        Puagmae Festival reserves the right to cancel or modify
                        events
                      </li>
                      <li>Registration confirmation will be sent via email</li>
                    </ul>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-yellow-400 mb-4">
                    9. Code of Conduct
                  </h2>
                  <div className="space-y-3 text-sm leading-relaxed">
                    <p>All festival attendees are expected to:</p>
                    <ul className="list-disc list-inside ml-4 space-y-2">
                      <li>Respect other attendees and staff</li>
                      <li>Follow all venue and event rules</li>
                      <li>Not engage in disruptive or dangerous behavior</li>
                      <li>Comply with all applicable laws and regulations</li>
                    </ul>
                    <p>
                      Violation of these terms may result in removal from events
                      without refund.
                    </p>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-yellow-400 mb-4">
                    10. Contact Information
                  </h2>
                  <div className="space-y-3 text-sm leading-relaxed">
                    <p>
                      If you have any questions about these Terms of Service,
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
