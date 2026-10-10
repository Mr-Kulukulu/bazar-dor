'use client'
import Link from 'next/link';
import { FaArrowLeft, FaHouse } from 'react-icons/fa6';

export default function NotFound() {
    return (
        <main className="flex min-h-[75vh] items-center justify-center px-4 py-16">
            <div className="w-full max-w-lg text-center">
                <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-3xl bg-green-500/10 text-green-600">
                    <FaHouse className="text-4xl" />
                </div>

                <p className="mt-8 text-sm font-bold uppercase tracking-[0.3em] text-green-600">
                    BazarDor
                </p>

                <h1 className="mt-4 text-8xl font-black tracking-tight text-green-600 sm:text-9xl">
                    404
                </h1>

                <h2 className="mt-4 text-2xl font-bold sm:text-3xl">
                    পেজটি খুঁজে পাওয়া যায়নি!
                </h2>

                <p className="mx-auto mt-4 max-w-md leading-7 text-base-content/60">
                    দুঃখিত! আপনি যে পেজটি খুঁজছেন সেটি সরানো হয়েছে,
                    নাম পরিবর্তন করা হয়েছে অথবা ঠিকানাটি ভুল।
                </p>

                <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                    <Link
                        href="/"
                        className="inline-flex items-center justify-center gap-2 rounded-xl bg-green-600 px-6 py-3 font-semibold text-white transition hover:bg-green-700"
                    >
                        <FaHouse />
                        হোম পেজে ফিরে যান
                    </Link>

                    <button
                        type="button"
                        onClick={() => window.history.back()}
                        className="inline-flex items-center justify-center gap-2 rounded-xl border border-base-300 px-6 py-3 font-semibold transition hover:bg-base-200"
                    >
                        <FaArrowLeft />
                        আগের পেজে ফিরুন
                    </button>
                </div>
            </div>
        </main>
    );
}
