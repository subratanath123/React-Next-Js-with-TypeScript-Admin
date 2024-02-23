import React, {FC, ChangeEvent, MouseEventHandler} from 'react';

interface SpinnerProps {
    submitting: boolean
}

const Spinner: FC<SpinnerProps> = ({submitting}) => {

    return (
        <>
            {submitting
                ?
                <div className="card">
                    <div className="card-body">
                        <div className="spinner-grow" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                </div>
                : ''
            }

        </>
    );
};

export default Spinner;
