"use client"

import React from "react"

export default function TermsAndConditions() {
  return (
    <section className="bg-gray-50 text-gray-800 py-16 px-6 md:px-16 lg:px-32">
      <div className="max-w-[85rem] 2xl:max-w-[90rem] mx-auto px-4 md:px-6 lg:px-8">
        {/* Page Title */}
        <h1 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
          Terms and Conditions
        </h1>
        <p className="text-gray-600 mb-10">
          Please read these Terms and Conditions carefully before using our website or services. 
          By accessing or using our site, you agree to comply with and be bound by these terms.
        </p>

        {/* Section 1 */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-3">1. Acceptance of Terms</h2>
          <p className="text-gray-600 leading-relaxed">
            By accessing or using our website, you agree to be bound by these Terms and Conditions. 
            If you do not agree with any part of the terms, you may not access the website or use our services.
          </p>
        </div>

        {/* Section 2 */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-3">2. Use of the Website</h2>
          <p className="text-gray-600 leading-relaxed">
            You agree to use the website only for lawful purposes and in a manner that does not infringe 
            the rights of restrict or inhibit anyone else use and enjoyment of the website.
          </p>
        </div>

        {/* Section 3 */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-3">3. Intellectual Property</h2>
          <p className="text-gray-600 leading-relaxed">
            All content on this website, including text, graphics, logos, and images, 
            is the property of our company or its licensors and is protected by applicable copyright and trademark laws.
          </p>
        </div>

        {/* Section 4 */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-3">4. Limitation of Liability</h2>
          <p className="text-gray-600 leading-relaxed">
            We shall not be liable for any indirect, incidental, special, consequential, or punitive damages 
            arising out of your access to or use of the website or any materials available on it.
          </p>
        </div>

        {/* Section 6 */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-3">5. Changes to These Terms</h2>
          <p className="text-gray-600 leading-relaxed">
            We may update these Terms and Conditions from time to time without prior notice. 
            Any changes will be effective immediately upon posting on this page.
          </p>
        </div>

        {/* Section 7 */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-3">6. Governing Law</h2>
          <p className="text-gray-600 leading-relaxed">
            These Terms and Conditions shall be governed by and construed in accordance with the laws 
            of your jurisdiction, without regard to its conflict of law provisions.
          </p>
        </div>

        {/* Contact Info */}
        <div className="border-t border-gray-300 pt-8 mt-10">
          <h2 className="text-2xl font-semibold mb-3">Contact Us</h2>
          <p className="text-gray-600 leading-relaxed">
            If you have any questions about these Terms and Conditions, please contact us at: <br />
            <span className="font-medium text-gray-900">info@renfraenergy.com</span>
          </p>
        </div>
      </div>
    </section>
  )
}
