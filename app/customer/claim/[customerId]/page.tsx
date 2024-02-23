'use client'

import React, {useEffect, useState} from "react";
import Table from "@/components/Table";
import axios from "axios";
import {useRouter} from "next/navigation";

interface Claim {
    id: string;
    email: string;
    fullName: string;
    offerCategory: string;
    linkTraversed: string;
}

export default function ClaimList({params}: { params: { customerId: string } }) {
    const router = useRouter();
    const customerId = params.customerId;

    useEffect(() => {
        axios
            .get(process.env.backendserver + '/customer/claim/' + customerId)
            .then((response) => {
                setClaimList(response.data);

            })
            .catch((error) => {
                console.error('ClaimList Fetching failed:', error);
            });
    }, []);

    const [claimList, setClaimList] = useState([]);

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
            width: 150,
            attributes: {
                'aria-controls': 'DataTable',
                'aria-label': 'Name',
            },
        },
        {
            label: 'offerCategory',
            field: 'offerCategory',
            width: 150,
            attributes: {
                'aria-controls': 'DataTable',
                'aria-label': 'Name',
            },
        },
        {
            label: 'linkTraversed',
            field: 'linkTraversed',
            width: 270,
        }
    ];

    return (
        <>
            <Table key={12} title="Claim List" columns={columns} data={claimList}/>
        </>
    );
}