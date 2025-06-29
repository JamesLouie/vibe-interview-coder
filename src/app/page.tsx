import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-100 flex flex-col">
      {/* Hero Section */}
      <section className="flex-1 flex flex-col justify-center items-center text-center px-4 py-20">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-6 leading-tight">
            Ace Your Next <span className="text-blue-600">Technical Interview</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 mb-8">
            The all-in-one platform for mastering coding interviews. Practice real-world problems, get instant AI-powered feedback, and build the confidence to land your dream job.
          </p>
          <Link
            href="/interview"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-4 rounded-xl text-lg shadow-lg transition-all duration-200"
          >
            Start Practicing Now
          </Link>
        </div>
      </section>

      {/* Value Propositions */}
      <section className="py-16 bg-white border-t border-b border-gray-100">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 px-4">
          <div className="flex flex-col items-center text-center">
            <div className="bg-blue-100 text-blue-600 rounded-full p-4 mb-4">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </div>
            <h3 className="text-xl font-bold mb-2">Save Time</h3>
            <p className="text-gray-600">Stop searching for questions. Get curated, high-quality problems and instant feedback in one place.</p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="bg-green-100 text-green-600 rounded-full p-4 mb-4">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
            </div>
            <h3 className="text-xl font-bold mb-2">AI-Powered Feedback</h3>
            <p className="text-gray-600">Get actionable insights on your code, including time complexity, edge cases, and improvement tips—instantly.</p>
          </div>
          <div className="flex flex-col items-center text-center">
            <div className="bg-indigo-100 text-indigo-600 rounded-full p-4 mb-4">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 17v-2a4 4 0 014-4h3m4 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </div>
            <h3 className="text-xl font-bold mb-2">Boost Confidence</h3>
            <p className="text-gray-600">Practice in a real interview environment and track your progress to walk into your next interview with confidence.</p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-br from-indigo-50 to-blue-100">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12">Why Choose Interview Prep?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            <div className="bg-white rounded-2xl shadow-md p-8 flex flex-col items-center text-center">
              <div className="bg-blue-50 text-blue-600 rounded-full p-3 mb-4">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 01-8 0m8 0a4 4 0 00-8 0m8 0V5a4 4 0 00-8 0v2m8 0a4 4 0 01-8 0" /></svg>
              </div>
              <h4 className="font-semibold text-lg mb-2">Real-World Coding Problems</h4>
              <p className="text-gray-600">Practice with questions asked by top tech companies, updated regularly.</p>
            </div>
            <div className="bg-white rounded-2xl shadow-md p-8 flex flex-col items-center text-center">
              <div className="bg-green-50 text-green-600 rounded-full p-3 mb-4">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2l4-4" /></svg>
              </div>
              <h4 className="font-semibold text-lg mb-2">Instant Code Execution</h4>
              <p className="text-gray-600">Write, run, and debug your code in the browser—no setup required.</p>
            </div>
            <div className="bg-white rounded-2xl shadow-md p-8 flex flex-col items-center text-center">
              <div className="bg-indigo-50 text-indigo-600 rounded-full p-3 mb-4">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3" /></svg>
              </div>
              <h4 className="font-semibold text-lg mb-2">Personalized AI Feedback</h4>
              <p className="text-gray-600">Get detailed feedback on your solutions, including complexity analysis and improvement suggestions.</p>
            </div>
            <div className="bg-white rounded-2xl shadow-md p-8 flex flex-col items-center text-center">
              <div className="bg-yellow-50 text-yellow-600 rounded-full p-3 mb-4">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01" /></svg>
              </div>
              <h4 className="font-semibold text-lg mb-2">Progress Tracking</h4>
              <p className="text-gray-600">Monitor your improvement over time and identify areas to focus on.</p>
            </div>
            <div className="bg-white rounded-2xl shadow-md p-8 flex flex-col items-center text-center">
              <div className="bg-pink-50 text-pink-600 rounded-full p-3 mb-4">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87M16 3.13a4 4 0 010 7.75M8 3.13a4 4 0 000 7.75" /></svg>
              </div>
              <h4 className="font-semibold text-lg mb-2">Community & Support</h4>
              <p className="text-gray-600">Join a community of learners and get help when you need it.</p>
            </div>
            <div className="bg-white rounded-2xl shadow-md p-8 flex flex-col items-center text-center">
              <div className="bg-gray-50 text-gray-600 rounded-full p-3 mb-4">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
              <h4 className="font-semibold text-lg mb-2">No More Guesswork</h4>
              <p className="text-gray-600">Know exactly what to improve with actionable, AI-driven insights.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-white border-t border-gray-100">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to get started?</h2>
          <p className="text-lg text-gray-700 mb-8">Join thousands of candidates who have leveled up their interview skills. Practice smarter, not harder.</p>
          <Link
            href="/interview"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-4 rounded-xl text-lg shadow-lg transition-all duration-200"
          >
            Start Interview Prep Now
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center text-gray-400 text-sm">
        &copy; {new Date().getFullYear()} Interview Prep. All rights reserved.
      </footer>
    </main>
  );
}
