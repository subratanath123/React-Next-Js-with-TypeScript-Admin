'use client'
import React, {useState} from "react";
import ReportCard from "@/components/ReportCard";
import Table from "@/components/Table";
import LineChart from "@/components/LineChart";
import {any} from "prop-types";

export default function Dashboard() {

    const salesReportProps = {
        subject: 'Sales',
        reportTypeOption: 'Sales',
        amount: 1243,
        timeRange: 'Monthly',
        deviation: 10,
        percentage: 80
    };

    const customerReportProps = {
        subject: 'Customer',
        reportTypeOption: 'Customer',
        amount: 135,
        timeRange: 'Monthly',
        deviation: 10,
        percentage: 80
    };

    const revenueReportProps = {
        subject: 'Revenue',
        reportTypeOption: 'Revenue',
        amount: 137,
        timeRange: 'Monthly',
        deviation: 10,
        percentage: 80
    };

    const [state, setState] = useState({
        name: '',
        details: '',
        review: '',
        photo: ''
    });

    const headers = ['Invoice ID', 'Customer Name', 'Purchase Date', 'Expiry date', 'Price', 'Status'];
    const linkColumns: string[] = [];
    const rows: string[][] = [
        ['1', 'John Doe', '11/11/11', '11/11/11', '50.25', 'Expired'],
        ['2', 'Jane Smith', '12/12/12', '11/11/11', '30.99', 'Active'],
        ['3', 'Bob Johnson', '13/13/13', '11/11/11', '75.50', 'Expired']
    ];


    //chart data
    const type: string = 'line';
    const labels: string[] = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const datasets: any[] = [{
        data: [86, 114, 106, 106, 107, 111, 133],
        label: "Customer",
        borderColor: "#3e95cd",
        backgroundColor: "#7bb6dd",
        fill: false,
    }, {
        data: [70, 90, 44, 60, 83, 90, 100],
        label: "Revenue",
        borderColor: "#3cba9f",
        backgroundColor: "#71d1bd",
        fill: false,
    }, {
        data: [10, 21, 60, 44, 17, 21, 17],
        label: "Sales",
        borderColor: "#ffa500",
        backgroundColor: "#ffc04d",
        fill: false,
    }];

    return (
        <>
            <section className="section dashboard">
                <div className="row">

                    <div className="col-lg-12">
                        <div className="row">

                            <ReportCard {...salesReportProps}/>
                            <ReportCard {...customerReportProps}/>
                            <ReportCard {...revenueReportProps}/>

                            <Table title="Recent Subscription" headers={headers} rows={rows} linkColumns={linkColumns}/>
                            <LineChart chartTitle="Insights" labels={labels} type={type} datasets={datasets}/>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}