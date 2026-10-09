import { IProduct } from "@/app/types/product";
export const instant = false;

const ProductDetailsPage = async ({ params }:{params: { slug: string }}) => {
    const { slug } = await  params;    
    const res = await fetch(`https://api.abcz.workers.dev/api/bazardor/products`, {
        next: {
            revalidate: 3600,
        }
    });
    if(!res.ok){
        throw new Error("Failed to fetch product details");
    }
    console.log(res);
    const products:IProduct[] = await res.json();
    const product = products.find((product) => product.slug === slug)
   console.log(product);

    return (
        <div className="card">
            Product Details
            {product?.nameBn}
            {product?.image}
            
        </div>
    );
};

export default ProductDetailsPage;