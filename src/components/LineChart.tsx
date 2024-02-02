import React, {FC, useEffect, useRef} from "react";
import {Chart} from "chart.js";
import {ReportTypeOption, TimeRangeOption} from "@/constants/Constants";

interface LineChartProps {
    chartTitle: string;
    type: string;
    datasets: any[];
    labels: string[];
}

const LineChart: FC<LineChartProps> = ({chartTitle, type, datasets, labels}) => {
    const chartRef = useRef(null);

    useEffect(() => {
        if (chartRef.current) {
            const ctx = chartRef.current.getContext('2d')

            new Chart(ctx, {
                type: type,
                data: {
                    labels: labels,
                    datasets: datasets
                },
            });
        }
    }, [])
    return (
        <>
            <section className="section dashboard">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="card">
                            <div className="card-body">
                                <h1 className="card-title w-[110px] mx-auto mt-10">
                                    {chartTitle}
                                </h1>
                                <div className="w-[1100px] h-screen flex mx-auto my-auto">
                                    <div
                                        className='border border-gray-400 pt-0 rounded-xl  w-full h-fit my-auto  shadow-xl'>
                                        <canvas id="myChart" ref={chartRef}></canvas>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
};

export default LineChart;