'use client'

import React, {Suspense} from "react";
import Table from "@/components/Table";
import {useRouter} from "next/navigation";
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css'


interface Banner {
    id: string;
    link: string;
    bannerCategory: string;
    bannerDetails: string;
    order: string;
    validityFrom: string;
    validityTo: string;
    buttonName: string;
    deleted: string;
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
                <BannerList/>
            </Suspense>
        </section>
    )
}

 async function BannerList() {
    const router = useRouter();
    const response = await fetch('https://one-dollar-admin.onrender.com' + "/banner/vipOffer/list", {
        next: {revalidate: 20}
    });

    const data = await response.json();

    const bannerList = data.map((banner: Banner) => ({
        ...banner,
        clickEvent: () => {
            router.push('/banner/show/' + banner.id);
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
            label: 'BannerCategory',
            field: 'bannerCategory',
            width: 270,
        },
        {
            label: 'offerCategory',
            field: 'offerCategory',
            width: 270,
        },
        {
            label: 'Banner Details',
            field: 'bannerDetails',
            width: 270,
        },
        {
            label: 'Banner Order',
            field: 'order',
            width: 270,
        },
        {
            label: 'Banner Validity From',
            field: 'validityFrom',
            width: 270,
        },
        {
            label: 'Banner Validity To',
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
            <Table key={12} title="Vip Offer List" columns={columns} data={bannerList}/>
        </>
    );
}