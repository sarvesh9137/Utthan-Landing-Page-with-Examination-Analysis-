export default function Contact() {
  return (
    <section className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 dark:from-slate-900 dark:to-slate-800 pt-28 px-8 transition-colors duration-300">
      <div className="max-w-4xl mx-auto text-center">

        <h1 className="text-4xl font-bold text-emerald-700 dark:text-emerald-400">Contact Us</h1>

        <p className="text-gray-700 dark:text-gray-300 mt-4 text-lg">
          For support, collaboration, or inquiries regarding the Utthan Dashboard project,
          feel free to reach out.
        </p>

        <form className="mt-10 bg-white dark:bg-slate-800 p-10 rounded-2xl shadow-xl grid gap-6 border dark:border-slate-700 transition-colors duration-300">
          <input
            type="text"
            placeholder="Your Name"
            className="p-4 border dark:border-slate-600 rounded-lg dark:bg-slate-700 dark:text-white focus:ring-2 focus:ring-emerald-500 transition-colors duration-300"
          />

          <input
            type="email"
            placeholder="Your Email"
            className="p-4 border dark:border-slate-600 rounded-lg dark:bg-slate-700 dark:text-white focus:ring-2 focus:ring-emerald-500 transition-colors duration-300"
          />

          <textarea
            placeholder="Your Message"
            rows="4"
            className="p-4 border dark:border-slate-600 rounded-lg dark:bg-slate-700 dark:text-white focus:ring-2 focus:ring-emerald-500 transition-colors duration-300"
          ></textarea>

          <button
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-xl shadow-lg transition"
            type="submit"
          >
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
}
