// components/TextArea.tsx
import React, { FC, ChangeEvent } from 'react';

interface TextAreaProps {
    title: string;
    value: string;
    onTextChange: (value: ChangeEvent<HTMLTextAreaElement>) => void;
}

const TextArea: FC<TextAreaProps> = ({ title, value, onTextChange }) => {
    const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        onTextChange(e);
    };

    return (
        <>
            <div className="row mb-3">
                <label htmlFor="inputPassword" className="col-sm-2 col-form-label">{title}</label>
                <div className="col-sm-10">
                    <textarea className="form-control" style={{height: '100px'}} onChange={handleChange}>{value}</textarea>
                </div>
            </div>


            {/*<section className="section">*/}
            {/*    <div className="row">*/}
            {/*        <div className="col-lg-6">*/}
            {/*            <div className="card">*/}
            {/*                <div className="card-body">*/}
            {/*                    <h5 className="card-title">{title}</h5>*/}

            {/*                    <div className="quill-editor-default">*/}
            {/*                        <textarea value={initialValue} onChange={handleChange} />*/}
            {/*                    </div>*/}
            {/*                </div>*/}
            {/*            </div>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*</section>*/}
        </>
    );
};

export default TextArea;
