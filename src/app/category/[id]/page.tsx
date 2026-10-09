import CategoryProducts from "@/app/components/CategoryProducts";
import { IProduct } from "@/app/types/product";
import { toBanglaNumber } from "@/app/utils/toBanglaNumber";
import { notFound } from "next/navigation";

export const instant = false;

const CateGoryPage = async ({
    params,
}: {
    params: Promise<{ id: string }>;
}) => {
    const { id } = await params;

    const res = await fetch(
        `https://api.abcz.workers.dev/api/bazardor/products?category=${encodeURIComponent(id)}`,
        {
            next: {
                revalidate: 3600,
            },
        }
    );

    if (!res.ok) {
        throw new Error("Failed to fetch category products");
    }

    const products: IProduct[] = await res.json();
    const productName = products[0];

    if (products.length === 0) {
        notFound();
    }

    return (
        <div className="space-y-6">
            <div className="card flex flex-row items-center gap-4 rounded-2xl border border-base-300 p-5">
                <div className="text-4xl">
                    {productName?.categoryIcon ?? productName?.image}
                </div>

                <div>
                    <h2 className="text-2xl font-bold">
                        {productName?.categoryNameBn}
                    </h2>

                    <p className="text-sm text-gray-500">
                        {toBanglaNumber(products.length)} টি পণ্যের
                        আজকের দাম ও পরিবর্তন
                    </p>
                </div>
            </div>

            <CategoryProducts products={products} />
        </div>
    );
};

export default CateGoryPage;