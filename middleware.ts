import {
    clerkMiddleware,
    createRouteMatcher
} from '@clerk/nextjs/server';

const isProtectedRoute = createRouteMatcher([
    '/(.*)',
    '/(.*)',
]);

const isPublicRoute = createRouteMatcher([
    '/error(.*)',
]);

export default clerkMiddleware((auth, req) => {
    const role = auth().sessionClaims?.metadata.role;

    if (isPublicRoute(req)) {
        auth().protect();

    } else if (role !== 'org:admin') {
        auth().protect();
    }

});

export const config = {
    matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};