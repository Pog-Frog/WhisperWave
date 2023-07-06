import prisma from "@/app/libs/prismadb";
import {getCurrentuser} from "./user.service";

const getAll = async () => {
    const currentUser = await getCurrentuser();

    if(!currentUser) return [];

    try{
        const conversations = await prisma.conversation.findMany({
            where: {
                userIds : {
                    has: currentUser.id
                }
            },
            include: {
                users: true,
                messages: {
                    include: {
                        sender: true,
                        seen: true
                    },
                    orderBy: {
                        createdAt: 'asc'
                    }
                }
            }
        });

        return conversations;
    }
    catch(err){
        console.log(err);
        return [];
    }
}

const create = async (data: any) => {
    try{
        const conversation = await prisma.conversation.create({
            data
        });

        return conversation;
    }
    catch(err){
        console.log(err);
        return null;
    }
}

const deleteConversation = async (id: string) => {
    try{
        const conversation = await prisma.conversation.delete({
            where: {
                id
            }
        });

        return conversation;
    }
    catch(err){
        console.log(err);
        return null;
    }
}

const getConversationById = async (id: string) => {
    try{
        const conversation = await prisma.conversation.findUnique({
            where: {
                id
            },
            include: {
                users: true,
                messages: {
                    include: {
                        sender: true,
                        seen: true
                    },
                    orderBy: {
                        createdAt: 'asc'
                    }
                }
            }
        });

        return conversation;
    }
    catch(err){
        console.log(err);
        return null;
    }
}

export {
    getAll,
    create,
    deleteConversation,
    getConversationById
}