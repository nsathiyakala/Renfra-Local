"use client"

import React from "react"

export default function PrivacyPolicy() {
  return (
    <section className="bg-gray-50 text-gray-800 py-16 px-6 md:px-16 lg:px-32">
      <div className="max-w-[85rem] 2xl:max-w-[90rem] mx-auto px-4 md:px-6 lg:px-8">
        {/* Page Title */}
        <h1 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
          Privacy Policy
        </h1>
        <p className="text-gray-600 mb-10">
          Your privacy is important to us. This Privacy Policy explains how we collect, use, 
          disclose, and safeguard your information when you visit our website. By using our website, 
          you consent to the data practices described in this policy.
        </p>

        {/* Section 1 */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-3">1. Information We Collect</h2>
          <p className="text-gray-600 leading-relaxed">
            We may collect personal information such as your name, email address, phone number, 
            and other details when you fill out forms, subscribe to newsletters, or contact us directly. 
            We may also collect non-personal data like browser type, device information, and IP address 
            for analytical purposes.
          </p>
        </div>

        {/* Section 2 */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-3">2. How We Use Your Information</h2>
          <p className="text-gray-600 leading-relaxed">
            The information we collect may be used to:
          </p>
          <ul className="list-disc list-inside text-gray-600 mt-2 space-y-2">
            <li>Provide, operate, and maintain our website</li>
            <li>Improve user experience and website functionality</li>
            <li>Send periodic emails, updates, or promotional content</li>
            <li>Respond to inquiries and provide customer support</li>
            <li>Comply with legal obligations</li>
          </ul>
        </div>

        {/* Section 3 */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-3">3. Cookies and Tracking Technologies</h2>
          <p className="text-gray-600 leading-relaxed">
            Our website may use cookies and similar tracking technologies to enhance your browsing experience. 
            You can choose to disable cookies through your browser settings; however, some parts of the site 
            may not function properly without them.
          </p>
        </div>

        {/* Section 4 */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-3">4. Data Sharing and Disclosure</h2>
          <p className="text-gray-600 leading-relaxed">
            We do not sell, trade, or rent users’ personal identification information to others. 
            We may share limited data with trusted third-party service providers who help us operate our business, 
            provided they agree to keep this information confidential.
          </p>
        </div>

        {/* Section 5 */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-3">5. Data Security</h2>
          <p className="text-gray-600 leading-relaxed">
            We adopt appropriate data collection, storage, and security practices to protect against 
            unauthorized access, alteration, disclosure, or destruction of your personal information, 
            username, password, and transaction data stored on our website.
          </p>
        </div>


        {/* Section 7 */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-3">6. Changes to This Privacy Policy</h2>
          <p className="text-gray-600 leading-relaxed">
            We may update this Privacy Policy from time to time. Any changes will be posted on this page 
            with an updated revision date. We encourage you to review this policy periodically.
          </p>
        </div>

        {/* Contact Info */}
        <div className="border-t border-gray-300 pt-8 mt-10">
          <h2 className="text-2xl font-semibold mb-3">Contact Us</h2>
          <p className="text-gray-600 leading-relaxed">
            If you have any questions about this Privacy Policy or our data practices, please contact us at: <br />
            <span className="font-medium text-gray-900">info@renfraenergy.com</span>
          </p>
        </div>
      </div>
    </section>
  )
}
