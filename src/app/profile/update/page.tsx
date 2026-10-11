
'use client';

import { useState, type FormEvent } from 'react';
import { updateUser, useSession } from '@/lib/auth-client';
import {
    Button,
    FieldError,
    FieldGroup,
    Fieldset,
    Form,
    Input,
    Label,
    TextField,
} from '@heroui/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { toast } from 'react-toastify';

const UpdateProfilePage = () => {
    const { data: session, isPending } = useSession();
    const router = useRouter();

    const [isUpdating, setIsUpdating] = useState(false);

    const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const name = formData.get('name')?.toString().trim();

        if (!name || name.length < 3) {
            toast.error('নাম কমপক্ষে ৩ অক্ষরের হতে হবে।');
            return;
        }

        if (name === session?.user?.name) {
            toast.error('আপনার নাম পরিবর্তন করা হয়নি।');
            return;
        }

        setIsUpdating(true);

        try {
            const result = await updateUser({ name });

            if (result.error) {
                toast.error(
                    result.error.message || 'নাম আপডেট করা যায়নি।',
                );
                return;
            }

            toast.success('প্রোফাইল সফলভাবে আপডেট হয়েছে!');

            router.push('/profile');
            router.refresh();
        } catch {
            toast.error('আপডেট করার সময় সমস্যা হয়েছে। আবার চেষ্টা করুন।');
        } finally {
            setIsUpdating(false);
        }
    };

    if (isPending) {
        return (
            <div className="flex min-h-[50vh] items-center justify-center">
                <span className="loading loading-spinner loading-lg text-success" />
            </div>
        );
    }

    if (!session?.user) {
        return (
            <main className="mx-auto max-w-lg px-4 py-16 text-center">
                <h1 className="text-2xl font-bold">
                    প্রথমে সাইন ইন করুন
                </h1>

                <Link
                    href="/sign-in"
                    className="mt-5 inline-flex rounded-xl bg-green-600 px-5 py-3 font-semibold text-white hover:bg-green-700"
                >
                    সাইন ইন করুন →
                </Link>
            </main>
        );
    }

    return (
        <main className="mx-auto min-h-screen w-full max-w-2xl px-4 py-8 sm:px-6 sm:py-12">
            <section className="rounded-2xl border border-base-300 bg-base-100 p-5 shadow-sm sm:p-8">
                <Link
                    href="/profile"
                    className="text-sm font-medium text-green-600 hover:text-green-700"
                >
                    ← আমার প্রোফাইলে ফিরে যান
                </Link>

                <h1 className="mt-5 text-2xl font-bold sm:text-3xl">
                    Update Information
                </h1>

                <p className="mt-2 text-sm text-base-content/60">
                    আপনার নাম পরিবর্তন করতে নিচের ফর্মটি পূরণ করুন।
                </p>

                <Form className="mt-6 w-full" onSubmit={onSubmit}>
                    <Fieldset className="w-full">
                        <FieldGroup>
                            <TextField
                                isRequired
                                name="name"
                                defaultValue={session.user.name || ''}
                                validate={(value) => {
                                    if (value.trim().length < 3) {
                                        return 'নাম কমপক্ষে ৩ অক্ষরের হতে হবে।';
                                    }

                                    return null;
                                }}
                            >
                                <Label>আপনার নাম</Label>

                                <Input
                                    placeholder="আপনার নাম লিখুন"
                                    className="w-full"
                                />

                                <FieldError />
                            </TextField>
                        </FieldGroup>

                        <Fieldset.Actions className="mt-5 flex w-full flex-col gap-3 sm:flex-row">
                            <Button
                                type="submit"
                                isDisabled={isUpdating}
                                className="w-full bg-green-600 font-semibold text-white hover:bg-green-700"
                            >
                                {isUpdating
                                    ? 'আপডেট হচ্ছে...'
                                    : 'Update Information'}
                            </Button>

                            <Button
                                type="button"
                                onPress={() => router.push('/profile')}
                                className="w-full bg-base-200 font-semibold text-base-content"
                            >
                                বাতিল
                            </Button>
                        </Fieldset.Actions>
                    </Fieldset>
                </Form>
            </section>
        </main>
    );
};

export default UpdateProfilePage;
