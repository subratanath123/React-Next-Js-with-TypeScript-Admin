export {}

declare global {
    interface CustomJwtSessionClaims {
        metadata: {
            role?: "org:admin";
        };
    }
}
