
'use client';

import { useState, type FormEvent } from 'react';
import { signOut, updateUser, useSession } from '@/lib/auth-client';
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
import Image from 'next/image';
import Link from 'next/link';

const ProfilePage = () => {
    const { data: session, isPending } = useSession();

    const [isUpdating, setIsUpdating] = useState(false);
    const [message, setMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const profileImage = session?.user?.image;

    const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setMessage('');
        setErrorMessage('');
        setIsUpdating(true);

        try {
            const formData = new FormData(e.currentTarget);
            const name = formData.get('name')?.toString().trim();

            if (!name || name.length < 3) {
                setErrorMessage('নাম কমপক্ষে ৩ অক্ষরের হতে হবে।');
                return;
            }

            const result = await updateUser({ name });

            if (result.error) {
                setErrorMessage(
                    result.error.message || 'নাম আপডেট করা যায়নি।'
                );
                return;
            }

            setMessage('প্রোফাইল সফলভাবে আপডেট হয়েছে!');
        } catch {
            setErrorMessage(
                'আপডেট করার সময় সমস্যা হয়েছে। আবার চেষ্টা করো।'
            );
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

    return (
        <main className="mx-auto min-h-screen w-full max-w-5xl px-4 py-8 sm:px-6 sm:py-12">
            <header className="mb-8">
                <h1 className="text-2xl font-bold sm:text-3xl">
                    আমার প্রোফাইল
                </h1>
                <p className="mt-2 text-sm text-base-content/60 sm:text-base">
                    আপনার অ্যাকাউন্টের তথ্য দেখুন এবং আপডেট করুন।
                </p>
            </header>

            {session?.user ? (
                <>
                    <section className="flex flex-col gap-5 rounded-2xl border border-base-300 bg-base-100 p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between sm:p-6">
                        <div className="flex min-w-0 items-center gap-4">
                            <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-green-600 text-2xl text-white">
                                {profileImage ? (
                                    <Image
                                        src={profileImage}
                                        alt={session.user.name || 'User'}
                                        width={64}
                                        height={64}
                                        className="h-full w-full object-cover"
                                    />
                                ) : (
                                    session.user.name
                                        ?.charAt(0)
                                        ?.toUpperCase() || '👤'
                                )}
                            </div>

                            <div className="min-w-0">
                                <h2 className="truncate text-lg font-semibold sm:text-xl">
                                    {session.user.name || 'ব্যবহারকারী'}
                                </h2>

                                <p className="break-all text-sm text-base-content/60">
                                    {session.user.email}
                                </p>

                                <span className="mt-2 inline-block rounded-full bg-green-500/10 px-3 py-1 text-xs font-medium text-green-600">
                                    Active Account
                                </span>
                            </div>
                        </div>

                        <Button
                            type="button"
                            onPress={async () => {
                                await signOut();
                            }}
                            className="w-full bg-red-500/10 text-red-600 sm:w-auto"
                        >
                            ↩ সাইন আউট
                        </Button>
                    </section>

                    <section className="mt-6 rounded-2xl border border-base-300 bg-base-100 p-5 shadow-sm sm:mt-8 sm:p-8">
                        <h2 className="mb-1 text-xl font-semibold">
                            প্রোফাইল আপডেট
                        </h2>

                        <p className="mb-6 text-sm text-base-content/60">
                            আপনার নাম পরিবর্তন করতে নিচের ফর্মটি পূরণ করুন।
                        </p>

                        <Form className="w-full" onSubmit={onSubmit}>
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

                                {message && (
                                    <p
                                        role="status"
                                        className="mt-4 text-sm text-green-600"
                                    >
                                        {message}
                                    </p>
                                )}

                                {errorMessage && (
                                    <p
                                        role="alert"
                                        className="mt-4 text-sm text-red-500"
                                    >
                                        {errorMessage}
                                    </p>
                                )}

                                <Fieldset.Actions className="mt-5 w-full">
                                    <Button
                                        type="submit"
                                        isDisabled={isUpdating}
                                        className="w-full bg-green-600 font-semibold text-white"
                                    >
                                        {isUpdating
                                            ? 'আপডেট হচ্ছে...'
                                            : 'তথ্য আপডেট করুন'}
                                    </Button>
                                </Fieldset.Actions>
                            </Fieldset>
                        </Form>
                    </section>
                </>
            ) : (
                <section className="mx-auto mt-10 max-w-lg rounded-2xl border border-green-500/20 bg-green-500/5 p-6 text-center shadow-sm sm:p-10">
                    <div className="mx-auto flex h-16 w-16 animate-pulse items-center justify-center rounded-full bg-green-500/15 text-3xl">
                        👤
                    </div>

                    <h2 className="mt-4 text-xl font-bold">
                        Guest User
                    </h2>

                    <p className="mt-2 text-sm text-base-content/60">
                        আপনার প্রোফাইল দেখতে প্রথমে সাইন ইন করুন।
                    </p>

                    <Link
                        href="/sign-in"
                        className="mt-6 inline-flex w-full items-center justify-center rounded-xl bg-green-600 px-5 py-3 font-semibold text-white transition hover:bg-green-700 sm:w-auto"
                    >
                        সাইন ইন করুন →
                    </Link>
                </section>
            )}
        </main>
    );
};

export default ProfilePage;
