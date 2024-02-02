'use client'

import React, {ChangeEvent, useState} from "react";
import Table from "@/components/Table";

export default function BannerList() {

    const headers = ['Banner Order', 'Affiliation Link', 'Banner details', 'Banner Validity From', 'Banner Validity To', 'Edit'];
    const rows = [
        ['1', '111', 'New York', '11/11/11', '11/11/11', '/banner/show/1']
    ];
    const linkColumns = ['Edit'];

    return (
        <>
            <Table title="Banner List Table" headers={headers} rows={rows} linkColumns={linkColumns} />
        </>
    );
}