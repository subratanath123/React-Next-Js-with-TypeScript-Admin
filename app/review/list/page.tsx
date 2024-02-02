'use client'

import React, {ChangeEvent, useState} from "react";
import Table from "@/components/Table";

export default function BannerList() {
    const [state, setState] = useState({
        name: '',
        details: '',
        review: '',
        photo: ''
    });

    const headers = ['Client Name', 'Client Details', 'Client Review', 'Client Photo',  'Edit'];
    const rows = [
        ['Subrata nath', 'Fuck', 'I am bad boy', '', '/review/show/1']
    ];
    const linkColumns = ['Client Photo', 'Edit'];

    return (
        <>
            <Table  title="Review List Table"  headers={headers} rows={rows} linkColumns={linkColumns} />
        </>
    );
}