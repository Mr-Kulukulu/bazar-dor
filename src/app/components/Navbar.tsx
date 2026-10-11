
import { Suspense } from 'react';
import CategoryNav from './CategoryNav';

interface Inavs {
    id: string;
    slug: string;
    nameBn: string;
    icon: string;
}

const NavbarContent = async () => {
    const res = await fetch(
        'https://openapi.programming-hero.com/api/bazardor/categories',
        { next: { revalidate: 3600 } }
    );

    if (!res.ok) return null;

    const data: Inavs[] = await res.json();

    return <CategoryNav data={data} />;
};

const Navbar = () => {
    return (
        <Suspense fallback={<div className="h-12" />}>
            <NavbarContent />
        </Suspense>
    );
};

export default Navbar;
