"use client"

import {SignOutButton} from "@clerk/nextjs";

interface RouterQuery {
    type: string;
    message: string;
    title: string;
    additionalMessage: string;
}

export default function Error() {
    return (
        <SignOutButton/>
    );
}
