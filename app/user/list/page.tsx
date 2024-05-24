'use client'

import React, {Suspense} from "react";
import Table from "@/components/Table";
import {useRouter} from "next/navigation";
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css'
import {getCookie} from "cookies-next";


interface Customer {
    id: string;
    email: string;
    fullName: string;
    hasSubscription: string;
    subscriptionCreated: string;
    subscriptionEnded: string;
    subscriptionType: string;
    totalSubscription: number;
}

export default function LoadCustomerList() {
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
                <CustomerList/>
            </Suspense>
        </section>
    )
}

 async function CustomerList() {
    const router = useRouter();
    const response = await fetch('https://one-dollar-admin.onrender.com' + "/customer/list",
        {
            headers: {
                'Authorization': 'Bearer ' + getCookie("__session")
            },
            next: {revalidate: 20}
        });

    const data = await response.json();

    const customerList = data.map((customer: Customer) => ({
        ...customer,
        clickEvent: () => {
            router.push('/customer/claim/' + customer.id);
        }
    }));

    const customBooleanFormatter = (cell: any, row: any) => {
        return cell ? 'Yes' : 'No';
    };

    const columns = [
        {
            label: 'email',
            field: 'email',
            width: 150,
            attributes: {
                'aria-controls': 'DataTable',
                'aria-label': 'Name',
            },
        },
        {
            label: 'fullName',
            field: 'fullName',
            width: 270,
        },
        {
            label: 'hasSubscription',
            field: 'hasSubscription',
            width: 270,
            formatter: customBooleanFormatter
        },
        {
            label: 'subscriptionCreated',
            field: 'subscriptionCreated',
            width: 270,
        },
        {
            label: 'subscriptionEnded',
            field: 'subscriptionEnded',
            width: 270,
        },
        {
            label: 'subscriptionType',
            field: 'subscriptionType',
            width: 270,
        },
        {
            label: 'totalSubscription',
            field: 'totalSubscription',
            width: 270,
        }
    ];

    return (
        <>
            <Table key={12} title="User List" columns={columns} data={customerList}/>
        </>
    );
}