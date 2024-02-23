'use client'
import React, {useEffect, useState} from "react";
import ReportCard from "@/components/ReportCard";
import LineChart from "@/components/LineChart";
import axios from "axios";


export default function Dashboard() {

    const [salesReportProps, setSalesReportProps] = useState({
        statType: 'Sales',
        unit: 0,
        statRange: 'Monthly',
        increaseInPercentage: 0,
        onTimeRangeSelection: (e: React.MouseEvent<HTMLButtonElement>, statRange: any) => {
            getStatistics('Sales', statRange);
            getInsights('Sales', statRange);
        }
    });

    const [customerReportProps, setCustomerReportProps] = useState({
        statType: 'Customer',
        unit: 0,
        statRange: 'Monthly',
        increaseInPercentage: 0,
        onTimeRangeSelection: (e: React.MouseEvent<HTMLButtonElement>, statRange: any) => {
            getStatistics('Customer', statRange);
            getInsights('Customer', statRange);
        }
    });

    const [revenueReportProps, setRevenueReportProps] = useState({
        statType: 'Revenue',
        unit: 0,
        statRange: 'Monthly',
        increaseInPercentage: 0,
        onTimeRangeSelection: (e: React.MouseEvent<HTMLButtonElement>, statRange: any) => {
            getStatistics('Revenue', statRange);
            getInsights('Revenue', statRange);
        }
    });

    function getStatistics(statType: string, statRange: string) {
        axios
            .get('https://one-dollar-admin.onrender.com' + '/statistics?statType=' + statType + "&statRange=" + statRange)
            .then((response: any) => {
                if (statType == 'Sales') {
                    setSalesReportProps({
                        ...salesReportProps,
                        unit: response.data.unit,
                        statRange: statRange,
                        increaseInPercentage: response.data.increaseInPercentage
                    })
                } else if (statType == 'Customer') {
                    setCustomerReportProps({
                        ...customerReportProps,
                        unit: response.data.unit,
                        statRange: statRange,
                        increaseInPercentage: response.data.increaseInPercentage
                    })
                } else if (statType == 'Revenue') {
                    setRevenueReportProps({
                        ...revenueReportProps,
                        unit: response.data.unit,
                        statRange: statRange,
                        increaseInPercentage: response.data.increaseInPercentage
                    })
                }

            })
            .catch((error: any) => {
                console.error('Statistics Fetching failed:', error);
            });
    }


    useEffect(() => {
        getStatistics('Customer', 'Daily');
        getStatistics('Sales', 'Daily');
        getStatistics('Revenue', 'Daily');

        getInsights('Revenue', 'Daily');
        getInsights('Sales', 'Daily');
        getInsights('Customer', 'Daily');

    }, []);


    //chart data
    const [revenueInsightProps, setRevenueInsightProps] = useState({
        statType: 'Revenue',
        statRange: 'Monthly',
        dataList: [],
        labelList: []
    });

    const [customerInsightProps, setCustomerInsightProps] = useState({
        statType: 'Customer',
        statRange: 'Monthly',
        dataList: [],
        labelList: []
    });

    const [salesInsightProps, setSalesInsightProps] = useState({
        statType: 'Sales',
        statRange: 'Monthly',
        dataList: [],
        labelList: []
    });

    const customerDatasets: any[] = [{
        data: customerInsightProps.dataList,
        label: customerInsightProps.statType,
        borderColor: "#3e95cd",
        backgroundColor: "#7bb6dd",
        fill: false,
    }];

    const revenueDatasets: any[] = [{
        data: revenueInsightProps.dataList,
        label: revenueInsightProps.statType,
        borderColor: "#3cba9f",
        backgroundColor: "#71d1bd",
        fill: false,
    }];

    const salesDatasets: any[] = [{
        data: salesInsightProps.dataList,
        label: salesInsightProps.statType,
        borderColor: "#ffa500",
        backgroundColor: "#ffc04d",
        fill: false,
    }];

    function getInsights(statType: string, statRange: string) {
        axios
            .get('https://one-dollar-admin.onrender.com' + '/statistics/insights?statType=' + statType + "&statRange=" + statRange)
            .then((response: any) => {
                if (statType == 'Customer') {
                    setCustomerInsightProps({
                        ...customerInsightProps,
                        statRange: statRange,
                        dataList: response.data.totalList,
                        labelList: response.data.labelList
                    })
                } else if (statType == 'Sales') {
                    setSalesInsightProps({
                        ...salesInsightProps,
                        statRange: statRange,
                        dataList: response.data.totalList,
                        labelList: response.data.labelList
                    })
                } else if (statType == 'Revenue') {
                    setRevenueInsightProps({
                        ...revenueInsightProps,
                        statRange: statRange,
                        dataList: response.data.totalList,
                        labelList: response.data.labelList
                    })
                }

            })
            .catch((error: any) => {
                console.error('Insights Fetching failed:', error);
            });
    }

    return (
        <>
            <section className="section dashboard">
                <div className="row">

                    <div className="col-lg-12">
                        <div className="row">

                            <ReportCard {...salesReportProps} />
                            <ReportCard {...customerReportProps}/>
                            <ReportCard {...revenueReportProps}/>

                        </div>

                        <div className="row">

                            <div className="col-lg-4">
                                <LineChart chartTitle={`Sales Insights (${salesInsightProps.statRange})`}
                                           labels={salesInsightProps.labelList} type="line"
                                           datasets={salesDatasets}/>
                            </div>

                            <div className="col-lg-4">
                                <LineChart chartTitle={`Customer Insights (${customerInsightProps.statRange})`}
                                           labels={customerInsightProps.labelList}
                                           type="line"
                                           datasets={customerDatasets}/>
                            </div>

                            <div className="col-lg-4">
                                <LineChart chartTitle={`Revenue Insights (${revenueInsightProps.statRange})`}
                                           labels={revenueInsightProps.labelList}
                                           type="line"
                                           datasets={revenueDatasets}/>
                            </div>

                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}