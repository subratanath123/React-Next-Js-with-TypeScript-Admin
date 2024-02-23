'use client'

import React, {Suspense} from "react";
import Table from "@/components/Table";
import {useRouter} from "next/navigation";
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css'


interface Review {
    id: string;
    clientName: '',
    clientDetails: '',
    clientReview: '',
    clientPhoto: '',
    stars: '',
    newClientPhotoList: [],
    submitting: false
}

export default function LoadReviewList() {
    return (
        <section>

            <Suspense fallback={
                <>
                    <div className="spinner-grow" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>

                    <Skeleton count={10} height={20}/>
                </>
            }>
                <ReviewList/>
            </Suspense>
        </section>
    )
}


 async function ReviewList() {
    const router = useRouter();
    const response = await fetch('https://one-dollar-admin.onrender.com' + "/review/list", {
        next: {revalidate: 20}
    });

    const data = await response.json();

    const reviewList = data.map((review: Review) => ({
        ...review,
        clickEvent: () => {
            router.push('/review/show/' + review.id);
        }
    }));

    const columns = [
        {
            label: 'Client Name',
            field: 'clientName',
            width: 150,
            attributes: {
                'aria-controls': 'DataTable',
                'aria-label': 'Name',
            },
        },
        {
            label: 'Client Details',
            field: 'clientDetails',
            width: 270,
        },
        {
            label: 'Client Review',
            field: 'clientReview',
            width: 270,
        },
        {
            label: 'Stars',
            field: 'stars',
            width: 270,
        }
    ];

    return (
        <>
            <Table key={12} title="Review List" columns={columns} data={reviewList}/>
        </>
    );
}