import Image from "next/image";
import Navbar from "./Navbar";

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
                        <Image
                            className="h-9 w-9 rounded-xl bg-[#05893E] sm:h-11 sm:w-11"
                            src="/logo-icon.png"
                            width={44}
                            height={44}
                            alt="বাজার দর logo"
                        />
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
                <div className="dropdown dropdown-end shrink-0">
                    <div
                        tabIndex={0}
                        role="button"
                        className="btn btn-sm sm:btn-md"
                    >   {/** username ashbe UseSession theke */}
                        userName
                    </div>

                    <ul
                        tabIndex={-1}
                        className="dropdown-content menu z-1 mt-2 w-44 rounded-box bg-base-100 p-2 shadow-lg sm:w-52"
                    >
                        <li>
                            <a>Profile</a>
                        </li>
                        <li>
                            <a>SignOut</a>
                        </li>
                    </ul>
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