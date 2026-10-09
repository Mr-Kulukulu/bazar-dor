import MarketPriceList from "@/app/components/MarketPriceList";
import ProductCard from "@/app/components/ProductCard";
import { IProduct } from "@/app/types/product";
import { notFound } from "next/navigation";
export const instant = false;

const ProductDetailsPage = async ({ params }: { params: { slug: string } }) => {
    const { slug } = await params;
    const res = await fetch(`https://api.abcz.workers.dev/api/bazardor/products`, {
        next: {
            revalidate: 3600,
        }
    });
    if (!res.ok) {
        throw new Error("Failed to fetch product details");
    }
    console.log(res);
    const products: IProduct[] = await res.json();
    const product = products.find((product) => product.slug === slug)
    console.log(product);
    if (!product) {
        notFound()
    }
    const minProduct = product.markets.map(product => product.min)
    const maxProduct = product.markets.map(product => product.max)
    const minProductPrice = Math.min(...minProduct)
    const maxProductPrice = Math.max(...maxProduct)
    const average = (maxProductPrice + minProductPrice) / 2
    const productMarkets = product.markets
    
    return (

        <div >
            <ProductCard product={product}></ProductCard>

            <div className="card mt-10 gap-4">
                <h2 className="text-xl font-bold">দামের সারসংক্ষেপ</h2>

                <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">

                    {/* Minimum Price */}
                    <div className="card rounded-2xl border border-base-300 bg-base-100 p-4 shadow-sm transition hover:-translate-y-1 hover:border-green-600 hover:shadow-md">
                        <p className="text-sm text-gray-500">সর্বনিম্ন দাম</p>
                        <span className="text-2xl font-bold text-green-600">
                            {minProductPrice} টাকা
                        </span>
                        <p className="text-sm text-gray-500">
                            সবচেয়ে কম দামের বাজার
                        </p>
                    </div>

                    {/* Maximum Price */}
                    <div className="card rounded-2xl border border-base-300 bg-base-100 p-4 shadow-sm transition hover:-translate-y-1 hover:border-red-600 hover:shadow-md">
                        <p className="text-sm text-gray-500">সর্বোচ্চ দাম</p>
                        <span className="text-2xl font-bold text-red-600">
                            {maxProductPrice} টাকা
                        </span>
                        <p className="text-sm text-gray-500">
                            সবচেয়ে বেশি দামের বাজার
                        </p>
                    </div>

                    {/* Average Price */}
                    <div className="card rounded-2xl border border-base-300 bg-base-100 p-4 shadow-sm transition hover:-translate-y-1 hover:border-blue-600 hover:shadow-md">
                        <p className="text-sm text-gray-500">গড় দাম</p>
                        <span className="text-2xl font-bold">
                            {average} টাকা
                        </span>
                        <p className="text-sm text-gray-500">
                            প্রতি {product.unit} হিসেবে
                        </p>
                    </div>

                </div>
            </div>
            <h1 className="text-xl font-bold mt-10 mb-3 ">বাজারভিত্তিক আজকের দাম</h1>
            
            <MarketPriceList productMarkets ={productMarkets}></MarketPriceList>
            
        </div>


    );
};

export default ProductDetailsPage;