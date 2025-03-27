export interface IUser {
    userId: string;
    name: string;
    email: string;
    isActive?: boolean;
    role: "customer" | "provider";
    iat?: number;
    exp?: number;
}