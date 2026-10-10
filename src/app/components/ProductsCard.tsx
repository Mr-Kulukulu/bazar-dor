import Link from "next/link";
import { IProduct } from "../types/product";
import { toBanglaNumber } from "../utils/toBanglaNumber";


interface IProducts {
    product: IProduct;
}

const ProductsCard = ({ product }: IProducts) => {

    return (
        <Link href={`/product/${product.slug}`}>
            <div className="card w-full cursor-pointer rounded-2xl border border-base-300 bg-base-100 p-4 shadow-sm transition hover:-translate-y-1 hover:border-green-600 hover:shadow-md">

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

                {/* Price */}
                <div className="mt-4 flex flex-wrap items-center justify-between gap-2">
                    <div>
                        <p className="text-xs text-gray-500 sm:text-sm">
                            আজকের দাম
                        </p>

                        <p className="text-base font-bold sm:text-lg">
                            {toBanglaNumber(product.today)} টাকা
                        </p>
                    </div>

                    {/* Change */}
                    <span
                        className={`rounded-lg px-2 py-1 text-xs font-medium sm:text-sm ${product.change?.dir === "up"
                            ? "bg-green-100 text-green-600"
                            : product.change?.dir === "down"
                                ? "bg-red-100 text-red-600"
                                : "bg-gray-100 text-gray-500"
                            }`}
                    >
                        {product.change?.dir === "up"
                            ? "▲ "
                            : product.change?.dir === "down"
                                ? "▼ "
                                : "— "}

                        {toBanglaNumber(product.change?.pct ?? 0)}%
                    </span>
                </div>

            </div>
        </Link>
    );
};

export default ProductsCard;