'use client'

import React, {ChangeEvent, MouseEventHandler, useEffect, useState} from "react";
import Form from "@/components/Form";
import Input from "@/components/Input";
import Button from "@/components/Button";
import InputSelect from "@/components/InputSelect";
import {offerOptions, offerTypeOptions} from "@/constants/OfferOptions";
import {useRouter} from "next/navigation";
import axios from "axios";
import Image from "@/components/Image";
import {countries, ErrorResponse, FormError, FormState, initialError, initialState} from "@/constants/Constants";
import {getCookie} from "cookies-next";


export default function ShowOffer({params}: { params: { id: string } }) {
    const router = useRouter();
    const offerId = params.id;

    const [state, setState] = useState<{ validated: boolean, formState: FormState, formError: FormError }>({
        validated: false,
        formState: initialState,
        formError: initialError
    });

    useEffect(() => {
        axios
            .get('https://one-dollar-admin.onrender.com' + '/offer/show/' + offerId,
                {
                    headers: {
                        'Authorization': 'Bearer ' + getCookie("__session")
                    }
                })
            .then((response) => {
                const apiData = response.data;

                setState(prevState => ({
                        ...prevState,
                        formState: {
                            ...prevState.formState,
                            submitting: false,
                            link: apiData.link,
                            title: apiData.title,
                            order: apiData.order,
                            deleted: apiData.deleted,
                            buttonName: apiData.buttonName,
                            existingOfferPhotoIdList: apiData.photoIdList,
                            validityFrom: apiData.validityFrom,
                            validityTo: apiData.validityTo,
                            details: apiData.details,
                            subtitle: apiData.subtitle,
                            offerCategory: apiData.offerCategory,
                            offerType: apiData.offerType,
                            country: apiData.country,
                        }
                    }
                ));

            })
            .catch((error) => {
                console.error('Offer Fetching failed:', error);
            });
    }, []);

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

        const newPhotoList = [...state.formState.newOfferPhotoList || [], e.target.files[0]];

        setState(prevState => ({
                ...prevState,
                formState: {
                    ...prevState.formState,
                    newOfferPhotoList: newPhotoList
                }
            }
        ));
    };

    const handleExistingFileRemove = (e: React.MouseEvent<HTMLButtonElement>, index: number, deletedPhotoId: any) => {
        state.formState.existingOfferPhotoIdList?.splice(index, 1);

        setState(prevState => ({
                ...prevState,
                formState: {
                    ...prevState.formState,
                    existingOfferPhotoIdList: state.formState.existingOfferPhotoIdList
                }
            }
        ));

        const deletedPhotoIdList = [...state.formState.deletedPhotoIdList || [], deletedPhotoId];

        setState(prevState => ({
                ...prevState,
                formState: {
                    ...prevState.formState,
                    deletedPhotoIdList: deletedPhotoIdList
                }
            }
        ));
    };

    const handleTransientFileRemove = (e: React.MouseEvent<HTMLButtonElement>, index: number) => {
        state.formState.newOfferPhotoList?.splice(index, 1);

        setState(prevState => ({
                ...prevState,
                formState: {
                    ...prevState.formState,
                    newOfferPhotoList: state.formState.newOfferPhotoList
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

    const handleFormUpdate: MouseEventHandler<HTMLButtonElement> = (e) => {
        e.preventDefault();

        const formData = new FormData();

        formData.append('link', state.formState.link);
        formData.append('order', state.formState.order);
        formData.append('buttonName', state.formState.buttonName);

        state.formState.newOfferPhotoList && state.formState.newOfferPhotoList.map((photo) => {
            formData.append('photoList', photo);
        })

        state.formState.deletedPhotoIdList && state.formState.deletedPhotoIdList.map((photoId) => {
            formData.append('deletedPhotoIdList', photoId);
        })

        formData.append('validityFrom', state.formState.validityFrom);
        formData.append('validityTo', state.formState.validityTo);
        formData.append('details', state.formState.details);
        formData.append('title', state.formState.title);
        formData.append('subtitle', state.formState.subtitle);
        formData.append('offerCategory', state.formState.offerCategory);
        formData.append('offerType', state.formState.offerType);
        formData.append('country', state.formState.country);

        setState(prevState => ({
            ...prevState,
            formError: initialError,
            formState: {...prevState.formState, submitting: true}
        }));

        axios
            .post('https://one-dollar-admin.onrender.com' + '/offer/show/' + offerId, formData,
                {
                    headers: {
                        'Authorization': 'Bearer ' + getCookie("__session")
                    }
                })
            .then(() => {
                console.log('Offer Updated');

                const dataToSend = {
                    type: 'success',
                    title: 'Action Completed',
                    message: 'Offer has been successfully updated',
                    additionalMessage: 'Please go back to do further action'
                };
                const queryString = new URLSearchParams(dataToSend).toString();

                router.push(`/done?${queryString}`);

            })
            .catch((error: any) => {
                console.error('Offer Update failed:', error);

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

    const handleFormDelete: MouseEventHandler<HTMLButtonElement> = (e) => {
        e.preventDefault();

        axios
            .post('https://one-dollar-admin.onrender.com' + '/offer/delete/' + offerId, null,
                {
                    headers: {
                        'Authorization': 'Bearer ' + getCookie("__session")
                    }
                })
            .then(() => {
                console.log('Offer Deleted');

                const dataToSend = {
                    type: 'success',
                    title: 'Action Completed',
                    message: 'Offer has been successfully deleted',
                    additionalMessage: 'Please go back to do further action'
                };

                const queryString = new URLSearchParams(dataToSend).toString();

                router.push(`/done?${queryString}`);

            })
            .catch((error: any) => {
                console.error('Offer Deletion failed:', error);

                setState(prevState => ({
                    ...prevState,
                    formState: {...prevState.formState, submitting: false}
                }));
            });
    };

    return (
        <>
            <Form title="Edit Offer" validated={state.validated}>
                {state.formState.deleted
                    ?
                    <div className="alert alert-danger alert-dismissible fade show" role="alert">
                        <i className="bi bi-exclamation-octagon me-1"></i>
                        You are seeing a deleted Form
                        <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                    </div>
                    : ""
                }
                <Input name="link" title="Affiliation Link" type="text" value={state.formState.link}
                       submitting={state.formState.submitting}
                       errors={state.formError.link}
                       required={true}
                       onInputChange={handleInputChange}/>

                <InputSelect name="country" label="Country Availability" options={countries}
                             submitting={state.formState.submitting} value={state.formState.country}
                             errors={state.formError.country}
                             handleOptionSelect={handleOptionSelectChange}/>

                <InputSelect name="offerCategory" label="Offer Category" options={offerOptions}
                             submitting={state.formState.submitting} value={state.formState.offerCategory}
                             handleOptionSelect={handleOptionSelectChange} errors={state.formError.offerCategory}/>

                <InputSelect name="offerCategory" label="Offer Type" options={offerTypeOptions}
                             submitting={state.formState.submitting} value={state.formState.offerType}
                             handleOptionSelect={handleOptionSelectChange} errors={state.formError.offerType}/>

                <Input name="details" title="Promotion Line" type="text" value={state.formState.details}
                       errors={state.formError.details}
                       required={true}
                       submitting={state.formState.submitting}
                       onInputChange={handleInputChange}/>

                <Input name="title" title="Offer title" type="text" value={state.formState.title}
                       submitting={state.formState.submitting}
                       required={true}
                       errors={state.formError.title}
                       onInputChange={handleInputChange}/>

                <Input name="subtitle" title="Offer Subtitle" type="text" value={state.formState.subtitle}
                       submitting={state.formState.submitting}
                       required={true}
                       errors={state.formError.subtitle}
                       onInputChange={handleInputChange}/>

                <Input name="order" title="Offer Order" type="text" value={state.formState.order}
                       submitting={state.formState.submitting}
                       required={true}
                       errors={state.formError.order}
                       onInputChange={handleInputChange}/>

                <Input name="buttonName" title="Claim Button Name" type="text" value={state.formState.buttonName}
                       submitting={state.formState.submitting}
                       errors={state.formError.buttonName}
                       required={true}
                       onInputChange={handleInputChange}/>

                <Image submitting={state.formState.submitting}
                       imageDownloadUrl={`${'https://one-dollar-admin.onrender.com'}/offer/image`}
                       newOfferPhotoList={state.formState.newOfferPhotoList || []}
                       existingOfferPhotoIdList={state.formState.existingOfferPhotoIdList || []}
                       handleNewFileAdd={handleNewFileAdd}
                       required={true}
                       errors={state.formError.photoList}
                       handleExistingFileRemove={(e, index) => {}}
                       handleTransientFileRemove={(e, index) => {}}
                       canRemove={false}/>

                <Input name="validityFrom" title="Offer Validity From" type="date" value={state.formState.validityFrom}
                       submitting={state.formState.submitting}
                       errors={state.formError.validityFrom}
                       onInputChange={handleInputChange}/>

                <Input name="validityTo" title="Offer Validity To" type="date" value={state.formState.validityTo}
                       submitting={state.formState.submitting}
                       errors={state.formError.validityTo}
                       onInputChange={handleInputChange}/>

                {
                    state.formState.deleted
                        ?
                        ""
                        :
                        <>
                            <Button buttonType="primary" name="Update" type="submit" onSubmit={handleFormUpdate}
                                    submitting={state.formState.submitting}/>
                            &nbsp;
                            <Button buttonType="danger" name="Delete" type="submit" onSubmit={handleFormDelete}
                                    submitting={state.formState.submitting}/>
                        </>
                }

            </Form>
        </>
    );
}

