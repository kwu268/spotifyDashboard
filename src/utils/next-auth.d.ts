import { JWT } from "next-auth/jwt"; // IMPORTANT: JWT comes from this submodule

// Modify the 'next-auth' module to extend the Session interface and add custom fields
declare module "next-auth" {

    interface Session {
        // Custom fields added in the session callback
        accessToken: string;
        refreshToken: string;
        user: {
            id: string;
        } & DefaultSession["user"]; // Keep all default user fields (name, email, etc)
    }
}


// Modify the 'next-auth/jwt' module to extend the Session interface and add custom fields
declare module "next-auth/jwt" {
    interface JWT {
        // Custom fields added in the jwt callback
        accessToken: string;
        refreshToken: string;
        id: string;
    }
}