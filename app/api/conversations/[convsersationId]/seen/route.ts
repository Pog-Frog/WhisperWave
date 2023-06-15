import { NextResponse } from "next/server";
import { getCurrentuser } from "@/app/services/user.service";
import prisma from "@/app/libs/prismadb";
import { json } from "stream/consumers";

interface conversation {
    conversationId?: string;
  }

export async function POST (request: Request, { params }: {params: conversation}){
    try{
        const user = await getCurrentuser();

        if(!user?.id || !user?.email){
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const { conversationId } = params;
        const conversation = prisma.conversation.findFirst({
            where: {
                id: conversationId
            },
            include: {
                messages: {
                    include:{
                        seen: true
                    },
                },
                users: true
            },
        })

        if(!conversation){
            return new NextResponse("Invalid conversation", { status: 400 });
        }

        //@ts-ignore
        const lastMessage = conversation.messages[conversation.messages.length - 1];
        
        if(!lastMessage){
            return NextResponse.json(conversation);
        }

        const updatedMessage = await prisma.message.update({
            where: {
                id: lastMessage.id
            },
            include: {
                sender: true,
                seen: true
            },
            data:{
                seen: {
                    connect:{
                        id: user.id
                    }
                }
            }
        })

        if (lastMessage.seenIds.indexOf(user.id) !== -1) {
            return NextResponse.json(conversation);
        }

        return new NextResponse("Success", { status: 200 });
    }catch(err){
        console.log(err);
        return new NextResponse("Internal server error", { status: 500 });
    }
}