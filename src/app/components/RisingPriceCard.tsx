import Link from "next/link";
import { IProduct } from "../types/product";


interface Irising {
    product: IProduct;
}
export const toBanglaNumber = (value: number | string) => {
    return value
        .toString()
        .replace(/\d/g, (digit) => "০১২৩৪৫৬৭৮৯"[Number(digit)]);
};
const RisingPriceCard = ({ product }: Irising) => {

    return (
        <Link href={`/product/${product.slug}`}>
            <div className="card w-full cursor-pointer rounded-2xl border border-base-300 bg-base-100 p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-md">

                {/* Product info */}
                <div className="flex items-center gap-3">
                    <div className="shrink-0">
                        <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-base-200 text-xl sm:h-12 sm:w-12 sm:text-2xl">
                            {product.image}
                        </span>
                    </div>

                    <div className="min-w-0">
                        <h1 className="truncate text-sm font-semibold sm:text-base">
                            {product.nameBn}
                        </h1>

                        <p className="text-xs text-gray-500 sm:text-sm">
                            প্রতি {product.unit}
                        </p>
                    </div>
                </div>

                {/* Price row */}
                <div className="mt-4 flex flex-wrap items-center justify-between gap-2">
                    <div>
                        <p className="text-xs text-gray-500 sm:text-sm">
                            আজকের দাম
                        </p>

                        <p className="text-base font-bold sm:text-lg">
                            {toBanglaNumber(product.today)} টাকা
                        </p>
                    </div>

                    {/* Change badge */}
                    <span className="rounded-lg bg-green-100 px-2 py-1 text-xs font-medium text-green-600 sm:text-sm">
                        ▲ {toBanglaNumber(product.change.pct)}%
                    </span>
                </div>

            </div>
        </Link>
    );
};

export default RisingPriceCard;