import Image from "next/image";
import Navbar from "./Navbar";

import HeaderButtons from "./HeaderButtons";
import Link from "next/link";

const date = new Date()
export const banglaDate = date.toLocaleDateString("bn-BD", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
});
const Header = () => {
   
    return (
        <div className="w-full max-w-7xl mx-auto">
            <div className="flex items-center justify-between gap-3 py-3 sm:py-4">

                {/* Logo + Date */}
                <div className="flex min-w-0 items-center gap-2 sm:gap-3">
                    <div className="shrink-0">
                        <Link href={'/'}>
                       
                        <Image
                            className="h-9 w-9 rounded-xl bg-[#05893E] sm:h-11 sm:w-11"
                            src="/icon.png"
                            width={44}
                            height={44}
                            alt="বাজার দর logo"
                        />
                         </Link>
                    </div>

                    <div className="min-w-0">
                        <h1 className="truncate text-lg font-bold sm:text-2xl">
                            বাজার দর
                        </h1>

                        <p className="text-xs text-gray-500 sm:text-sm">
                            {banglaDate}
                        </p>
                    </div>
                </div>

                {/* Dropdown */}
                <div className="flex items-center gap-2">

                    
                  <HeaderButtons></HeaderButtons>

                </div>
            </div>

            {/* Navigation */}
            <div className="w-full overflow-x-auto">
                <Navbar />
            </div>
        </div>
    );
};

export default Header;