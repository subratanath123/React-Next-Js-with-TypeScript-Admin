'use client'

import React, {ChangeEvent, MouseEventHandler, useEffect, useState} from "react";
import TextArea from "@/components/TextArea";
import Form from "@/components/Form";
import Button from "@/components/Button";
import {useRouter} from "next/navigation";
import axios from "axios";
import Image from "@/components/Image";
import {getCookie} from "cookies-next";


export default function ReviewCreate() {
    const router = useRouter();

    const [state, setState] = useState<{
        aboutUsDetails: string;
        id: string;
        newPhotoList: File[];
        existingPhotoIdList: any[];
        deletedPhotoIdList: any[];
        submitting: boolean;
    }>({
        aboutUsDetails: '',
        id: '',
        newPhotoList: [],
        existingPhotoIdList: [],
        deletedPhotoIdList: [],
        submitting: true
    });

    useEffect(() => {
        axios
            .get('https://one-dollar-admin.onrender.com' + '/aboutus',
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
                    id: apiData.id,
                    aboutUsDetails: apiData.aboutUsDetails,
                    existingPhotoIdList: apiData.aboutUsPhotoIdList,
                }));

            })
            .catch((error) => {
                console.error('Aboutus Fetching failed:', error);
            });
    }, []);

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

        const newPhotoList = [...state.newPhotoList, e.target.files[0]];

        setState({
            ...state,
            newPhotoList: newPhotoList
        });
    };

    const handleExistingFileRemove = (e: React.MouseEvent<HTMLButtonElement>, index: number, deletedPhotoId: any) => {
        state.existingPhotoIdList.splice(index, 1);

        setState({
            ...state,
            existingPhotoIdList: state.existingPhotoIdList
        });

        const deletedPhotoIdList = [...state.deletedPhotoIdList, deletedPhotoId];

        setState({
            ...state,
            deletedPhotoIdList: deletedPhotoIdList
        });
    };

    const handleTransientFileRemove = (e: React.MouseEvent<HTMLButtonElement>, index: number) => {
        state.newPhotoList.splice(index, 1);

        setState({
            ...state,
            newPhotoList: state.newPhotoList
        });
    };

    const handleFormUpdate: MouseEventHandler<HTMLButtonElement> = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('id', state.id);
        formData.append('aboutUsDetails', state.aboutUsDetails);

        state.deletedPhotoIdList && state.deletedPhotoIdList.map((photoId) => {
            formData.append('deletedPhotoIdList', photoId);
        })

        state.newPhotoList.map((photo: any) => {
            formData.append('photoList', photo);
        })

        setState({
            ...state,
            submitting: true
        });

        axios
            .post('https://one-dollar-admin.onrender.com' + '/aboutus', formData,
                {
                    headers: {
                        'Authorization': 'Bearer ' + getCookie("__session")
                    }
                })
            .then((response) => {
                console.log('About us Created');

                const dataToSend = {
                    type: 'success',
                    title: 'Action Completed',
                    message: 'About us has been successfully saved',
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
            <Form title="About Us">
                <TextArea title="About Us details" value={state.aboutUsDetails} onTextChange={handleTextChange}
                          name="aboutUsDetails" submitting={state.submitting}/>

                <Image submitting={state.submitting}
                       imageDownloadUrl={`${'https://one-dollar-admin.onrender.com'}/aboutus/image`}
                       newOfferPhotoList={state.newPhotoList}
                       existingOfferPhotoIdList={state.existingPhotoIdList}
                       handleNewFileAdd={handleNewFileAdd}
                       handleExistingFileRemove={handleExistingFileRemove}
                       handleTransientFileRemove={handleTransientFileRemove}
                       canRemove={true}/>

                <Button buttonType="primary" name="Update" type="submit" onSubmit={handleFormUpdate}
                        submitting={state.submitting}/>
            </Form>
        </>
    )
}