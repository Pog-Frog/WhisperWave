import { getCurrentuser } from "@/app/services/user.service";
import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";
import { deleteConversation } from "@/app/services/conversation.service";

interface conversation {
    conversationId?: string;
}

export async function DELETE(request: Request, {params}: {params: conversation}){
    try{
        const user = await getCurrentuser();

        if(!user?.id || !user?.email){
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const { conversationId } = params;
        const conversation = await prisma.conversation.findFirst({
            where: {
                id: conversationId
            },
            include: {
                users: true
            },
        })

        if(!conversation){
            return new NextResponse("Invalid conversation", { status: 400 });
        }

        const deletedConversation = await deleteConversation(conversationId as string);

        if(!deletedConversation){
            return new NextResponse("Invalid conversation", { status: 400 });
        }

        conversation.users.forEach(async (user) => {
            if(user.email){
                //push server trigger
            }
        })
        return new NextResponse("Conversation deleted", { status: 200 });
        
    }catch(err){
        console.log(err);
        return new NextResponse("Something went wrong", { status: 500 });
    }
}