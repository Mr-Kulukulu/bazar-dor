"use client";
import { signIn, signUp } from "@/lib/auth-client";
import {
    Button,
    Description,
    FieldError,
    FieldGroup,
    Fieldset,
    Form,
    Input,
    Label,
    TextField,
} from "@heroui/react";
import Link from "next/link";

import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const SignUpPage = () => {
    const router = useRouter();
   const onSubmit = async (
    e: Parameters<
        NonNullable<React.ComponentProps<typeof Form>["onSubmit"]>
    >[0]
) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const user = Object.fromEntries(formData.entries()) as {
        name: string;
        email: string;
        image: string;
        password: string;
        confirmPassword: string;
    };

    if (user.password !== user.confirmPassword) {
        toast.error("পাসওয়ার্ড দুটি মেলেনি!");
        return;
    }

    const { data, error } = await signUp.email({
        ...user,
        callbackURL: "/sign-in",
    });

    console.log("Signup response:", { data, error });

    if (error) {
        toast.error(error.message || "অ্যাকাউন্ট তৈরি করা যায়নি।");
        return;
    }

    if (data) {
        toast.success("অ্যাকাউন্ট সফলভাবে তৈরি হয়েছে!");
        router.push("/sign-in");
    }
};

    const handleGoogleSignIn = async () => {
        try {
            const { error } = await signIn.social({
                provider: "google",
            });

            if (error) {
                toast.error(error.message || "Google দিয়ে সাইন ইন করা যায়নি।");
            }
        } catch {
            toast.error("Google দিয়ে সাইন ইন করতে সমস্যা হয়েছে।");
        }
    };

    const handleGithubSignIn = async () => {
        try {
            const { error } = await signIn.social({
                provider: "github",
            });

            if (error) {
                toast.error(error.message || "GitHub দিয়ে সাইন ইন করা যায়নি।");
            }
        } catch {
            toast.error("GitHub দিয়ে সাইন ইন করতে সমস্যা হয়েছে।");
        }
    };

    return (
        <div className="flex min-h-[80vh] items-center justify-center px-4 py-10">
            <div className="w-full max-w-md">
                <div className="mb-6 text-center">
                    <h1 className="text-3xl font-bold">
                        অ্যাকাউন্ট তৈরি করুন
                    </h1>

                    <p className="mt-2 text-sm text-base-content/70">
                        বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।
                    </p>
                </div>

                <div className="card rounded-2xl border border-base-300 bg-base-100 p-6 shadow-lg transition-colors hover:border-green-600 sm:p-8">
                    <Form className="w-full" onSubmit={onSubmit}>
                        <Fieldset className="w-full">
                            <FieldGroup>
                                <TextField
                                    isRequired
                                    name="name"
                                    validate={(value) => {
                                        if (value.trim().length < 3) {
                                            return "নাম কমপক্ষে ৩ অক্ষরের হতে হবে।";
                                        }
                                        return null;
                                    }}
                                >
                                    <Label>নাম</Label>
                                    <Input
                                        placeholder="যেমন: রহিম উদ্দিন"
                                        autoComplete="name"
                                    />
                                    <FieldError />
                                </TextField>

                                <TextField
                                    isRequired
                                    name="email"
                                    type="email"
                                >
                                    <Label>ইমেইল</Label>
                                    <Input
                                        placeholder="you@example.com"
                                        autoComplete="email"
                                    />
                                    <FieldError />
                                </TextField>

                                <TextField
                                    isRequired
                                    name="password"
                                    type="password"
                                    validate={(value) => {
                                        if (value.length < 8) {
                                            return "পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে।";
                                        }
                                        if (!/[A-Z]/.test(value)) {
                                            return "পাসওয়ার্ডে অন্তত একটি বড় হাতের ইংরেজি অক্ষর দিন।";
                                        }
                                        if (!/[0-9]/.test(value)) {
                                            return "পাসওয়ার্ডে অন্তত একটি সংখ্যা দিন।";
                                        }
                                        return null;
                                    }}
                                >
                                    <Label>পাসওয়ার্ড</Label>
                                    <Input
                                        placeholder="কমপক্ষে ৮ অক্ষর"
                                        autoComplete="new-password"
                                    />
                                    <Description>
                                        কমপক্ষে ৮ অক্ষর, একটি বড় হাতের ইংরেজি অক্ষর ও একটি সংখ্যা দিন।
                                    </Description>
                                    <FieldError />
                                </TextField>

                                <TextField
                                    isRequired
                                    name="confirmPassword"
                                    type="password"
                                >
                                    <Label>পাসওয়ার্ড নিশ্চিত করুন</Label>
                                    <Input
                                        placeholder="আবার পাসওয়ার্ড লিখুন"
                                        autoComplete="new-password"
                                    />
                                    <FieldError />
                                </TextField>
                            </FieldGroup>

                            <Fieldset.Actions className="mt-5 w-full">
                                <Button
                                    type="submit"
                                    className="w-full bg-green-600 font-semibold text-white hover:bg-green-700"
                                >
                                    অ্যাকাউন্ট তৈরি করুন
                                </Button>
                            </Fieldset.Actions>
                        </Fieldset>
                    </Form>

                    <div className="divider my-5">অথবা</div>

                    <div className="grid w-full min-w-0 grid-cols-1 gap-3 sm:grid-cols-2">
                        <Button
                            type="button"
                            variant="outline"
                            className="flex w-full min-w-0 items-center justify-center gap-2 overflow-hidden border-base-300 bg-base-100 px-2 text-sm font-semibold hover:bg-base-200"
                            onClick={handleGoogleSignIn}
                        >
                            <FcGoogle size={22} className="shrink-0" />
                            <span className="truncate">
                                Google দিয়ে চালিয়ে যান
                            </span>
                        </Button>

                        <Button
                            type="button"
                            variant="outline"
                            className="flex w-full min-w-0 items-center justify-center gap-2 overflow-hidden border-base-300 bg-base-100 px-2 text-sm font-semibold hover:bg-base-200"
                            onClick={handleGithubSignIn}
                        >
                            <FaGithub size={22} className="shrink-0" />
                            <span className="truncate">
                                GitHub দিয়ে চালিয়ে যান
                            </span>
                        </Button>
                    </div>

                    <p className="text-center text-sm text-base-content/70">
                        ইতিমধ্যে অ্যাকাউন্ট আছে?{" "}
                        <Link
                            href="/sign-in"
                            className="font-semibold text-green-700 hover:underline"
                        >
                            সাইন ইন করুন
                        </Link>
                    </p>
                </div>

                <p className="mt-4 text-center text-xs text-base-content/50">
                    <Link href="/" className="hover:underline">
                        ← হোম পেজে ফিরে যান
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default SignUpPage;
