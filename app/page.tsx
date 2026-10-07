import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen grid place-items-center p-8 bg-gradient-to-br from-brand-50 to-white">
      <div className="text-center max-w-2xl">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-600 to-brand-400 text-white grid place-items-center font-bold text-xl mx-auto shadow-lg shadow-brand-200">
          TK
        </div>
        <h1 className="mt-6 text-4xl font-bold text-brand-900">ToolKit</h1>
        <p className="mt-3 text-gray-600">
          Kumpulan alat online dalam satu tempat
        </p>
        <div className="mt-8 flex gap-3 justify-center">
          <Link
            href="/tools"
            className="px-6 py-3 rounded-xl bg-brand-600 text-white font-semibold hover:bg-brand-700 transition"
          >
            Lihat Semua Alat
          </Link>
          <Link
            href="/login"
            className="px-6 py-3 rounded-xl border border-brand-200 text-brand-700 font-semibold hover:border-brand-400 transition"
          >
            Masuk
          </Link>
        </div>
      </div>
    </main>
  )
}
