import Image from 'next/image';
import AuthForm from "@/app/(site)/components/AuthForm";

export default function Home() {
    return (
      <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8 bg-gray-100">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <Image height="48" width="48" src="/images/logo.png" className="mx-auto w-auto" alt="logo" />
            <AuthForm />
        </div>
      </div>
    )
  }
  