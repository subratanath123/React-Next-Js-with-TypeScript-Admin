'use client'

import React, {ChangeEvent, MouseEventHandler, useState} from "react";
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
        clientName: string,
        clientDetails: string,
        clientReview: string,
        clientPhoto: string,
        stars: string,
        newClientPhotoList: File[],
        submitting: boolean
    }>({
        clientName: '',
        clientDetails: '',
        clientReview: '',
        clientPhoto: '',
        stars: '',
        newClientPhotoList: [],
        submitting: false
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

    const handleNewFileAdd = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) {
            console.error('No file selected');
            return;
        }

        const newPhotoList = [...state.newClientPhotoList, e.target.files[0]];

        setState({
            ...state,
            newClientPhotoList: newPhotoList
        });
    };

    const handleTransientFileRemove = (e: React.MouseEvent<HTMLButtonElement>, index: number) => {
        state.newClientPhotoList.splice(index, 1);

        setState({
            ...state,
            newClientPhotoList: state.newClientPhotoList
        });
    };


    const handleFormSubmit: MouseEventHandler<HTMLButtonElement> = (e) => {
        e.preventDefault();

        const formData = new FormData();

        formData.append('clientName', state.clientName);
        formData.append('clientDetails', state.clientDetails);
        formData.append('clientReview', state.clientReview);

        state.newClientPhotoList.map((photo) => {
            formData.append('clientPhotoList', photo);
        })

        formData.append('stars', state.stars);

        setState({
            ...state,
            submitting: true
        });

        axios
            .post('https://one-dollar-admin.onrender.com' + '/review/create/exceptOnlineGame', formData,
                {
                    headers: {
                        'Authorization': 'Bearer ' + getCookie("__session")
                    }
                })
            .then((response) => {
                console.log('Banner Created');

                const dataToSend = {
                    type: 'success',
                    title: 'Action Completed',
                    message: 'Review has been successfully saved',
                    additionalMessage: 'Please go back to do further action'
                };

                const queryString = new URLSearchParams(dataToSend).toString();

                router.push(`/done?${queryString}`);

            })
            .catch((error) => {
                console.error('Review Creation failed:', error);

                setState({
                    ...state,
                    submitting: false
                });
            });
    };

    return (
        <>
            <Form title="Add Review">
                <Input title="Client Name" type="text" value={state.clientName} onInputChange={handleInputChange}
                       name="clientName" submitting={state.submitting}/>

                <TextArea title="Client details" value={state.clientDetails} onTextChange={handleTextChange}
                          name="clientDetails" submitting={state.submitting}/>

                <TextArea title="Client Review" value={state.clientReview} onTextChange={handleTextChange}
                          name="clientReview" submitting={state.submitting}/>

                <Image submitting={state.submitting}
                       imageDownloadUrl={`${'https://one-dollar-admin.onrender.com'}/review/image`}
                       newOfferPhotoList={state.newClientPhotoList}
                       existingOfferPhotoIdList={[]}
                       canRemove={true}
                       handleNewFileAdd={handleNewFileAdd}
                       handleExistingFileRemove={(e, index) => {}}
                       handleTransientFileRemove={handleTransientFileRemove}/>

                <Input title="Stars" type="number" value={state.stars} onInputChange={handleInputChange}
                       name="stars" submitting={state.submitting}/>

                <Button buttonType="primary" name="Create" type="submit" onSubmit={handleFormSubmit}
                        submitting={state.submitting}/>
            </Form>
        </>
    );
}