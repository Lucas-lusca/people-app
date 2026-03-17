import { Chat } from "../types/Chat";
import { Message } from "../types/Message";
import { User } from "../types/User";

let chats: Chat[] = [];

export function getChats(): Chat[] {
    return chats;
}

export function addChat(user: User) {
    if (!chats.some(c => c.user.login.uuid === user.login.uuid)) {
        chats.push({ user, messages: [] });
    }
}

export function addMessage(user: User, message: Message) {
    const chat = chats.find(c => c.user.login.uuid === user.login.uuid);

    if (chat) {
        chat.messages.push(message);
    } else {
        chats.push({ user, messages: [message] });
    }
}

export function getMessages(user: User): Message[] {
    const chat = chats.find(c => c.user.login.uuid === user.login.uuid);
    return chat ? chat.messages : [];
}