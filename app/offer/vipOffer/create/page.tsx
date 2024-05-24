'use client'

import React, {ChangeEvent, MouseEventHandler, useState} from "react";
import Form from "@/components/Form";
import Input from "@/components/Input";
import Button from "@/components/Button";
import InputSelect from "@/components/InputSelect";
import {offerTypeOptions} from "@/constants/OfferOptions";
import {useRouter} from "next/navigation";
import axios from "axios";
import Image from "@/components/Image";
import {ErrorResponse, FormError, FormState, initialError, initialState} from "@/constants/Constants";
import {getCookie} from "cookies-next";


export default function CreateVipOffer() {
    const router = useRouter();

    const [state, setState] = useState<{ validated: boolean, formState: FormState, formError: FormError }>({
        validated: false,
        formState: {...initialState, offerCategory: 'VipOffer', offerType: 'CasinoOffer'},
        formError: initialError
    });

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setState(prevState => ({
                ...prevState,
                formState: {
                    ...prevState.formState,
                    [e.target.name]: e.target.value
                }
            }
        ));
    }

    const handleOptionSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setState(prevState => ({
                ...prevState,
                formState: {
                    ...prevState.formState,
                    [e.target.name]: e.target.value
                }
            }
        ));
    }

    const handleNewFileAdd = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) {
            console.error('No file selected');
            return;
        }

        const newPhotoList = [...state.formState.photoList, e.target.files[0]];

        setState(prevState => ({
                ...prevState,
                formState: {
                    ...prevState.formState,
                    photoList: newPhotoList
                }
            }
        ));
    };

    const handleTransientFileRemove = (e: React.MouseEvent<HTMLButtonElement>, index: number) => {
        state.formState.photoList.splice(index, 1);

        setState(prevState => ({
                ...prevState,
                formState: {
                    ...prevState.formState,
                    photoList: state.formState.photoList
                }
            }
        ));
    };

    const handleTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setState(prevState => ({
                ...prevState,
                formState: {
                    ...prevState.formState,
                    [e.target.name]: e.target.value
                }
            }
        ));
    };

    const handleFormSubmit: MouseEventHandler<HTMLButtonElement> = (e) => {
        e.preventDefault();

        const formData = new FormData();

        formData.append('link', state.formState.link);
        formData.append('order', state.formState.order);
        formData.append('buttonName', state.formState.buttonName);

        state.formState.photoList.map((photo) => {
            formData.append('photoList', photo);
        })

        formData.append('validityFrom', state.formState.validityFrom);
        formData.append('validityTo', state.formState.validityTo);
        formData.append('details', state.formState.details);
        formData.append('title', state.formState.title);
        formData.append('subtitle', state.formState.subtitle);
        formData.append('offerCategory', state.formState.offerCategory);
        formData.append('offerType', state.formState.offerType);

        setState(prevState => ({
            ...prevState,
            formError: initialError,
            formState: {...prevState.formState, submitting: true}
        }));

        axios
            .post('https://one-dollar-admin.onrender.com' + '/offer/create/exceptOnlineGame', formData,
                {
                    headers: {
                        'Authorization': 'Bearer ' + getCookie("__session")
                    }
                })
            .then((response) => {
                console.log('General Offer Created');

                const dataToSend = {
                    type: 'success',
                    title: 'Action Completed',
                    message: 'Vip Offer has been successfully saved',
                    additionalMessage: 'Please go back to do further action'
                };
                const queryString = new URLSearchParams(dataToSend).toString();

                router.push(`/done?${queryString}`);

            })
            .catch((error) => {
                console.error('Vip Offer Creation failed:', error);

                error.response.data.errorMessage.map((error: ErrorResponse) => {
                    setState(prevState => ({
                            ...prevState,
                            formError: {
                                ...prevState.formError,
                                [error.fieldName]: error.messageError
                            }
                        }
                    ));
                })

                setState(prevState => ({
                    ...prevState,
                    validated: true,
                    formState: {...prevState.formState, submitting: false}
                }));
            });
    };

    return (
        <>
            <Form title="Create Vip Offer" validated={state.validated}>
                <Input name="link" title="Affiliation Link" type="text" value={state.formState.link}
                       submitting={state.formState.submitting}
                       errors={state.formError.link}
                       onInputChange={handleInputChange}
                       required={true}/>

                <InputSelect name="offerCategory" label="Offer Category" options={[
                    {value: 'VipOffer', label: 'Vip Offer'}]}
                             submitting={state.formState.submitting} value={state.formState.offerCategory}
                             errors={state.formError.offerCategory}
                             handleOptionSelect={handleOptionSelectChange}/>

                <InputSelect name="offerType" label="Offer Type" options={offerTypeOptions}
                             submitting={state.formState.submitting} value={state.formState.offerType}
                             errors={state.formError.offerType}
                             handleOptionSelect={handleOptionSelectChange}/>

                <Input name="details" title="Promotion Line" type="text" value={state.formState.details}
                       submitting={state.formState.submitting}
                       onInputChange={handleInputChange}
                       errors={state.formError.details}
                       required={true}/>

                <Input name="title" title="Offer Title" type="text" value={state.formState.title}
                       submitting={state.formState.submitting}
                       onInputChange={handleInputChange}
                       errors={state.formError.title}
                       required={true}/>

                <Input name="subtitle" title="Offer Subtitle" type="text" value={state.formState.subtitle}
                       submitting={state.formState.submitting}
                       onInputChange={handleInputChange}
                       errors={state.formError.subtitle}
                       required={true}/>

                <Input name="order" title="Offer Order" type="number" value={state.formState.order}
                       submitting={state.formState.submitting}
                       onInputChange={handleInputChange}
                       errors={state.formError.order}
                       required={true}/>

                <Input name="buttonName" title="Claim Button Name" type="text" value={state.formState.buttonName}
                       submitting={state.formState.submitting}
                       onInputChange={handleInputChange}
                       errors={state.formError.buttonName}
                       required={true}/>

                <Image submitting={state.formState.submitting}
                       imageDownloadUrl={`${'https://one-dollar-admin.onrender.com'}/offer/image`}
                       newOfferPhotoList={state.formState.photoList}
                       existingOfferPhotoIdList={[]}
                       errors={state.formError.photoList}
                       handleNewFileAdd={handleNewFileAdd}
                       handleExistingFileRemove={(e, index) => {}}
                       handleTransientFileRemove={(e, index) => {}}
                       canRemove={false}/>

                <Input name="validityFrom" title="Offer Validity From" type="date" value={state.formState.validityFrom}
                       submitting={state.formState.submitting}
                       onInputChange={handleInputChange}
                       errors={state.formError.validityFrom}/>

                <Input name="validityTo" title="Offer Validity To" type="date" value={state.formState.validityTo}
                       submitting={state.formState.submitting}
                       errors={state.formError.validityTo}
                       onInputChange={handleInputChange}/>

                <Button buttonType="primary" name="Create" type="submit" onSubmit={handleFormSubmit}
                        submitting={state.formState.submitting}/>
            </Form>
        </>
    );
}

