import { Message } from "./Message";
import { User } from "./User";

export type Chat = {
    user: User;
    messages: Message[];
};