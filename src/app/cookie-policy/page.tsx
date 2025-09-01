'use client';

import Link from 'next/link';

export default function CookiePolicy() {
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
            COOKIE POLICY
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
                    1. What Are Cookies
                  </h2>
                  <div className="space-y-3 text-sm leading-relaxed">
                    <p>
                      Cookies are small text files that are placed on your
                      computer or mobile device when you visit a website. They
                      are widely used to make websites work more efficiently and
                      provide useful information to website owners.
                    </p>
                    <p>
                      Cookies allow websites to remember your preferences,
                      understand how you use the site, and provide you with a
                      more personalized experience.
                    </p>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-yellow-400 mb-4">
                    2. How We Use Cookies
                  </h2>
                  <div className="space-y-3 text-sm leading-relaxed">
                    <p>Puagmae Festival uses cookies for several purposes:</p>
                    <ul className="list-disc list-inside ml-4 space-y-2">
                      <li>
                        <strong>Essential Cookies:</strong> These cookies are
                        necessary for the website to function properly and
                        cannot be disabled
                      </li>
                      <li>
                        <strong>Performance Cookies:</strong> These cookies help
                        us understand how visitors interact with our website
                      </li>
                      <li>
                        <strong>Functionality Cookies:</strong> These cookies
                        remember your preferences and settings
                      </li>
                      <li>
                        <strong>Marketing Cookies:</strong> These cookies are
                        used to deliver relevant advertisements
                      </li>
                    </ul>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-yellow-400 mb-4">
                    3. Types of Cookies We Use
                  </h2>
                  <div className="space-y-4 text-sm leading-relaxed">
                    <div>
                      <h3 className="text-lg font-semibold text-yellow-300 mb-2">
                        Essential Cookies
                      </h3>
                      <p>
                        These cookies are essential for the website to function
                        and cannot be switched off. They are usually only set in
                        response to actions made by you such as setting your
                        privacy preferences, logging in, or filling in forms.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-yellow-300 mb-2">
                        Analytics Cookies
                      </h3>
                      <p>
                        These cookies allow us to count visits and traffic
                        sources so we can measure and improve the performance of
                        our site. They help us to know which pages are the most
                        and least popular and see how visitors move around the
                        site.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-yellow-300 mb-2">
                        Functional Cookies
                      </h3>
                      <p>
                        These cookies enable the website to provide enhanced
                        functionality and personalization. They may be set by us
                        or by third-party providers whose services we have added
                        to our pages.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-yellow-300 mb-2">
                        Marketing Cookies
                      </h3>
                      <p>
                        These cookies may be set through our site by our
                        advertising partners. They may be used by those
                        companies to build a profile of your interests and show
                        you relevant advertisements on other sites.
                      </p>
                    </div>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-yellow-400 mb-4">
                    4. Third-Party Cookies
                  </h2>
                  <div className="space-y-3 text-sm leading-relaxed">
                    <p>
                      In addition to our own cookies, we may also use various
                      third-party cookies to report usage statistics of the
                      website, deliver advertisements on and through the
                      website, and so on.
                    </p>
                    <p>These third-party cookies may include:</p>
                    <ul className="list-disc list-inside ml-4 space-y-2">
                      <li>Google Analytics for website analytics</li>
                      <li>Social media platforms for sharing functionality</li>
                      <li>Payment processors for secure transactions</li>
                      <li>Advertising networks for relevant content</li>
                    </ul>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-yellow-400 mb-4">
                    5. Managing Your Cookie Preferences
                  </h2>
                  <div className="space-y-3 text-sm leading-relaxed">
                    <p>You can control and manage cookies in various ways:</p>
                    <ul className="list-disc list-inside ml-4 space-y-2">
                      <li>
                        <strong>Browser Settings:</strong> Most web browsers
                        allow you to manage cookies through their settings
                        preferences
                      </li>
                      <li>
                        <strong>Cookie Consent:</strong> We provide cookie
                        consent options when you first visit our website
                      </li>
                      <li>
                        <strong>Third-Party Opt-outs:</strong> Many third-party
                        services provide opt-out mechanisms
                      </li>
                    </ul>
                    <p>
                      Please note that disabling certain cookies may affect the
                      functionality of our website.
                    </p>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-yellow-400 mb-4">
                    6. Cookie Duration
                  </h2>
                  <div className="space-y-3 text-sm leading-relaxed">
                    <p>Cookies on our website may be:</p>
                    <ul className="list-disc list-inside ml-4 space-y-2">
                      <li>
                        <strong>Session Cookies:</strong> These are temporary
                        cookies that expire when you close your browser
                      </li>
                      <li>
                        <strong>Persistent Cookies:</strong> These remain on
                        your device for a set period or until you delete them
                      </li>
                    </ul>
                    <p>
                      The specific duration of each cookie varies depending on
                      its purpose and the service provider.
                    </p>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-yellow-400 mb-4">
                    7. Your Rights
                  </h2>
                  <div className="space-y-3 text-sm leading-relaxed">
                    <p>
                      Under applicable data protection laws, you have the right
                      to:
                    </p>
                    <ul className="list-disc list-inside ml-4 space-y-2">
                      <li>Be informed about the use of cookies</li>
                      <li>Give or withdraw consent to non-essential cookies</li>
                      <li>Access information about cookies we use</li>
                      <li>Request deletion of cookie data</li>
                      <li>Lodge a complaint with supervisory authorities</li>
                    </ul>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-yellow-400 mb-4">
                    8. Updates to This Policy
                  </h2>
                  <div className="space-y-3 text-sm leading-relaxed">
                    <p>
                      We may update this Cookie Policy from time to time to
                      reflect changes in our practices or for other operational,
                      legal, or regulatory reasons. We will notify you of any
                      material changes by posting the new Cookie Policy on this
                      page.
                    </p>
                  </div>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-yellow-400 mb-4">
                    9. Contact Us
                  </h2>
                  <div className="space-y-3 text-sm leading-relaxed">
                    <p>
                      If you have any questions about our use of cookies or this
                      Cookie Policy, please contact us at:
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
    </div>
  );
}
