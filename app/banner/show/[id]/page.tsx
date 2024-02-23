'use client'

import React, {ChangeEvent, MouseEventHandler, useEffect, useState} from "react";
import Form from "@/components/Form";
import Input from "@/components/Input";
import Button from "@/components/Button";
import InputSelect from "@/components/InputSelect";
import {bannerCategoryOptions, offerTypeOptions} from "@/constants/BannerCategoryOptions";
import {useRouter} from "next/navigation";
import axios from "axios";
import Image from "@/components/Image";

export default function ShowBanner({params}: { params: { id: string } }) {
    const router = useRouter();
    const bannerId = params.id;

    const [state, setState] = useState<{
        submitting: boolean,
        link: string,
        order: string,
        deleted: boolean,
        buttonName: string,
        photoList: File[],
        deletedPhotoIdList: string[],
        existingBannerPhotoIdList: string[],
        newBannerPhotoList: File[],
        validityFrom: string,
        validityTo: string,
        bannerDetails: string,
        bannerCategory: string,
        offerCategory: string
    }>({
        submitting: true,
        link: '',
        order: '',
        deleted: false,
        buttonName: '',
        photoList: [],
        deletedPhotoIdList: [],
        existingBannerPhotoIdList: [],
        newBannerPhotoList: [],
        validityFrom: '',
        validityTo: '',
        bannerDetails: '',
        bannerCategory: 'SlideBanner',
        offerCategory: 'CasinoOffer'
    });

    useEffect(() => {
        axios
            .get(process.env.backendserver + '/banner/show/' + bannerId)
            .then((response) => {
                const apiData = response.data;

                // Update state with the API data
                setState(prevState => ({
                    ...prevState,
                    submitting: false,
                    link: apiData.link,
                    order: apiData.order,
                    deleted: apiData.deleted,
                    buttonName: apiData.buttonName,
                    existingBannerPhotoIdList: apiData.bannerPhotoIdList,
                    validityFrom: apiData.validityFrom,
                    validityTo: apiData.validityTo,
                    bannerDetails: apiData.bannerDetails,
                    bannerCategory: apiData.bannerCategory,
                    offerCategory: apiData.offerCategory
                }));

            })
            .catch((error) => {
                console.error('Banner Fetching failed:', error);
            });
    }, []);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        });
    }

    const handleOptionSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        });
    }

    const handleNewFileAdd = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) {
            console.error('No file selected');
            return;
        }

        const newPhotoList = [...state.newBannerPhotoList, e.target.files[0]];

        setState({
            ...state,
            newBannerPhotoList: newPhotoList
        });
    };

    const handleExistingFileRemove = (e: React.MouseEvent<HTMLButtonElement>, index: number, deletedPhotoId: any) => {
        state.existingBannerPhotoIdList.splice(index, 1);

        setState({
            ...state,
            existingBannerPhotoIdList: state.existingBannerPhotoIdList
        });

        const deletedPhotoIdList = [...state.deletedPhotoIdList, deletedPhotoId];

        setState({
            ...state,
            deletedPhotoIdList: deletedPhotoIdList
        });
    };

    const handleTransientFileRemove = (e: React.MouseEvent<HTMLButtonElement>, index: number) => {
        state.newBannerPhotoList.splice(index, 1);

        setState({
            ...state,
            newBannerPhotoList: state.newBannerPhotoList
        });
    };

    const handleTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        });
    };

    const handleFormUpdate: MouseEventHandler<HTMLButtonElement> = (e) => {
        e.preventDefault();

        const formData = new FormData();

        formData.append('link', state.link);
        formData.append('order', state.order);
        formData.append('buttonName', state.buttonName);

        state.newBannerPhotoList && state.newBannerPhotoList.map((photo) => {
            formData.append('photoList', photo);
        })

        state.deletedPhotoIdList && state.deletedPhotoIdList.map((photoId) => {
            formData.append('deletedPhotoIdList', photoId);
        })

        formData.append('validityFrom', state.validityFrom);
        formData.append('validityTo', state.validityTo);
        formData.append('bannerDetails', state.bannerDetails);
        formData.append('bannerCategory', state.bannerCategory);
        formData.append('offerCategory', state.offerCategory);

        setState({
            ...state,
            submitting: true
        });

        axios
            .post(process.env.backendserver + '/banner/show/' + bannerId, formData)
            .then(() => {
                console.log('Banner Updated');

                const dataToSend = {
                    type: 'success',
                    title: 'Action Completed',
                    message: 'Banner has been successfully updated',
                    additionalMessage: 'Please go back to do further action'
                };
                const queryString = new URLSearchParams(dataToSend).toString();

                router.push(`/done?${queryString}`);

            })
            .catch((error: any) => {
                console.error('Banner Creation failed:', error);

                setState({
                    ...state,
                    submitting: false
                });
            });
    };

    const handleFormDelete: MouseEventHandler<HTMLButtonElement> = (e) => {
        e.preventDefault();

        axios
            .post(process.env.backendserver + '/banner/delete/' + bannerId)
            .then(() => {
                console.log('Banner Deleted');

                const dataToSend = {
                    type: 'success',
                    title: 'Action Completed',
                    message: 'Banner has been successfully deleted',
                    additionalMessage: 'Please go back to do further action'
                };

                const queryString = new URLSearchParams(dataToSend).toString();

                router.push(`/done?${queryString}`);

            })
            .catch((error: any) => {
                console.error('Banner Deletion failed:', error);

                setState({
                    ...state,
                    submitting: false
                });
            });
    };

    return (
        <>
            <Form title="Edit Banner">
                {state.deleted
                    ?
                    <div className="alert alert-danger alert-dismissible fade show" role="alert">
                        <i className="bi bi-exclamation-octagon me-1"></i>
                        You are seeing a deleted Form
                        <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                    </div>
                    : ""
                }
                <Input name="link" title="Affiliation Link" type="text" value={state.link} submitting={state.submitting}
                       onInputChange={handleInputChange}/>

                <InputSelect name="bannerCategory" label="Banner Category" options={bannerCategoryOptions}
                             submitting={state.submitting} value={state.bannerCategory}
                             handleOptionSelect={handleOptionSelectChange}/>

                <InputSelect name="offerCategory" label="Offer Type" options={offerTypeOptions}
                             submitting={state.submitting} value={state.offerCategory}
                             handleOptionSelect={handleOptionSelectChange}/>

                <Input name="order" title="Banner Order" type="text" value={state.order} submitting={state.submitting}
                       onInputChange={handleInputChange}/>

                <Input name="buttonName" title="Claim Button Name" type="text" value={state.buttonName}
                       submitting={state.submitting}
                       onInputChange={handleInputChange}/>

                <Image submitting={state.submitting}
                       imageDownloadUrl={`${process.env.backendserver}/banner/image`}
                       newBannerPhotoList={state.newBannerPhotoList}
                       existingBannerPhotoIdList={state.existingBannerPhotoIdList}
                       handleNewFileAdd={handleNewFileAdd}
                       handleExistingFileRemove={handleExistingFileRemove}
                       handleTransientFileRemove={handleTransientFileRemove}/>

                <Input name="validityFrom" title="Banner Validity From" type="date" value={state.validityFrom}
                       submitting={state.submitting}
                       onInputChange={handleInputChange}/>

                <Input name="validityTo" title="Banner Validity To" type="date" value={state.validityTo}
                       submitting={state.submitting}
                       onInputChange={handleInputChange}/>

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

