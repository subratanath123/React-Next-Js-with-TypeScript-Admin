import React, {FC} from 'react';
import Link from "next/link";
import {timeRangeOptionList} from "@/constants/Constants";

interface TableProps {
    title: string,
    headers: string[];
    rows: string [][];
    linkColumns?: string[]; // Optional array of links
}

const Table: FC<TableProps> = ({title, headers, rows, linkColumns}) => {
    return (
        <section className="section dashboard">
            <div className="row">
                <div className="col-lg-12">

                    <div className="card">

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
                            <h5 className="card-title">{title}</h5>

                            <table className="table datatable">
                                <thead>
                                <tr>
                                    {headers.map((header, index) => (
                                        <th key={index}>{header}</th>
                                    ))}
                                </tr>
                                </thead>

                                <tbody>
                                {rows.map((row, rowIndex) => (
                                    <tr key={rowIndex}>
                                        {row.map((cell, cellIndex) => (
                                            <td key={cellIndex}>
                                                {linkColumns && linkColumns.indexOf(headers[cellIndex]) > -1 ? (
                                                    <Link href={cell}>Link</Link>
                                                ) : (
                                                    cell
                                                )}
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Table;
