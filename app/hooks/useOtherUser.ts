import { useSession } from "next-auth/react";
import { useMemo } from "react";
import {Message, User, Conversation} from "@prisma/client";

type FullMessageType = Message & {
    sender: User,
    seen: User[]
}

type FullConversationType = Message & {
    users: User[];
    messages: FullMessageType[]
}
const useOtherUser = (conversation: FullConversationType | { users: User[] }) => {
    const session = useSession();

    const otherUser = useMemo(() => {
        const currentUserEmail = session.data?.user?.email;

        const otherUser = conversation.users.filter((user) => user.email !== currentUserEmail);

        return otherUser[0];
    }, [session.data?.user?.email, conversation.users]);

    return otherUser;
};

export default useOtherUser;