import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">Interview Prep</h1>
        <p className="text-gray-600 mb-8">Practice coding problems and prepare for technical interviews</p>
        <Link 
          href="/leetcode" 
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors text-lg font-medium"
        >
          Start LeetCode Practice
        </Link>
      </div>
    </main>
  );
}
