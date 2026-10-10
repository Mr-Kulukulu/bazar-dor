
import { FaBasketShopping } from 'react-icons/fa6';

export default function Loading() {
    return (
        <main className="flex min-h-[70vh] items-center justify-center px-4">
            <div className="flex flex-col items-center text-center">
                {/* Animated Logo */}
                <div className="relative flex h-20 w-20 items-center justify-center">
                    <div className="absolute inset-0 animate-ping rounded-3xl bg-green-500/20" />

                    <div className="relative flex h-20 w-20 animate-pulse items-center justify-center rounded-3xl bg-green-600 text-white shadow-lg shadow-green-600/20">
                        <FaBasketShopping className="text-4xl" />
                    </div>
                </div>

                {/* Brand */}
                <h1 className="mt-6 text-2xl font-extrabold tracking-tight">
                    Bazar<span className="text-green-600">Dor</span>
                </h1>

                <p className="mt-2 text-sm text-base-content/60">
                    বাজার দর লোড হচ্ছে...
                </p>

                {/* Loading Bar */}
                <div className="mt-6 h-1.5 w-48 overflow-hidden rounded-full bg-base-300">
                    <div className="h-full w-1/2 animate-[loading_1.2s_ease-in-out_infinite] rounded-full bg-green-600" />
                </div>

                <p className="mt-4 text-xs text-base-content/40">
                    অনুগ্রহ করে অপেক্ষা করুন
                </p>
            </div>

            <style jsx>{`
                @keyframes loading {
                    0% {
                        transform: translateX(-100%);
                    }
                    100% {
                        transform: translateX(200%);
                    }
                }
            `}</style>
        </main>
    );
}
