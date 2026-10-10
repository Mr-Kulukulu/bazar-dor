
import Link from 'next/link';
import { Suspense } from 'react';

interface Inavs {
    id: string;
    slug: string;
    nameBn: string;
    icon: string;
}

const NavbarContent = async () => {
    const res = await fetch(
        'https://api.api-store.workers.dev/api/bazardor/categories',
        { next: { revalidate: 3600 } }
    );

    if (!res.ok) {
        return null;
    }

    const data: Inavs[] = await res.json();

    return (
        <div className="flex gap-6 m-4 border-y border-gray-200 py-3 overflow-x-auto">
            {data.map((nav) => (
                <div key={nav.id} className="shrink-0">
                    <Link href={`/category/${nav.slug}`}>
                        <ul>
                            <li>
                                <span>{nav.icon}</span> {nav.nameBn}
                            </li>
                        </ul>
                    </Link>
                </div>
            ))}
        </div>
    );
};

const Navbar = () => {
    return (
        <Suspense fallback={<div className="h-12" />}>
            <NavbarContent />
        </Suspense>
    );
};

export default Navbar;
