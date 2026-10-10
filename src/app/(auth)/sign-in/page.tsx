
"use client";

import { signIn } from "@/lib/auth-client";
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
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

const SignInPage = () => {
    const router = useRouter();

    const onSubmit = async (
        e: Parameters<
            NonNullable<React.ComponentProps<typeof Form>["onSubmit"]>
        >[0]
    ) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);

        const email = String(formData.get("email") ?? "").trim();
        const password = String(formData.get("password") ?? "");

        if (!email || !password) {
            toast.error("ইমেইল ও পাসওয়ার্ড লিখুন।");
            return;
        }

        try {
            const { data, error } = await signIn.email({
                email,
                password,
                callbackURL: "/",
            });

            if (error) {
                toast.error(error.message || "সাইন ইন করা যায়নি।");
                return;
            }

            if (data) {
                toast.success("সফলভাবে সাইন ইন হয়েছে!");
                router.push("/");
                router.refresh();
            }
        } catch {
            toast.error("কিছু সমস্যা হয়েছে। আবার চেষ্টা করুন।");
        }
    };
    const handleGoogleSignIn = async () => {
     const {error} =  await signIn.social({
            provider:"google",
            callbackURL: "/",

        })
        if(error){
            toast.error(error.message || "Google login failed")
        }
    }
    const handleGithubSignIn = async () => {
       const {error} = await signIn.social({
            provider:"github",
            callbackURL: "/",
        })
        if(error){
            toast.error(error.message || "GitHub login failed")
        }
    }

    return (
        <div className="flex min-h-[80vh] items-center justify-center px-4 py-10">
            <div className="w-full max-w-md">
                <div className="mb-6 text-center">
                    <h1 className="text-3xl font-bold">
                        সাইন ইন করুন
                    </h1>

                    <p className="mt-2 text-sm text-base-content/70">
                        আপনার অ্যাকাউন্টে প্রবেশ করে সব বিস্তারিত দাম দেখুন।
                    </p>
                </div>

                <div className="card rounded-2xl border border-base-300 bg-base-100 p-6 shadow-lg transition-colors hover:border-green-600 sm:p-8">
                    <Form className="w-full" onSubmit={onSubmit}>
                        <Fieldset className="w-full">
                            <FieldGroup>
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
                                >
                                    <Label>পাসওয়ার্ড</Label>
                                    <Input
                                        placeholder="আপনার পাসওয়ার্ড লিখুন"
                                        autoComplete="current-password"
                                    />
                                    <Description>
                                        আপনার অ্যাকাউন্টের পাসওয়ার্ড দিন।
                                    </Description>
                                    <FieldError />
                                </TextField>
                            </FieldGroup>



                            <Fieldset.Actions className="mt-5 w-full">
                                <Button
                                    type="submit"
                                    className="w-full bg-green-600 font-semibold text-white hover:bg-green-700"
                                >
                                    সাইন ইন করুন
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
                            <span className="truncate">Google দিয়ে চালিয়ে যান</span>
                        </Button>

                        <Button
                            type="button"
                            variant="outline"
                            className="flex w-full min-w-0 items-center justify-center gap-2 overflow-hidden border-base-300 bg-base-100 px-2 text-sm font-semibold hover:bg-base-200"
                            onClick={handleGithubSignIn}
                        >
                            <FaGithub size={22} className="shrink-0" />
                            <span className="truncate">GitHub দিয়ে চালিয়ে যান</span>
                        </Button>
                    </div>

                    <p className="text-center text-sm text-base-content/70">
                        অ্যাকাউন্ট নেই?{" "}
                        <Link
                            href="/sign-up"
                            className="font-semibold text-green-700 hover:underline"
                        >
                            অ্যাকাউন্ট তৈরি করুন
                        </Link>
                    </p>
                </div>

                <p className="mt-4 text-center text-xs text-base-content/50">
                    <Link href={'/'} className="hover:underline">← হোম পেজে ফিরে যান</Link>
                </p>
            </div>
        </div>
    );
};

export default SignInPage;

