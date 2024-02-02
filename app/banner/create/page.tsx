'use client'

import React, {ChangeEvent, useState} from "react";
import TextArea from "@/components/TextArea";
import Form from "@/components/Form";
import Input from "@/components/Input";
import Button from "@/components/Button";
import InputSelect from "@/components/InputSelect";

import {bannerCategory} from "@/constants/BannerCategory";

export default function BannerCreate() {

    const [state, setState] = useState({
        link: '',
        order: '',
        buttonName: '',
        photo: '',
        validityFrom: '',
        validityTo: '',
        bannerDetails: '',
        bannerCategory: ''
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
            <Form title="Create Banner">
                <Input name="link" title="Affiliation Link" type="text" value={state.link} onInputChange={handleInputChange}/>
                <InputSelect name="bannerCategory" label="Banner Category" options={bannerCategory} />
                <Input name="order" title="Banner Order" type="text" value={state.order} onInputChange={handleInputChange}/>
                <Input name="buttonName" title="Claim Button Name" type="text" value={state.buttonName} onInputChange={handleInputChange}/>
                <Input name="photo" title="Banner Photo" type="file" value={state.photo} onInputChange={handleInputChange}/>
                <Input name="validityFrom" title="Banner Validity From" type="date" value={state.validityFrom} onInputChange={handleInputChange}/>
                <Input name="validityTo" title="Banner Validity To" type="date" value={state.validityTo} onInputChange={handleInputChange}/>
                <TextArea title="Banner details" value={state.bannerDetails} onTextChange={handleTextChange}/>
                <Button buttonType="primary" name="Create" type="submit" onSubmit={handleFormSubmit}/>
            </Form>
        </>
    );
}