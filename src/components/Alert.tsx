import React, {FC} from 'react';

interface AlertProps {
    title: string;
    message: string;
    additionalMessage: string;
    type: "success" | "danger" | "warning" | string;
}

const Alert: FC<AlertProps> = ({title, message, type, additionalMessage}) => {

    return (
        <>
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">{title}</h5>

                    <div className={`alert alert-success alert-dismissible fade show ${type}`} role="alert">
                        <h4 className="alert-heading">
                            {message}
                        </h4>

                        <p></p>

                        <hr/>

                        <p className="mb-0">
                            {additionalMessage}
                        </p>

                        <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                    </div>

                </div>
            </div>
        </>
    );
};

export default Alert;