
"use client";

import { useState } from "react";
import { IProduct } from "@/app/types/product";
import ProductsCard from "./ProductsCard";

interface CategoryProductsProps {
    products: IProduct[];
}

const CategoryProducts = ({ products }: CategoryProductsProps) => {
    const [sort, setSort] = useState("default");

    const sortedProducts = [...products].sort((a, b) => {
        if (sort === "low-high") {
            return a.today - b.today;
        }

        if (sort === "high-low") {
            return b.today - a.today;
        }

        return 0;
    });

    return (
        <div>
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
                <p>
                    মোট {products.length} টি পণ্য দেখানো হচ্ছে
                </p>

                <select
                    className="select select-bordered w-auto rounded-2xl grid text-center hover:border-green-600"
                    value={sort}
                    onChange={(e) => setSort(e.target.value)}
                    aria-label="পণ্যের দাম অনুযায়ী সাজান"
                >
                    <option value="default">ডিফল্ট</option>
                    <option value="low-high">দাম: কম থেকে বেশি</option>
                    <option value="high-low">দাম: বেশি থেকে কম</option>
                </select>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {sortedProducts.map((product) => (
                    <ProductsCard
                        key={product.id}
                        product={product}
                    />
                ))}
            </div>
        </div>
    );
};

export default CategoryProducts;

