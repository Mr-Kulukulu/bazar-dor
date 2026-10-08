import Image from "next/image";
import { banglaDate } from "./Header";
import Link from "next/link";


const Hero = () => {
    const date = banglaDate
    return (
        
            <section className="my-6 rounded-2xl bg-base-200 p-6 sm:p-8 lg:p-10">
  <div className="flex flex-col items-center gap-8 lg:flex-row lg:justify-between">

    {/* Left Content */}
    <div className="w-full lg:w-1/2">
      <span className="text-sm font-medium text-[#05893E] sm:text-base">
        {date}
      </span>

      <h1 className="mt-2 text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
        আজকের বাজারের দাম এক নজরে
      </h1>

      <p className="mt-4 text-sm leading-7 text-gray-500 sm:text-base">
        চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক
        বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
      </p>

      <Link
        href={`/`}
        className="mt-6 inline-block rounded-xl bg-[#05893E] px-5 py-3 font-medium text-white transition hover:bg-[#047532]"
      >
        সব পণ্য দেখুন
      </Link>
    </div>

    {/* Right Image */}
    <div className="flex w-full justify-center lg:w-1/2 lg:justify-end">
      <Image
        alt="বাজার দর"
        src="/bazar-hero.png"
        width={500}
        height={400}
        className="h-auto w-full max-w-[320px] object-contain"
      />
    </div>

  </div>
</section>
        
    );
};

export default Hero;