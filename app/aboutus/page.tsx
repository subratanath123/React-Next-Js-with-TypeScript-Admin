'use client'

import React, {ChangeEvent, useState} from "react";
import TextArea from "@/components/TextArea";
import Form from "@/components/Form";
import Input from "@/components/Input";
import Button from "@/components/Button";

export default function ReviewCreate() {

    const [state, setState] = useState({
        details: '',
        photo: ''
    });


    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        });
    };

    const handleTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        });
    };

    const handleFormSubmit = (e: ChangeEvent<HTMLButtonElement>) => {

    };

    return (
        <>
            <Form title="About Us">
                <TextArea title="About Us details" value={state.details} onTextChange={handleTextChange}/>
                <Input name="Photo" title="Photo" type="file" value={state.photo} onInputChange={handleInputChange}/>
                <Button buttonType="primary" name="Update" type="submit" onSubmit={handleFormSubmit}/>
            </Form>
        </>
    );
}