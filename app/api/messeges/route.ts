import { NextResponse } from "next/server";
import { getCurrentuser } from "@/app/services/user.service";
import prisma from "@/app/libs/prismadb";

export async function POST(request: Request) {
    try {
        const user = await getCurrentuser();

        if (!user?.id || !user?.email) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        const body = await request.json();

        const { message, image, conversationId } = body;

        const newMessage = await prisma.message.create({
            include: {
                seen: true,
                sender: true
            },
            data: {
                body: message,
                image: image,
                conversation: {
                    connect: {
                        id: conversationId
                    }
                },
                sender: {
                    connect: {
                        id: user.id
                    }
                }
            }
        })

        const updatedConversations = await prisma.conversation.update({
            where: {
                id: conversationId
            },
            data: {
                createdAt: new Date(),
                messages: {
                    connect: {
                        id: newMessage.id
                    }
                }
            },
            include: {
                users: true,
                messages: {
                    include: {
                        seen: true
                    }
                }
            }
        })

        const lastMessage = updatedConversations.messages[updatedConversations.messages.length - 1];

        updatedConversations.users.forEach(async (user) => {
            //push server trigger
        })

        return NextResponse.json(newMessage);

    } catch (err) {
        console.log(err);
        return new NextResponse("Something went wrong", { status: 500 });
    }
}