export interface User {
    uid: string;
    id?: string;
    email: string;
    displayName: string;
    emailVerified: boolean;
    coins: number;
    highScore: number;
}
