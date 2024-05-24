'use client'

import React, {ChangeEvent, MouseEventHandler, useEffect, useState} from "react";
import TextArea from "@/components/TextArea";
import Form from "@/components/Form";
import Input from "@/components/Input";
import Button from "@/components/Button";
import Image from "@/components/Image";
import axios from "axios";
import {useRouter} from "next/navigation";
import {getCookie} from "cookies-next";


export default function ReviewCreate() {
    const router = useRouter();

    const [state, setState] = useState<{
        fbLink: string,
        twitterLink: string,
        instagramLink: string,
        whatsappLink: string
        submitting: boolean
    }>({
        fbLink: '',
        twitterLink: '',
        instagramLink: '',
        whatsappLink: '',
        submitting: false
    });

    useEffect(() => {
        axios
            .get('https://one-dollar-admin.onrender.com' + '/social',
                {
                    headers: {
                        'Authorization': 'Bearer ' + getCookie("__session")
                    }
                })
            .then((response) => {
                const apiData = response.data;

                // Update state with the API data
                setState(prevState => ({
                    ...prevState,
                    submitting: false,
                    fbLink: apiData.fbLink,
                    twitterLink: apiData.twitterLink,
                    whatsappLink: apiData.whatsappLink,
                    instagramLink: apiData.instagramLink,
                }));

            })
            .catch((error) => {
                console.error('Social info Fetching failed:', error);
            });
    }, [state]);

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

    const handleFormSubmit: MouseEventHandler<HTMLButtonElement> = (e) => {
        e.preventDefault();

        const formData = new FormData();

        formData.append('fbLink', state.fbLink);
        formData.append('twitterLink', state.twitterLink);
        formData.append('instagramLink', state.instagramLink);
        formData.append('whatsappLink', state.whatsappLink);

        setState({
            ...state,
            submitting: true
        });

        axios
            .post('https://one-dollar-admin.onrender.com' + '/social', formData,
                {
                    headers: {
                        'Authorization': 'Bearer ' + getCookie("__session")
                    }
                })
            .then((response) => {
                console.log('Social Info Created');

                const dataToSend = {
                    type: 'success',
                    title: 'Action Completed',
                    message: 'Social Info has been successfully saved',
                    additionalMessage: 'Please go back to do further action'
                };

                const queryString = new URLSearchParams(dataToSend).toString();

                router.push(`/done?${queryString}`);

            })
            .catch((error) => {
                console.error('Social Info Creation failed:', error);

                setState({
                    ...state,
                    submitting: false
                });
            });
    };

    return (
        <>
            <Form title="Add Social Information">
                <Input title="Facebook Link"
                       type="text"
                       value={state.fbLink}
                       onInputChange={handleInputChange}
                       name="fbLink"
                       submitting={state.submitting}/>

                <Input title="Instagram Link"
                       type="text"
                       value={state.instagramLink}
                       onInputChange={handleInputChange}
                       name="instagramLink"
                       submitting={state.submitting}/>

                <Input title="Twitter Link"
                       type="text"
                       value={state.twitterLink}
                       onInputChange={handleInputChange}
                       name="twitterLink"
                       submitting={state.submitting}/>

                <Input title="Whatsapp Link"
                       type="text"
                       value={state.whatsappLink}
                       onInputChange={handleInputChange}
                       name="whatsappLink"
                       submitting={state.submitting}/>

                <Button buttonType="primary" name="Create" type="submit" onSubmit={handleFormSubmit}
                        submitting={state.submitting}/>
            </Form>
        </>
    );
}