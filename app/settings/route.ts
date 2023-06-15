import { NextResponse } from "next/server";
import { getCurrentuser } from "@/app/services/user.service";
import prisma from "@/app/libs/prismadb";

export async function POST(request: Request) {
    try{
        const user = await getCurrentuser();
        const body = await request.json();
        const {name , image} = body;

        if(!user?.id || !user?.email){
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const updatedUser = await prisma.user.update({
            where: {
                id: user.id
            },
            data: {
                name: name,
                image: image
            }
        })

        return new NextResponse("User updated", { status: 200 });
    }catch(err){
        console.log(err);
        return new NextResponse("Something went wrong", { status: 500 });
    }
}