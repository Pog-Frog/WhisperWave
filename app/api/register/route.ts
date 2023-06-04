import bycrypt from 'bcrypt';
import prisma from '@/app/libs/prismadb';
import {NextResponse} from "next/server";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const {email, name, password} = body;
        if (!email || !name || !password) {
            return new NextResponse("Invalid credentials", {status: 400});
        }

        const hashedPassword = await bycrypt.hash(password, 10);
        const user = await prisma.user.create({
            data: {
                email,
                name,
                hashedPassword
            }
        })

        return NextResponse.json(user)
    } catch (error) {
        return new NextResponse("Internal server error", {status: 500})
    }
}
