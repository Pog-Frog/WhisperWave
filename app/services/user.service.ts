import prisma from "@/app/libs/prismadb";
import getSession from "./session.service";

const getAllusers = async () => {
    const session = await getSession();

    if(!session?.user?.email) return [];

    try{
        const users = await prisma.user.findMany({
            where: {
                email: {
                    not: session.user.email
                }
            }
        });

        return users;
    }catch(err){
        console.log(err);
        return [];
    }
}

const getUserByEmail = async (email: string) => {
    try{
        const user = await prisma.user.findUnique({
            where: {
                email
            }
        });

        return user;
    }catch(err){
        console.log(err);
        return null;
    }
}

const getUserById = async (id: string) => {
    try{
        const user = await prisma.user.findUnique({
            where: {
                id
            }
        });

        return user;
    }catch(err){
        console.log(err);
        return null;
    }
}

const updateUser = async (id: string, data: any) => {
    try{
        const user = await prisma.user.update({
            where: {
                id
            },
            data
        });

        return user;
    }catch(err){
        console.log(err);
        return null;
    }
}

const getCurrentuser = async () => {
    const session = await getSession();

    if(!session?.user?.email) return null;

    try{
        const user = await prisma.user.findUnique({
            where: {
                email: session.user.email as string
            }
        });
        
        if(!user) return null;

        return user;
    }catch(err){
        console.log(err);
        return null;
    }
}

export {
    getUserByEmail,
    getUserById,
    updateUser,
    getCurrentuser,
    getAllusers
}

    