import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import React from 'react';
interface Inavs {
    id: string
    slug: string
    nameBn: string
    icon: string
}
const Navbar = async () => {
    const res = await fetch("https://api.api-store.workers.dev/api/bazardor/categories",{next:{revalidate:3600}});
    if(!res.ok){
        notFound()
    }
    const data:Inavs[] = await res.json()
    return (
        <div className='flex gap-6 m-4 border-y border-gray-200 py-3'>
            {data.map( nav => <div key={nav.id}>
                <Link href={`/category/${nav.slug}`}>
                <ul>

                <li><span>{nav.icon}</span>{nav.nameBn}</li>
                </ul>
                </Link>
            </div>)}
        </div>
    );
};

export default Navbar;