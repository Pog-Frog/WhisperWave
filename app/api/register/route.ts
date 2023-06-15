import bcrypt from "bcrypt";
import prisma from '@/app/libs/prismadb';
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const body = await req.json();
    const { email, name, password } = body;
    if (!email || !name || !password) {
        return new NextResponse("Invalid credentials", { status: 400 });
    }

    const userExists = await prisma.user.findUnique({
        where: {
            email
        }
    })

    if (userExists) {
        return new NextResponse("This email is already taken", { status: 400 })
    } else {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await prisma.user.create({
            data: {
                email,
                name,
                hashedPassword
            }
        })

        return NextResponse.json(user, { status: 201 })
    }   
}
