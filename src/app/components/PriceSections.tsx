
import { IProduct } from "../types/product";
import FallingPriceCard from "./FallingPriceCard";
import RisingPriceCard from "./RisingPriceCard";

 export const toBanglaNumber = (value: number | string) => {
    return value
        .toString()
        .replace(/\d/g, (digit) => "০১২৩৪৫৬৭৮৯"[Number(digit)]);
};
const PriceSections = async () => {
    const res = await fetch("https://api.api-store.workers.dev/api/bazardor/products", {
        next: {
            revalidate: 3600,
        },
    })
    if (!res.ok) {
        throw new Error("Failed to fetch products");
    }
    const data: IProduct[] = await res.json();
    const risers = data.filter((product) => product.change.dir === 'up').sort((a, b) => b.change.pct - a.change.pct).slice(0, 6)
    const falling = data.filter(product => product.change.dir === 'down').sort((a,b) => b.change.pct - a.change.pct).slice(0,6)

    return (
        <div className="mt-20">
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
            <div className="mt-10">

           <h2 className="mb-4 text-xl font-bold sm:text-2xl">
                <span className="text-red-500">▼</span> আজ দাম কমেছে
            </h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {falling.map((product) => <FallingPriceCard key={product.id} product={product}></FallingPriceCard>)}
            </div>
            </div>
        </div>
    );
};

export default PriceSections;