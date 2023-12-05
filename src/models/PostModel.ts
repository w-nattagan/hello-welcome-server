import { User } from "./UserModel";

export interface Post {
    id: number;
    title: string;
    body: string;
    createdAt: Date;
    updatedAt: Date;
    user: User;
    userId: number;
}
