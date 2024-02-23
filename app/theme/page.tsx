'use client'

import React, {ChangeEvent, MouseEventHandler, useEffect, useState} from "react";
import TextArea from "@/components/TextArea";
import Form from "@/components/Form";
import Button from "@/components/Button";
import {useRouter} from "next/navigation";
import axios from "axios";
import Image from "@/components/Image";
import {backendserver} from "@/constants/Constants";

export default function Theme() {
    const router = useRouter();

    const [state, setState] = useState<{
        id: string,
        newPhotoList: File[],
        existingPhotoIdList: string[],
        deletedPhotoIdList: string[],
        submitting: boolean
    }>({
        id: '',
        newPhotoList: [],
        existingPhotoIdList: [],
        deletedPhotoIdList: [],
        submitting: true
    });

    useEffect(() => {
        axios
            .get(backendserver + '/theme')
            .then((response) => {
                const apiData = response.data;

                // Update state with the API data
                setState(prevState => ({
                    ...prevState,
                    submitting: false,
                    id: apiData.id,
                    existingPhotoIdList: apiData.aboutUsPhotoIdList,
                }));

            })
            .catch((error) => {
                console.error('Theme Fetching failed:', error);
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

        state.newPhotoList.map((photo) => {
            formData.append('photoList', photo);
        })

        setState({
            ...state,
            submitting: true
        });

        axios
            .post(backendserver + '/theme', formData)
            .then((response) => {
                console.log('About us Created');

                const dataToSend = {
                    type: 'success',
                    title: 'Action Completed',
                    message: 'Theme has been successfully saved',
                    additionalMessage: 'Please go back to do further action'
                };

                const queryString = new URLSearchParams(dataToSend).toString();

                router.push(`/done?${queryString}`);

            })
            .catch((error) => {

                setState({
                    ...state,
                    submitting: false
                });
            });
    };

    return (
        <>
            <Form title="Edit Site Theme">
                <Image submitting={state.submitting}
                       imageDownloadUrl={`${backendserver}/theme/image`}
                       newBannerPhotoList={state.newPhotoList}
                       existingBannerPhotoIdList={state.existingPhotoIdList}
                       handleNewFileAdd={handleNewFileAdd}
                       handleExistingFileRemove={handleExistingFileRemove}
                       handleTransientFileRemove={handleTransientFileRemove}/>

                <Button buttonType="primary" name="Update" type="submit" onSubmit={handleFormUpdate}
                        submitting={state.submitting}/>
            </Form>
        </>
    )
}