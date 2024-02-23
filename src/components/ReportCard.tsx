import React, {FC} from 'react';
import {reportTypeOptionToIconMap, TimeRangeOption, timeRangeOptionList} from "@/constants/Constants";

interface ReportProps {
    statType: string;
    unit: number;
    statRange: TimeRangeOption;
    increaseInPercentage: number;
    onTimeRangeSelection: (e: React.MouseEvent<HTMLButtonElement>, timeRangeOption:any) => void
}

const ReportCard: FC<ReportProps> = ({statType, unit, statRange, increaseInPercentage, onTimeRangeSelection}) => {

    const handleTimeRangeSelection = (e: React.MouseEvent<HTMLButtonElement>, timeRangeOption: any) => {
        onTimeRangeSelection(e, timeRangeOption);
    };

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
                            <li key={timeRangeOption}>
                                <button className="dropdown-item"
                                   onClick={(e)=> {handleTimeRangeSelection(e, timeRangeOption)}}>
                                    {timeRangeOption}
                                </button>
                            </li>
                        ))
                        }
                    </ul>
                </div>

                <div className="card-body">
                    <h5 className="card-title">{statType} <span> | {statRange} </span></h5>

                    <div className="d-flex align-items-center">
                        <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                            <i className={`bi bi-${reportTypeOptionToIconMap.get(statType)}`}></i>
                        </div>
                        <div className="ps-3">
                            <h6>{unit}</h6>
                            <span
                                className={`text-${increaseInPercentage < 0 ? 'danger' : 'success'} small pt-1 fw-bold`}>
                                {increaseInPercentage}%
                            </span>
                            <span className="text-muted small pt-2 ps-1">
                                {increaseInPercentage < 0 ? 'decrease' : 'increase'}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default ReportCard;