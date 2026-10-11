
'use client'

import { useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

export default function UnauthorizedToast() {
    const searchParams = useSearchParams()
    const router = useRouter()

    useEffect(() => {
        if (searchParams.get('error') === 'unauthorized') {
            toast.error('Please sign in to access this page')

            router.replace('/sign-in')
        }
    }, [searchParams, router])

    return null
}