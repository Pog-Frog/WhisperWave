import prisma from "@/app/libs/prismadb";

const getAll = async (conversationId: string) => {
    try{
        const messages = await prisma.message.findMany({
            where: {
                conversationId
            },
            include: {
                sender: true,
                seen: true
            },
            orderBy: {
                createdAt: 'asc'
            }
        });

        return messages;
    }
    catch(err){
        console.log(err);
        return [];
    }
}

const create = async (data: any) => {
    try{
        const message = await prisma.message.create({
            data
        });

        return message;
    }
    catch(err){
        console.log(err);
        return null;
    }
}

const deleteMessage = async (id: string) => {
    try{
        const message = await prisma.message.delete({
            where: {
                id
            }
        });

        return message;
    }
    catch(err){
        console.log(err);
        return null;
    }
}

export {
    getAll,
    create,
    deleteMessage
}