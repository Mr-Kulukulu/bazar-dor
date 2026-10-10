'use client'

import { signOut, useSession } from '@/lib/auth-client';
import { Button } from '@heroui/react';
import Image from 'next/image';
import Link from 'next/link';


const HeaderButtons = () => {
    const { data: session, isPending } = useSession();
    const profileImage = session?.user?.image;

    return (
        <div className="relative">
            {isPending ? <span className="loading loading-spinner text-success"></span> : session?.user ? (
                <div className="dropdown dropdown-end">
                    <button
                        tabIndex={0}
                        className="btn btn-ghost flex items-center gap-2"
                    >


                        <span className="flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-full bg-green-600 text-white">
                            {session?.user?.image ? (
                                <Image
                                    width={32}
                                    height={32}
                                    src={profileImage || "/default-avatar.png"}
                                    alt={session?.user?.name || "User"}
                                  
                                    className="h-full w-full rounded-full object-cover"
                                />
                            ) : (
                                <span>👤</span>
                            )}
                        </span>

                        <span className="max-w-32 truncate">
                            {session?.user.name || "ব্যবহারকারী"}
                        </span>

                        <span className="text-xs">▼</span>
                    </button>

                    <ul
                        tabIndex={0}
                        className="dropdown-content menu z-50 mt-2 w-52 rounded-xl border border-base-300 bg-base-100 p-2 shadow-lg"

                    ><div className="min-w-0">
                            <h1 className="truncate text-sm font-semibold text-base-content">
                                {session?.user?.name || "ব্যবহারকারী"}
                            </h1>

                            <p className="truncate text-xs text-base-content/60">
                                {session?.user?.email || ""}
                            </p>
                        </div>

                        <li>
                            <Link href="/profile">
                                👤 আমার প্রোফাইল
                            </Link>
                        </li>

                        <li>
                            <button
                                onClick={async () => {
                                    await signOut();
                                }}
                                className="text-red-500"
                            >
                                ↩ সাইন আউট
                            </button>
                        </li>
                    </ul>
                </div>
            ) : (
                <div className="flex items-center gap-2">
                    <Link href="/sign-in">
                        <button className="btn btn-ghost">
                            সাইন ইন
                        </button>
                    </Link>

                    <Link href="/sign-up">
                        <Button className="btn-ghost bg-green-600 text-white">
                            সাইন আপ
                        </Button>
                    </Link>
                </div>
            )}
        </div>
    );
};

export default HeaderButtons;