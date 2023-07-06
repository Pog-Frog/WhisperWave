'use client';

import { useCallback, useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import clsx from "clsx";
import Input from "@/app/components/inputs/Input";
import AuthSocialButton from "@/app/(site)/components/AuthSocialButton";
import { BsGithub, BsGoogle } from "react-icons/bs";
import axios from "axios";
import { toast } from "react-hot-toast";
import * as yup from 'yup';
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";


type VARIANT = 'LOGIN' | 'REGISTER';
const AuthForm = () => {
    const [variant, setVariant] = useState<VARIANT>('LOGIN');
    const [Isloading, setIsloading] = useState<boolean>(false);
    const toggleVariant = useCallback(() => {
        setVariant((prev) => prev === 'LOGIN' ? 'REGISTER' : 'LOGIN');
    }, [setVariant]);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FieldValues>({
        defaultValues: {
            name: '',
            email: '',
            password: '',
            passwordConfirm: '',
        },
        mode: 'onBlur',
    });

    const registrationSchema = yup.object().shape({
        name: yup.string().required('Name is required'),
        email: yup.string().email('Email is invalid').required('Email is required'),
        password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
        passwordConfirm: yup.string().oneOf([yup.ref('password')], 'Passwords must match').required('Confirm Password is required'),
    });

    const loginSchema = yup.object().shape({
        email: yup.string().email('Email is invalid').required('Email is required'),
        password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    });

    const { setValue } = useForm<FieldValues>();

    const session = useSession();
    const router = useRouter();
    useEffect(() => {
        if (session?.status === 'authenticated') {
            console.log('authenticated');
            router.push('/users');
        }
    }, [session?.status, router]);

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsloading(true);
        if (variant === 'LOGIN') {
            signIn('credentials', {
                ...data,
                redirect: false
            })
                .then((callback) => {
                    if (callback?.error) {
                        toast.error('Invalid credentials!');
                    }

                    if (callback?.ok) {
                        router.push('/conversations')
                    }
                })
                .finally(() => setIsloading(false))
        } else {
            registrationSchema.validate(data).then(
                () => {
                    axios.post('/api/register', data)
                        .then((response) => {
                            toast.success('Registered successfully redirecting to login page ...');
                            setTimeout(() => {
                                setVariant('LOGIN');
                                setValue('email', data.email);
                            }
                                , 2000);
                        })
                        .catch((err) => {
                            toast.error(err.response.data);
                        })

                        .finally(() => {
                            setIsloading(false);
                        })
                }
            ).catch(
                (err) => {
                    toast.error(err.message);
                    setIsloading(false);
                }
            )
        }
    }
    const socialActions = (action: string) => {
        setIsloading(true);

        signIn(action, { redirect: false })
            .then((callback) => {
                if (callback?.error) {
                    toast.error('Invalid credentials!');
                }

                if (callback?.ok) {
                    router.push('/conversations')
                }
            })
            .finally(() => setIsloading(false));
    }
    return (
        <>
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
                {variant === 'LOGIN' && (
                    'Sign in to your account'
                ) || (
                        'Create your account'
                    )}
            </h2>
            <div className="mt-8 sm:sm-auto sm:w-full sm:max-w-md">
                <div className="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
                    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                        {variant === 'REGISTER' && (
                            <Input id="name" label="Name" type="text" register={register} errors={errors} />
                        )}
                        <Input id="email" label="Email" type="email" register={register} errors={errors} />
                        <Input id="password" label="Password" type="password" register={register} errors={errors} />
                        {variant === 'REGISTER' && (
                            <Input id="passwordConfirm" label="Confirm Password" type="password" register={register}
                                errors={errors} />
                        )}
                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input
                                    id="remember_me"
                                    name="remember_me"
                                    type="checkbox"
                                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                />
                                <label htmlFor="remember_me" className="ml-2 block text-sm text-gray-900">
                                    Remember me
                                </label>
                            </div>
                            <div className="text-sm">
                                <button
                                    type="button"
                                    onClick={toggleVariant}
                                    className="font-medium text-indigo-600 hover:text-indigo-500"
                                >
                                    {variant === 'LOGIN' ? 'Register' : 'Login'}
                                </button>
                            </div>
                        </div>
                        <div>
                            <button
                                type="submit"
                                className={clsx(`
                                w-full
                                flex
                                justify-center
                                py-2
                                px-4
                                border
                                border-transparent
                                rounded-md
                                shadow-sm
                                text-sm
                                font-medium
                                text-white
                                bg-sky-600
                                hover:bg-sky-700
                                focus:outline-none
                                focus:ring-2
                                focus:ring-offset-2
                                focus:ring-sky-500
                                disabled:opacity-50
                                disabled:cursor-default 
                            `)}
                                disabled={Isloading}
                            >
                                {variant === 'LOGIN' ? 'Login' : 'Register'}
                            </button>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-white text-gray-500">Or continue with</span>
                        </div>
                        <div className="mt-6 flex gap-2">
                            <AuthSocialButton
                                icon={BsGithub}
                                onClick={() => socialActions('github')}
                            />
                            <AuthSocialButton
                                icon={BsGoogle}
                                onClick={() => socialActions('google')}
                            />
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default AuthForm;