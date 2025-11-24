export default function About() {
  return (
    <section className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 dark:from-slate-900 dark:to-slate-800 pt-28 px-8 transition-colors duration-300">
      <div className="max-w-5xl mx-auto text-center">

        <h1 className="text-4xl font-bold text-indigo-700 dark:text-indigo-400">About Utthan Project</h1>

        <p className="mt-4 text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
          Utthan Dashboard helps visualize academic indicators across wards, schools,
          and student groups. It supports decision-making by presenting
          <span className="font-medium text-indigo-600 dark:text-indigo-400"> data-driven insights</span>
          on Reading, Writing, and Numeracy performance.
        </p>

        <div className="grid md:grid-cols-3 gap-8 mt-16">
          {[
            { title: "84,000+ Students", desc: "Large-scale performance tracking." },
            { title: "Ward Analytics", desc: "Compare performance across regions." },
            { title: "Smart Insights", desc: "Visual data to make better decisions." },
          ].map((box) => (
            <div
              key={box.title}
              className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border dark:border-slate-700"
            >
              <h2 className="text-2xl font-bold text-indigo-700 dark:text-indigo-400">{box.title}</h2>
              <p className="text-gray-600 dark:text-gray-300 mt-2">{box.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
