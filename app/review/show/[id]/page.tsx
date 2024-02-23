'use client'

import React, {ChangeEvent, MouseEventHandler, useEffect, useState} from "react";
import TextArea from "@/components/TextArea";
import Form from "@/components/Form";
import Input from "@/components/Input";
import Button from "@/components/Button";
import Image from "@/components/Image";
import axios from "axios";
import {useRouter} from "next/navigation";


export default function ReviewEdit({params}: { params: { id: string } }) {
    const router = useRouter();
    const reviewId = params.id;

    const [state, setState] = useState<{
        clientName: string,
        clientDetails: string,
        clientReview: string,
        clientPhoto: string,
        stars: string,
        deleted: boolean,
        newClientPhotoList: File[],
        existingClientPhotoIdList: string[],
        deletedPhotoIdList: string[],
        submitting: boolean
    }>({
        clientName: '',
        clientDetails: '',
        clientReview: '',
        clientPhoto: '',
        stars: '',
        deleted: false,
        newClientPhotoList: [],
        existingClientPhotoIdList: [],
        deletedPhotoIdList: [],
        submitting: true
    });

    useEffect(() => {
        axios
            .get('https://one-dollar-admin.onrender.com' + '/review/show/' + reviewId)
            .then((response) => {
                const apiData = response.data;

                // Update state with the API data
                setState(prevState => ({
                    ...prevState,
                    submitting: false,
                    deleted: apiData.deleted,
                    clientDetails: apiData.clientDetails,
                    clientReview: apiData.clientReview,
                    clientName: apiData.clientName,
                    existingClientPhotoIdList: apiData.clientPhotoIdList,
                    stars: apiData.stars,
                }));

            })
            .catch((error) => {
                console.error('Review Fetching failed:', error);
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

    const handleExistingFileRemove = (e: React.MouseEvent<HTMLButtonElement>, index: number, deletedPhotoId: any) => {
        state.existingClientPhotoIdList.splice(index, 1);

        setState({
            ...state,
            existingClientPhotoIdList: state.existingClientPhotoIdList
        });

        const deletedPhotoIdList = [...state.deletedPhotoIdList, deletedPhotoId];

        setState({
            ...state,
            deletedPhotoIdList: deletedPhotoIdList
        });
    };

    const handleTransientFileRemove = (e: React.MouseEvent<HTMLButtonElement>, index: number) => {
        state.newClientPhotoList.splice(index, 1);

        setState({
            ...state,
            newClientPhotoList: state.newClientPhotoList
        });
    };

    const handleFormDelete: MouseEventHandler<HTMLButtonElement> = (e) => {
        e.preventDefault();

        axios
            .post('https://one-dollar-admin.onrender.com' + '/review/delete/' + reviewId)
            .then(() => {
                console.log('Review Deleted');

                const dataToSend = {
                    type: 'success',
                    title: 'Action Completed',
                    message: 'Review has been successfully deleted',
                    additionalMessage: 'Please go back to do further action'
                };

                const queryString = new URLSearchParams(dataToSend).toString();

                router.push(`/done?${queryString}`);

            })
            .catch((error: any) => {
                console.error('Review Deletion failed:', error);

                setState({
                    ...state,
                    submitting: false
                });
            });
    };

    const handleFormUpdate: MouseEventHandler<HTMLButtonElement> = (e) => {
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
            .post('https://one-dollar-admin.onrender.com' + '/review/create', formData)
            .then((response) => {
                console.log('Review Created');

                const dataToSend = {
                    type: 'success',
                    title: 'Action Completed',
                    message: 'Review has been successfully saved',
                    additionalMessage: 'Please go back to do further action'
                };

                console.log(dataToSend);

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
            <Form title="Edit Review">

                {state.deleted
                    ?
                    <div className="alert alert-danger alert-dismissible fade show" role="alert">
                        <i className="bi bi-exclamation-octagon me-1"></i>
                        You are seeing a deleted Form
                        <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                    </div>
                    : ""
                }

                <Input title="Client Name" type="text" value={state.clientName} onInputChange={handleInputChange}
                       name="clientName" submitting={state.submitting}/>

                <TextArea title="Client details" value={state.clientDetails} onTextChange={handleTextChange}
                          name="clientDetails" submitting={state.submitting}/>

                <TextArea title="Client Review" value={state.clientReview} onTextChange={handleTextChange}
                          name="clientReview" submitting={state.submitting}/>

                <Image submitting={state.submitting}
                       imageDownloadUrl={`${'https://one-dollar-admin.onrender.com'}/review/image`}
                       newBannerPhotoList={state.newClientPhotoList}
                       existingBannerPhotoIdList={state.existingClientPhotoIdList}
                       handleNewFileAdd={handleNewFileAdd}
                       handleExistingFileRemove={handleExistingFileRemove}
                       handleTransientFileRemove={handleTransientFileRemove}/>

                <Input title="Stars" type="number" value={state.stars} onInputChange={handleInputChange}
                       name="stars" submitting={state.submitting}/>
                {
                    state.deleted
                        ?
                        ""
                        :
                        <>
                            <Button buttonType="primary" name="Update" type="submit" onSubmit={handleFormUpdate}
                                    submitting={state.submitting}/>
                            &nbsp;
                            <Button buttonType="danger" name="Delete" type="submit" onSubmit={handleFormDelete}
                                    submitting={state.submitting}/>
                        </>
                }
            </Form>
        </>
    );
}
