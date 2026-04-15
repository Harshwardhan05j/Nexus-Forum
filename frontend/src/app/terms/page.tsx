import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service & Copyright | Nexus Forum',
  description: 'Terms of service and copyright information for the Nexus Forum website.',
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#050505] text-[#f2f2f2] pt-32 pb-20 selection:bg-white/20">
      <div className="max-w-[800px] mx-auto px-6 md:px-12 bg-white/[0.02] border border-white/5 rounded-2xl p-8 md:p-12">
        <h1 className="text-3xl md:text-5xl font-extrabold tracking-[-0.04em] mb-4">Terms of Service & Copyright</h1>
        <p className="text-[#a1a1aa] mb-12">Last Updated: {new Date().getFullYear()}</p>

        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-white border-b border-white/10 pb-4">Copyright Notice</h2>
          <div className="space-y-6 text-[#a1a1aa] leading-relaxed">
            <p className="font-semibold text-white">Copyright &copy; {new Date().getFullYear()} The NEXUS Forum.</p>
            
            <p>
              All rights reserved. The website design, layout, source code, graphics, text, and all other content on this website are the intellectual property of the developers (<strong>Team DS</strong>: Lead Developer Harshwardhan, Contributors Umang and Aarush) and the <strong>Computer Science &amp; Data Science Department at UPES</strong>.
            </p>
            
            <p>
              No part of this website, including but not limited to the Next.js frontend or Flask backend source code, database architectures, forms, and custom assets, may be reproduced, distributed, or transmitted in any form or by any means without prior written permission, except in the case of brief quotations embodied in critical reviews or noncommercial uses permitted by copyright law.
            </p>

            <p>
              For permissions requests, please contact us at <a href="mailto:nexus@upes.ac.in" className="text-white hover:underline transition-colors font-medium">nexus@upes.ac.in</a>.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
