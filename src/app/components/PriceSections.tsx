import { IProduct } from "../types/product";
import FallingPriceCard from "./FallingPriceCard";
import ProductsCard from "./ProductsCard";
import RisingPriceCard from "./RisingPriceCard";



const PriceSections = async () => {
    const res = await fetch(
        "https://api.abcz.workers.dev/api/bazardor/products",
        {
            next: {
                revalidate: 3600,
            },
        }
    );

    if (!res.ok) {
        throw new Error("Failed to fetch products");
    }

    const data: IProduct[] = await res.json();

    const risers = data
        .filter((product) => product.change.dir === "up")
        .sort((a, b) => b.change.pct - a.change.pct)
        .slice(0, 6);

    const falling = data
        .filter((product) => product.change.dir === "down")
        .sort((a, b) => b.change.pct - a.change.pct)
        .slice(0, 6);

    return (
        <div className="mt-20">

            {/* Rising Products */}
            <div>
                <h2 className="mb-4 text-xl font-bold sm:text-2xl">
                    <span className="text-green-500">▲</span> আজ দাম বেড়েছে
                </h2>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {risers.map((product) => (
                        <RisingPriceCard
                            key={product.id}
                            product={product}
                        />
                    ))}
                </div>
            </div>

            {/* Falling Products */}
            <div className="mt-10">
                <h2 className="mb-4 text-xl font-bold sm:text-2xl">
                    <span className="text-red-500">▼</span> আজ দাম কমেছে
                </h2>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {falling.map((product) => (
                        <FallingPriceCard
                            key={product.id}
                            product={product}
                        />
                    ))}
                </div>
            </div>

            {/* All Products */}
            <section id="সব-পণ্য" className="mt-12">
                <h2 className="mb-2 text-xl font-bold sm:text-2xl">
                    সব পণ্য
                </h2>

                <p className="mb-5 text-sm text-gray-500 sm:text-base">
                    আজকের বাজারের সকল পণ্যের দাম এক নজরে দেখুন।
                </p>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {data.map((product) => (
                        <ProductsCard
                            key={product.id}
                            product={product}
                        />
                    ))}
                </div>
            </section>

        </div>
    );
};

export default PriceSections;