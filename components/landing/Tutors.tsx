import { FloatingMathSymbols, buildEvenSymbols } from "./FloatingMathSymbols";

const tutorSymbols = buildEvenSymbols(["ƒ", "∂", "±", "θ"]);

export function Tutors() {
  return (
    <section id="tutors" className="relative bg-white py-14 sm:py-20 overflow-hidden">
      <FloatingMathSymbols symbols={tutorSymbols} theme="light" />

      <div className="relative mx-auto max-w-6xl px-5 sm:px-6">

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">

          {/* Left */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-brand-600 mb-3">
              Tutors
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 mb-5">
              Students who want to teach
            </h2>
            <p className="text-sm sm:text-base text-slate-500 leading-relaxed mb-8">
              If you're good at maths and want to help others, become a tutor on Solvexa. Work with students on your own schedule.
            </p>
            <a
              href="mailto:solvexa.math@gmail.com?subject=Tutor%20Application"
              className="inline-flex items-center gap-2 rounded-xl bg-brand-600 px-6 py-3.5 text-sm font-semibold text-white shadow-sm hover:bg-brand-500 transition-colors"
            >
              Apply as a tutor
            </a>
          </div>

          {/* Right */}
          <div className="grid grid-cols-2 gap-3">
            {[
              { title: "Your own schedule", body: "Take sessions when it works for you." },
              { title: "Fully free", body: "No cost to book or run a session." },
              { title: "Any level", body: "From GCSE to IB to ENEM." },
              { title: "Real experience", body: "Teaching is the best way to learn." },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-slate-100 bg-slate-50 p-5"
              >
                <p className="text-sm font-semibold text-slate-900 mb-1">{item.title}</p>
                <p className="text-xs text-slate-500 leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
