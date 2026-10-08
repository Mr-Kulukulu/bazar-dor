import MarqueeText from "react-marquee-text";
import { IProduct } from "../types/product";

const Marquee = async () => {
    const res = await fetch('https://api.api-store.workers.dev/api/bazardor/products', {
        next: {
            revalidate: 3600,
        },
    });
    const data: IProduct[] = await res.json()
    const toBanglaNumber = (value: number | string) => {
        return value
            .toString()
            .replace(/\d/g, (digit) => "০১২৩৪৫৬৭৮৯"[Number(digit)]);
    };
    return (
        <MarqueeText direction="right" duration={10}>
            <div className="flex items-center gap-6 whitespace-nowrap border-y border-gray-200 py-2">
                {data.map((product) => (
                    <div key={product.id} className="flex items-center gap-2 border-r border-gray-200">
                        <span className="text-lg">{product.image}</span>

                        <span className="font-medium">
                            {product.nameBn}
                        </span>

                        <span className="font-bold">
                            {toBanglaNumber(product.today)} টাকা/{product.unit}
                        </span>

                        <span
                            className={
                                product.change.dir === "up"
                                    ? "text-green-600"
                                    : product.change.dir === "down"
                                        ? "text-red-600"
                                        : "text-gray-500"
                            }
                        >
                            {product.change.dir === "up"
                                ? "▲"
                                : product.change.dir === "down"
                                    ? "▼"
                                    : "—"}{" "}
                            {toBanglaNumber(product.change.pct)}%
                        </span>
                    </div>
                ))}
            </div>
        </MarqueeText>
    );
};

export default Marquee;