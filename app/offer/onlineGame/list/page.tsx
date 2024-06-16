'use client'

import React, {Suspense} from "react";
import Table from "@/components/Table";
import {useRouter} from "next/navigation";
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css'
import {getCookie} from "cookies-next";


interface Offer {
    id: string;
    submitting: boolean,
    offerCategory: string,
    offerType: string
    link: string,
    details: string,
    title: string,
    subtitle: string,
    buttonName: string,
    photoList: File[],
    order: string,
    validityFrom: string,
    validityTo: string,
    deleted: string
}

export default function LoadBannerList() {
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
                <VipOfferList/>
            </Suspense>
        </section>
    )
}

 async function VipOfferList() {
    const router = useRouter();
    const response = await fetch('https://one-dollar-admin.onrender.com' + "/offer/OnlineGame/list",
        {
            headers: {
                'Authorization': 'Bearer ' + getCookie("__session")
            },
            next: {revalidate: 20}
        });

    const data = await response.json();

    const bannerList = data.map((banner: Offer) => ({
        ...banner,
        clickEvent: () => {
            router.push('/offer/show/' + banner.id);
        },
    }));

    const columns = [
        {
            label: 'Affiliation Link',
            field: 'link',
            width: 150,
            attributes: {
                'aria-controls': 'DataTable',
                'aria-label': 'Name',
            },
        },
        {
            label: 'Country',
            field: 'country',
            width: 270,
        },
        {
            label: 'Offer Category',
            field: 'offerCategory',
            width: 270,
        },
        {
            label: 'Offer Type',
            field: 'offerType',
            width: 270,
        },
        {
            label: 'Promotion Line',
            field: 'details',
            width: 270,
        },
        {
            label: 'Offer Order',
            field: 'order',
            width: 270,
        },
        {
            label: 'Offer Validity From',
            field: 'validityFrom',
            width: 270,
        },
        {
            label: 'Offer Validity To',
            field: 'validityTo',
            width: 270,
        },
        {
            label: 'Deleted?',
            field: 'deleted',
            width: 270,
        }
    ];
    return (
        <>
            <Table key={12} title="Online Game List" columns={columns} data={bannerList}/>
        </>
    );
}