'use client'

import React, {ChangeEvent, useState} from "react";
import TextArea from "@/components/TextArea";
import Form from "@/components/Form";
import Input from "@/components/Input";
import Button from "@/components/Button";

export default function ReviewEdit() {

    const [state, setState] = useState({
        name: '',
        details: '',
        review: '',
        photo: ''
    });


    const handleInputChange = (e:ChangeEvent<HTMLInputElement>) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        });
    };

    const handleTextChange = (e:ChangeEvent<HTMLTextAreaElement>) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        });
    };

    const handleFormSubmit = (e:ChangeEvent<HTMLButtonElement>) => {

    };

    return (
        <>
            <Form title="Edit Review">
                <Input title="Client Name" type="text" value={state.name} onInputChange={handleInputChange}/>
                <TextArea title="Client details" value={state.details} onTextChange={handleTextChange}/>
                <TextArea title="Client Review" value={state.review} onTextChange={handleTextChange}/>
                <Input title="Client Photo" type="file" value={state.photo} onInputChange={handleInputChange}/>
                <Button buttonType="primary" name="Update" type="submit" onSubmit={handleFormSubmit}/>
                &nbsp;
                <Button buttonType="danger" name="Delete" type="submit" onSubmit={handleFormSubmit}/>
            </Form>
        </>
    );
}