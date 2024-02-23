import React, {FC} from 'react';
import {CDBCardBody, CDBDataTable} from 'cdbreact';


interface TableProps {
    title?: string,
    columns: any;
    data: any;
    linkColumns?: string[]; // Optional array of links
}


const Table: FC<TableProps> = ({title, columns, data, linkColumns}) => {

    const tableData = () => {
        return {
            columns: columns,
            rows: data
        };
    };

    return (
        <section className="section dashboard">
            <div className="row">
                <div className="col-lg-12">
                    <div className="card">
                        <CDBCardBody>
                            <br></br>
                            <h2>{title}</h2>
                            <CDBDataTable
                                striped
                                bordered
                                noBottomColumns={true}
                                hover
                                tbodyColor="indigo"
                                dark={true}
                                entriesOptions={[5, 20, 25]}
                                entries={5}
                                pagesAmount={4}
                                data={tableData()}
                                materialSearch={true}
                            />
                        </CDBCardBody>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Table;
