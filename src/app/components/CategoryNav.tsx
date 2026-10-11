
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface Inavs {
    id: string;
    slug: string;
    nameBn: string;
    icon: string;
}

export default function CategoryNav({ data }: { data: Inavs[] }) {
    const pathname = usePathname();

    return (
        <div className="flex gap-6 m-4 border-y border-gray-200 py-3 overflow-x-auto">
            {data.map((nav) => {
                const isActive = pathname === `/category/${nav.slug}`;

                return (
                    <Link
                        key={nav.id}
                        href={`/category/${nav.slug}`}
                        className={`shrink-0 px-2 py-1 rounded-lg transition-colors ${
                            isActive
                                ? 'bg-green-600 text-white font-semibold'
                                : 'text-gray-600 hover:bg-gray-100 hover:text-white-600'
                        }`}
                    >
                        <span>{nav.icon}</span> {nav.nameBn}
                    </Link>
                );
            })}
        </div>
    );
}
