'use client'

import React, {ChangeEvent, MouseEventHandler, useState} from "react";
import Form from "@/components/Form";
import Input from "@/components/Input";
import Button from "@/components/Button";
import InputSelect from "@/components/InputSelect";
import {bannerCategoryOptions, offerTypeOptions} from "@/constants/BannerCategoryOptions";
import {useRouter} from "next/navigation";
import axios from "axios";
import Image from "@/components/Image";


export default function CreateVipOffer() {
    const router = useRouter();

    const [state, setState] = useState<{
        submitting: boolean,
        link: string,
        order: string,
        buttonName: string,
        newBannerPhotoList: File[],
        validityFrom: string,
        validityTo: string,
        bannerDetails: string,
        bannerSubtitle: string,
        bannerCategory: string,
        offerCategory: string

    }>({
        order: '',
        submitting: false,
        link: '',
        buttonName: '',
        newBannerPhotoList: [],
        validityFrom: '',
        validityTo: '',
        bannerDetails: '',
        bannerSubtitle: '',
        bannerCategory: 'SlideBanner',
        offerCategory: 'VipOffer'
    });

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


    const handleFormSubmit: MouseEventHandler<HTMLButtonElement> = (e) => {
        e.preventDefault();

        const formData = new FormData();

        formData.append('link', state.link);
        formData.append('order', state.order);
        formData.append('buttonName', state.buttonName);

        state.newBannerPhotoList.map((photo) => {
            formData.append('photoList', photo);
        })

        formData.append('validityFrom', state.validityFrom);
        formData.append('validityTo', state.validityTo);
        formData.append('bannerDetails', state.bannerDetails);
        formData.append('bannerCategory', state.bannerCategory);
        formData.append('bannerSubtitle', state.bannerSubtitle);
        formData.append('offerCategory', state.offerCategory);

        setState({
            ...state,
            submitting: true
        });

        axios
            .post('https://one-dollar-admin.onrender.com' + '/banner/create', formData)
            .then((response) => {
                console.log('Banner Created');

                const dataToSend = {
                    type: 'success',
                    title: 'Action Completed',
                    message: 'Banner has been successfully saved',
                    additionalMessage: 'Please go back to do further action'
                };
                const queryString = new URLSearchParams(dataToSend).toString();

                router.push(`/done?${queryString}`);

            })
            .catch((error) => {
                console.error('Banner Creation failed:', error);

                setState({
                    ...state,
                    submitting: false
                });
            });
    };

    return (
        <>
            <Form title="Create Banner">
                <Input name="link" title="Affiliation Link" type="text" value={state.link} submitting={state.submitting}
                       onInputChange={handleInputChange}/>

                <InputSelect name="bannerCategory" label="Banner Category" options={[
                    {value: 'Vip Offer', label: 'Vip Offer'}]}
                             submitting={state.submitting} value={state.bannerCategory}
                             handleOptionSelect={handleOptionSelectChange}/>

                <InputSelect name="offerCategory" label="Offer Type" options={offerTypeOptions}
                             submitting={state.submitting} value={state.offerCategory}
                             handleOptionSelect={handleOptionSelectChange}/>

                <Input name="bannerDetails" title="Banner Details" type="text" value={state.bannerDetails} submitting={state.submitting}
                       onInputChange={handleInputChange}/>

                <Input name="bannerSubtitle" title="Banner Subtitle" type="text" value={state.bannerSubtitle} submitting={state.submitting}
                       onInputChange={handleInputChange}/>

                <Input name="order" title="Banner Order" type="text" value={state.order} submitting={state.submitting}
                       onInputChange={handleInputChange}/>

                <Input name="buttonName" title="Claim Button Name" type="text" value={state.buttonName}
                       submitting={state.submitting}
                       onInputChange={handleInputChange}/>

                <Image submitting={state.submitting}
                       imageDownloadUrl={`${'https://one-dollar-admin.onrender.com'}/banner/image`}
                       newBannerPhotoList={state.newBannerPhotoList}
                       existingBannerPhotoIdList={[]}
                       handleNewFileAdd={handleNewFileAdd}
                       handleExistingFileRemove={(e, index) => {}}
                       handleTransientFileRemove={handleTransientFileRemove}/>

                <Input name="validityFrom" title="Banner Validity From" type="date" value={state.validityFrom}
                       submitting={state.submitting}
                       onInputChange={handleInputChange}/>

                <Input name="validityTo" title="Banner Validity To" type="date" value={state.validityTo}
                       submitting={state.submitting}
                       onInputChange={handleInputChange}/>

                <Button buttonType="primary" name="Create" type="submit" onSubmit={handleFormSubmit}
                        submitting={state.submitting}/>
            </Form>
        </>
    );
}

