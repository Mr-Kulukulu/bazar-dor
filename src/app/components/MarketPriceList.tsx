import { IProduct } from "../types/product";

const MarketPriceList = ({ productMarkets }: { productMarkets: IProduct["markets"] }) => {

    return (

        <div className="card rounded-2xl border border-base-300 bg-base-100 shadow-sm">
            <div className="overflow-x-auto rounded-2xl">
                <table className="table table-zebra w-full">
                    <thead>
                        <tr className="bg-base-200 text-base">
                            <th className="p-4">বাজারের নাম</th>
                            <th className="p-4">বিভাগ</th>
                            <th className="p-4 text-right">সর্বনিম্ন দাম</th>
                            <th className="p-4 text-right">সর্বোচ্চ দাম</th>
                            <th className="p-4 text-right">গড় দাম</th>
                        </tr>
                    </thead>

                    <tbody>
                        {productMarkets.map((market, index) => (
                            <tr key={`${market.market}-${market.division}-${index}`}>
                                <td className="p-4 font-medium whitespace-nowrap">
                                    {market.market}
                                </td>

                                <td className="p-4 whitespace-nowrap">
                                    {market.division}
                                </td>

                                <td className="p-4 text-right font-semibold text-green-600 whitespace-nowrap">
                                    {market.min} টাকা
                                </td>

                                <td className="p-4 text-right font-semibold text-red-600 whitespace-nowrap">
                                    {market.max} টাকা
                                </td>

                                <td className="p-4 text-right font-medium whitespace-nowrap">
                                    {((market.min + market.max) / 2).toFixed(2)} টাকা
                                </td>
                            </tr>
                        ))}

                        {productMarkets.length === 0 && (
                            <tr>
                                <td colSpan={5} className="p-8 text-center text-base-content/60">
                                    কোনো বাজারের তথ্য পাওয়া যায়নি।
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>


    );
};

export default MarketPriceList;