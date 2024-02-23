"use client"

import Alert from "@/components/Alert";
import {useSearchParams} from 'next/navigation';
import {Suspense, useEffect, useState} from "react";

interface RouterQuery {
    type: string;
    message: string;
    title: string;
    additionalMessage: string;
}

export default function Done() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <ClientSideSearchParams/>
        </Suspense>
    );
}


function ClientSideSearchParams() {

    const searchParams = useSearchParams();
    const type = searchParams.get('type') || 'danger';
    const message = searchParams.get('message') || 'Please refresh';
    const title = searchParams.get('title') || 'Error occurred';
    const additionalMessage = searchParams.get('additionalMessage') || 'Please refresh';

    return (
        <Alert type={type} title={title} message={message} additionalMessage={additionalMessage} />
    );
}
