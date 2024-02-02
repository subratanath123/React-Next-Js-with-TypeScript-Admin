import React, {FC, ChangeEvent, ReactNode} from 'react';

interface FormProps {
    title: ReactNode;
    children: ReactNode;
}

const Form: FC<FormProps> = (props) => {

    return (
        <>
            <section className="section">
                <div className="row">
                    <div className="col-lg-1"/>
                    <div className="col-lg-10">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">{props.title}</h5>
                                <form>
                                    {props.children}
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-1"/>
                </div>
            </section>
        </>
    );
};

export default Form;
