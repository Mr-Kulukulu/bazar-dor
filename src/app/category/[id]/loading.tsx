
const CategoryLoading = () => {
    return (
        <div className="animate-pulse space-y-6">
            {/* Category Header Skeleton */}
            <div className="flex items-center gap-4 rounded-2xl border border-base-300 p-5">
                <div className="h-14 w-14 rounded-xl bg-base-300" />

                <div className="flex-1 space-y-3">
                    <div className="h-6 w-40 rounded bg-base-300" />
                    <div className="h-4 w-56 max-w-full rounded bg-base-300" />
                </div>
            </div>

            {/* Sorting Skeleton */}
            <div className="flex items-center justify-between gap-4">
                <div className="h-4 w-36 rounded bg-base-300" />
                <div className="h-10 w-48 max-w-1/2 rounded-lg bg-base-300" />
            </div>

            {/* Product Cards Skeleton */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {Array.from({ length: 8 }).map((_, index) => (
                    <div
                        key={index}
                        className="rounded-2xl border border-base-300 p-4"
                    >
                        <div className="flex items-center gap-3">
                            <div className="h-12 w-12 rounded-xl bg-base-300" />

                            <div className="flex-1 space-y-2">
                                <div className="h-4 w-3/4 rounded bg-base-300" />
                                <div className="h-3 w-1/2 rounded bg-base-300" />
                            </div>
                        </div>

                        <div className="mt-5 flex justify-between gap-3">
                            <div className="space-y-2">
                                <div className="h-3 w-16 rounded bg-base-300" />
                                <div className="h-5 w-24 rounded bg-base-300" />
                            </div>

                            <div className="h-7 w-16 rounded-lg bg-base-300" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CategoryLoading;

