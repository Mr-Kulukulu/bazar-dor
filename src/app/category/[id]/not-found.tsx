
import Link from "next/link";

const CategoryNotFound = () => {
    return (
        <div className="flex min-h-[50vh] flex-col items-center justify-center px-4 text-center">
            <div className="mb-4 text-6xl">🛒</div>

            <h1 className="text-2xl font-bold sm:text-3xl">
                ক্যাটাগরি পাওয়া যায়নি
            </h1>

            <p className="mt-3 max-w-md text-sm text-gray-500 sm:text-base">
                দুঃখিত, এই ক্যাটাগরিতে কোনো পণ্য পাওয়া যায়নি।
                অন্য ক্যাটাগরি অথবা সব পণ্য দেখুন।
            </p>

            <Link
                href="/"
                className="mt-6 rounded-xl bg-[#05893E] px-5 py-3 font-medium text-white transition hover:bg-[#047532]"
            >
                হোম পেজে ফিরে যান
            </Link>
        </div>
    );
};

export default CategoryNotFound;

