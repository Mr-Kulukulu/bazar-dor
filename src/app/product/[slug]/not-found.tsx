
import Link from "next/link";
import { FaArrowLeft, FaBasketShopping, FaHouse } from "react-icons/fa6";

export default function ProductNotFound() {
    return (
        <main className="flex min-h-[70vh] items-center justify-center bg-base-100 px-4 py-12">
            <div className="w-full max-w-lg text-center">
                <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-green-200 text-green-600">
                    <FaBasketShopping className="text-4xl" />
                </div>

                <p className="mb-3 text-sm font-bold uppercase tracking-[0.3em] text-green-600">
                    BazarDor
                </p>

                <h1 className="mb-4 text-3xl font-extrabold sm:text-4xl">
                    Product Not Found!
                </h1>

                <p className="mx-auto mb-8 max-w-md leading-7 text-gray-500">
                    দুঃখিত! আপনি যে পণ্যটি খুঁজছেন সেটি পাওয়া যায়নি।
                    পণ্যটি সরানো হয়ে থাকতে পারে অথবা লিংকটি ভুল হতে পারে।
                </p>

                <div className="flex flex-wrap items-center justify-center gap-3">
                    <Link
                        href="/"
                        className="btn border-none bg-green-400 text-black hover:bg-green-600"
                    >
                        <FaHouse />
                        হোম পেজ
                    </Link>

                    <Link
                        href="/"
                        className="btn btn-outline"
                    >
                        <FaArrowLeft />
                        সব পণ্য দেখুন
                    </Link>
                </div>

                <p className="mt-10 text-xs text-gray-400">
                    © 2026 BazarDor — সঠিক দামে বাজার করুন।
                </p>
            </div>
        </main>
    );
}
