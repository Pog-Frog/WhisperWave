import './globals.css'
import { Inter } from 'next/font/google'
import ToasterContext from './context/toaster.context'
import AuthContext from "@/app/context/auth.context";

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Messenger clone',
  description: 'This is a messenger clone done in Next.js',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthContext>
        <ToasterContext />
        {children}
        </AuthContext>
      </body>
    </html>
  )
}
