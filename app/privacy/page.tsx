import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy — Solvexa",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white">
      <header className="border-b border-slate-100 px-6 py-4">
        <Link href="/"><Logo /></Link>
      </header>

      <main className="mx-auto max-w-2xl px-6 py-16">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">Privacy Policy</h1>
        <p className="text-sm text-slate-400 mb-12">Last updated: June 2025</p>

        <div className="prose prose-slate prose-sm max-w-none space-y-10">

          <section>
            <h2 className="text-base font-semibold text-slate-900 mb-3">1. Who we are</h2>
            <p className="text-slate-600 leading-relaxed">
              Solvexa is a free maths learning platform for students in the UAE, Brazil, and beyond. We help students solve problems, connect with tutors, and learn together as a community. You can reach us at <a href="mailto:solvexa.math@gmail.com" className="text-brand-600 hover:underline">solvexa.math@gmail.com</a>.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-slate-900 mb-3">2. What data we collect</h2>
            <ul className="text-slate-600 leading-relaxed space-y-2 list-disc pl-5">
              <li><strong>Account information:</strong> your name and email address when you sign up with Google.</li>
              <li><strong>Profile data:</strong> any optional information you add to your profile such as a profile picture or bio.</li>
              <li><strong>Usage data:</strong> maths problems you solve, communities you join, and messages you send within the platform.</li>
              <li><strong>Device data:</strong> basic browser and device information for security purposes.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-base font-semibold text-slate-900 mb-3">3. How we use your data</h2>
            <ul className="text-slate-600 leading-relaxed space-y-2 list-disc pl-5">
              <li>To provide and improve the Solvexa platform.</li>
              <li>To personalise your experience and show your problem history.</li>
              <li>To enable messaging between students and tutors.</li>
              <li>To maintain the security of your account.</li>
            </ul>
            <p className="text-slate-600 leading-relaxed mt-3">We do not sell your data. We do not use your data for advertising.</p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-slate-900 mb-3">4. Data storage</h2>
            <p className="text-slate-600 leading-relaxed">
              Your data is stored securely using Supabase, hosted on servers within the European Union. We use industry-standard encryption and row-level security policies to protect your information.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-slate-900 mb-3">5. Third-party services</h2>
            <ul className="text-slate-600 leading-relaxed space-y-2 list-disc pl-5">
              <li><strong>Google OAuth:</strong> used for sign-in. We only receive your name and email from Google.</li>
              <li><strong>Groq AI:</strong> used to process maths problems. Your problem text is sent to Groq's API to generate solutions. Groq's privacy policy applies.</li>
              <li><strong>Supabase:</strong> used for database and file storage.</li>
              <li><strong>Vercel:</strong> used to host the platform.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-base font-semibold text-slate-900 mb-3">6. Your rights</h2>
            <p className="text-slate-600 leading-relaxed">
              You have the right to access, correct, or delete your personal data at any time. To request deletion of your account and data, email us at <a href="mailto:solvexa.math@gmail.com" className="text-brand-600 hover:underline">solvexa.math@gmail.com</a> and we will process your request within 7 days.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-slate-900 mb-3">7. Children</h2>
            <p className="text-slate-600 leading-relaxed">
              Solvexa is designed for secondary school students. We do not knowingly collect data from children under 13. If you believe a child under 13 has created an account, please contact us and we will delete it promptly.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-slate-900 mb-3">8. Changes to this policy</h2>
            <p className="text-slate-600 leading-relaxed">
              We may update this policy from time to time. We will notify users of significant changes by posting a notice on the platform. Continued use of Solvexa after changes means you accept the updated policy.
            </p>
          </section>

          <section>
            <h2 className="text-base font-semibold text-slate-900 mb-3">9. Contact</h2>
            <p className="text-slate-600 leading-relaxed">
              For any privacy-related questions, reach us at <a href="mailto:solvexa.math@gmail.com" className="text-brand-600 hover:underline">solvexa.math@gmail.com</a>.
            </p>
          </section>

        </div>
      </main>
    </div>
  );
}
