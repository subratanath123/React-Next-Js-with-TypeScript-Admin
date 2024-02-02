import React, {FC} from 'react';
import {ReportTypeOption, reportTypeOptionToIconMap, TimeRangeOption, timeRangeOptionList} from "@/constants/Constants";

interface ReportProps {
    subject: string;
    reportTypeOption: ReportTypeOption;
    amount: number;
    timeRange: TimeRangeOption;
    deviation: number;
    percentage: number;
}

const ReportCard: FC<ReportProps> = ({subject, reportTypeOption,amount, timeRange, deviation, percentage}) => {
    return (
        <div className="col-xxl-4 col-xl-12">

            <div className="card info-card customers-card">

                <div className="filter">
                    <a className="icon" href="#" data-bs-toggle="dropdown"><i className="bi bi-three-dots"></i></a>
                    <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                        <li className="dropdown-header text-start">
                            <h6>Filter</h6>
                        </li>

                        {timeRangeOptionList.map((timeRangeOption, index) => (
                            <li key={timeRangeOption}><a className="dropdown-item" href="#">{timeRangeOption}</a></li>
                        ))
                        }
                    </ul>
                </div>

                <div className="card-body">
                    <h5 className="card-title">{subject} <span> | {timeRange} </span></h5>

                    <div className="d-flex align-items-center">
                        <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                            <i className={`bi bi-${reportTypeOptionToIconMap.get(reportTypeOption)}`}></i>
                        </div>
                        <div className="ps-3">
                            <h6>{amount}</h6>
                            <span className={`text-${percentage < 0 ? 'danger' : 'success'} small pt-1 fw-bold`}>
                                {percentage}%
                            </span>
                            <span className="text-muted small pt-2 ps-1">
                                {percentage < 0 ? 'decrease' : 'increase'}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default ReportCard;