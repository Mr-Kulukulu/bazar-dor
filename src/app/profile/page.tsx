'use client'

import { useSession } from "@/lib/auth-client";

const ProfilePage = () => {
     const { data: session } = useSession();

    return (
        <div>
            <h2>Profile page</h2>
            <h1>{session?.user.name}</h1>
            
        </div>
    );
};

export default ProfilePage;