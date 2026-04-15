import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy | Nexus Forum',
  description: 'Privacy policy for the Nexus Forum website — learn how we collect, use, and protect your information.',
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#050505] text-[#f2f2f2] pt-32 pb-20 selection:bg-white/20">
      <div className="max-w-[800px] mx-auto px-6 md:px-12 bg-white/[0.02] border border-white/5 rounded-2xl p-8 md:p-12">
        <h1 className="text-3xl md:text-5xl font-extrabold tracking-[-0.04em] mb-4">Privacy Policy</h1>
        <p className="text-[#a1a1aa] mb-12">Last Updated: {new Date().getFullYear()}</p>

        <section className="mb-10">
          <h2 className="text-xl font-bold mb-4 text-white border-b border-white/10 pb-3">1. Information We Collect</h2>
          <div className="space-y-4 text-[#a1a1aa] leading-relaxed text-sm">
            <p>When you use the Nexus Forum website, we may collect the following information:</p>
            <ul className="list-disc list-inside space-y-2 pl-2">
              <li><strong className="text-zinc-300">Account Information:</strong> Name and email address when you sign up or log in via Google OAuth.</li>
              <li><strong className="text-zinc-300">Registration Data:</strong> Information you provide when registering for events, joining clubs, or signing up for HackRonyX (name, email, department, year, college, city, state, mobile number).</li>
              <li><strong className="text-zinc-300">Event Proposals:</strong> Details submitted via the event proposal form.</li>
              <li><strong className="text-zinc-300">Usage Data:</strong> Basic analytics such as page visit counts (no personally identifiable data is stored for analytics).</li>
            </ul>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-bold mb-4 text-white border-b border-white/10 pb-3">2. How We Use Your Information</h2>
          <div className="space-y-4 text-[#a1a1aa] leading-relaxed text-sm">
            <ul className="list-disc list-inside space-y-2 pl-2">
              <li>To authenticate your identity and manage your account.</li>
              <li>To process your club applications and event registrations.</li>
              <li>To send confirmation and informational emails related to your submissions.</li>
              <li>To notify administrators of new registrations and proposals.</li>
              <li>To improve the website experience and manage department activities.</li>
            </ul>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-bold mb-4 text-white border-b border-white/10 pb-3">3. Data Storage & Security</h2>
          <div className="space-y-4 text-[#a1a1aa] leading-relaxed text-sm">
            <p>Your data is stored securely in a database managed by the Nexus Forum development team. We use industry-standard practices including:</p>
            <ul className="list-disc list-inside space-y-2 pl-2">
              <li>Encrypted connections (HTTPS) for all data in transit.</li>
              <li>Hashed passwords — your password is never stored in plain text.</li>
              <li>Environment-based secret management — no credentials are hardcoded.</li>
              <li>Rate limiting on form submissions to prevent abuse.</li>
            </ul>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-bold mb-4 text-white border-b border-white/10 pb-3">4. Third-Party Services</h2>
          <div className="space-y-4 text-[#a1a1aa] leading-relaxed text-sm">
            <p>We use the following third-party services:</p>
            <ul className="list-disc list-inside space-y-2 pl-2">
              <li><strong className="text-zinc-300">Google OAuth:</strong> For secure sign-in. Your Google data is governed by <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:underline">Google's Privacy Policy</a>.</li>
              <li><strong className="text-zinc-300">Gmail SMTP:</strong> Used to send confirmation emails. Emails are sent on behalf of the Nexus Forum.</li>
            </ul>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-bold mb-4 text-white border-b border-white/10 pb-3">5. Data Retention & Deletion</h2>
          <p className="text-[#a1a1aa] leading-relaxed text-sm">
            Your data is retained for the duration of the academic year or as required to fulfill the purpose of collection. To request deletion of your data, please contact us at{' '}
            <a href="mailto:nexus@upes.ac.in" className="text-white hover:underline transition-colors font-medium">nexus@upes.ac.in</a>.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-bold mb-4 text-white border-b border-white/10 pb-3">6. Contact</h2>
          <p className="text-[#a1a1aa] leading-relaxed text-sm">
            If you have any questions or concerns about this Privacy Policy, please reach out to us at{' '}
            <a href="mailto:nexus@upes.ac.in" className="text-white hover:underline transition-colors font-medium">nexus@upes.ac.in</a>.
          </p>
        </section>

        <p className="text-[#52525b] text-xs border-t border-white/5 pt-6">
          © {new Date().getFullYear()} The NEXUS Forum, Computer Science & Data Science Department, UPES. All rights reserved.
        </p>
      </div>
    </div>
  );
}
