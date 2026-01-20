import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Privacy Policy | Lusk Technologies',
  description: 'Privacy Policy for lusk.app - Learn how we collect, use, and protect your data.',
}

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-zinc-950 text-zinc-300">
      <div className="mx-auto max-w-4xl px-6 py-24">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Privacy Policy</h1>
        <p className="text-zinc-500 mb-12">Last updated: January 2026</p>

        <div className="prose prose-invert prose-zinc max-w-none space-y-8">
          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">Introduction</h2>
            <p>
              Lusk Technologies, Inc. (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) operates lusk.app (the &quot;Site&quot;). 
              This Privacy Policy explains how we collect, use, disclose, and safeguard your information 
              when you visit our website.
            </p>
            <p>
              Please read this privacy policy carefully. If you do not agree with the terms of this 
              privacy policy, please do not access the site.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">Information We Collect</h2>
            
            <h3 className="text-xl font-medium text-white mt-6 mb-3">Automatically Collected Information</h3>
            <p>
              When you visit our Site, we may automatically collect certain information about your 
              device and usage patterns, including:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li>Browser type and version</li>
              <li>Operating system</li>
              <li>Pages visited and time spent on pages</li>
              <li>Referring website addresses</li>
              <li>IP address (anonymized where possible)</li>
              <li>Device identifiers</li>
            </ul>

            <h3 className="text-xl font-medium text-white mt-6 mb-3">Information You Provide</h3>
            <p>
              We may collect information you voluntarily provide when using our contact form, including:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li>Name</li>
              <li>Email address</li>
              <li>Message content</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">Third-Party Services</h2>
            
            <h3 className="text-xl font-medium text-white mt-6 mb-3">Google Analytics</h3>
            <p>
              We use Google Analytics to help us understand how visitors interact with our Site. 
              Google Analytics collects information such as how often users visit the Site, what 
              pages they visit, and what other sites they used prior to coming to our Site.
            </p>
            <p className="mt-4">
              Google Analytics uses cookies to collect this information. The information generated 
              by the cookie about your use of the Site is transmitted to and stored by Google. 
              Google may use this data to contextualize and personalize ads in its advertising network.
            </p>
            <p className="mt-4">
              You can opt-out of Google Analytics by installing the{' '}
              <a 
                href="https://tools.google.com/dlpage/gaoptout" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-violet-400 hover:text-violet-300 underline"
              >
                Google Analytics Opt-out Browser Add-on
              </a>.
            </p>
            <p className="mt-4">
              For more information on Google&apos;s privacy practices, visit:{' '}
              <a 
                href="https://policies.google.com/privacy" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-violet-400 hover:text-violet-300 underline"
              >
                Google Privacy Policy
              </a>
            </p>

            <h3 className="text-xl font-medium text-white mt-6 mb-3">Sentry</h3>
            <p>
              We use Sentry for error tracking and performance monitoring. When an error occurs 
              on our Site, Sentry may collect:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li>Error messages and stack traces</li>
              <li>Browser and device information</li>
              <li>URL where the error occurred</li>
              <li>User actions leading to the error</li>
            </ul>
            <p className="mt-4">
              This information helps us identify and fix issues to improve your experience. 
              Sentry&apos;s privacy policy can be found at:{' '}
              <a 
                href="https://sentry.io/privacy/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-violet-400 hover:text-violet-300 underline"
              >
                Sentry Privacy Policy
              </a>
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">How We Use Your Information</h2>
            <p>We may use the information we collect to:</p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li>Respond to your inquiries and contact requests</li>
              <li>Analyze usage patterns to improve our Site</li>
              <li>Monitor and fix technical issues</li>
              <li>Protect against malicious or fraudulent activity</li>
              <li>Comply with legal obligations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">Cookies</h2>
            <p>
              Our Site uses cookies and similar tracking technologies. Cookies are small data files 
              stored on your device that help us improve our Site and your experience.
            </p>
            <p className="mt-4">
              You can instruct your browser to refuse all cookies or to indicate when a cookie is 
              being sent. However, if you do not accept cookies, you may not be able to use some 
              portions of our Site.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">Data Retention</h2>
            <p>
              We retain collected information for as long as necessary to fulfill the purposes 
              outlined in this privacy policy, unless a longer retention period is required or 
              permitted by law.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">Data Security</h2>
            <p>
              We implement appropriate technical and organizational security measures to protect 
              your information. However, no method of transmission over the Internet or electronic 
              storage is 100% secure, and we cannot guarantee absolute security.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">Your Rights</h2>
            <p>Depending on your location, you may have the right to:</p>
            <ul className="list-disc pl-6 space-y-2 mt-4">
              <li>Access the personal information we hold about you</li>
              <li>Request correction of inaccurate information</li>
              <li>Request deletion of your information</li>
              <li>Object to or restrict processing of your information</li>
              <li>Data portability</li>
            </ul>
            <p className="mt-4">
              To exercise these rights, please contact us at{' '}
              <a 
                href="mailto:hello@lusk.app" 
                className="text-violet-400 hover:text-violet-300 underline"
              >
                hello@lusk.app
              </a>
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">Children&apos;s Privacy</h2>
            <p>
              Our Site is not intended for children under 13 years of age. We do not knowingly 
              collect personal information from children under 13. If you are a parent or guardian 
              and believe your child has provided us with personal information, please contact us.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">Changes to This Policy</h2>
            <p>
              We may update this privacy policy from time to time. We will notify you of any 
              changes by posting the new privacy policy on this page and updating the &quot;Last 
              updated&quot; date.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-4">Contact Us</h2>
            <p>
              If you have questions about this Privacy Policy, please contact us at:
            </p>
            <div className="mt-4 p-6 bg-zinc-900 rounded-xl border border-zinc-800">
              <p className="font-medium text-white">Lusk Technologies, Inc.</p>
              <p>Toronto, Ontario, Canada</p>
              <p className="mt-2">
                Email:{' '}
                <a 
                  href="mailto:hello@lusk.app" 
                  className="text-violet-400 hover:text-violet-300 underline"
                >
                  hello@lusk.app
                </a>
              </p>
            </div>
          </section>
        </div>

        <div className="mt-16 pt-8 border-t border-zinc-800">
          <Link 
            href="/" 
            className="text-violet-400 hover:text-violet-300 transition-colors"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </main>
  )
}
