
import { IProduct } from '../types/product';

const ProductCard = ({product}:{product:IProduct}) => {
    return (
        <div className="card flex flex-col justify-between gap-5 rounded-2xl border border-base-300 p-4 sm:p-6 lg:flex-row">

            {/* Product Info */}
            <div className="flex items-center gap-4">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-base-200 text-3xl sm:h-20 sm:w-20 sm:text-4xl">
                    {product?.image}
                </div>

                <div className="grid gap-2">
                    <h2 className="text-lg font-bold sm:text-xl">
                        {product?.nameBn}
                    </h2>

                    <p className="text-sm text-gray-500">
                        প্রতি {product?.unit} · {product?.categoryNameBn}
                    </p>

                    <p className="text-sm">
                        গতকালের তুলনায় আজ দাম{" "}
                        {product?.change?.dir === "up"
                            ? "বেড়েছে"
                            : product?.change?.dir === "down"
                                ? "কমেছে"
                                : "অপরিবর্তিত"}{" "}
                        · {product?.today} টাকা
                    </p>
                </div>
            </div>

            {/* Today's Price */}
            <div className="card min-w-44 gap-2 rounded-2xl bg-base-200 p-4 sm:p-5">
                <p className="text-sm text-gray-500">
                    আজকের দাম
                </p>

                <p className="text-2xl font-bold">
                    {product?.today} টাকা
                </p>

                <span
                    className={`text - sm font - semibold ${product?.change?.dir === "up"
                            ? "text-green-600"
                            : product?.change?.dir === "down"
                                ? "text-red-600"
                                : "text-gray-500"
                        } `}
                >
                    {product?.change?.dir === "up"
                        ? "▲"
                        : product?.change?.dir === "down"
                            ? "▼"
                            : "—"}{" "}
                    {product?.change?.pct}%
                </span>
            </div>

        </div>
    );
};

export default ProductCard;