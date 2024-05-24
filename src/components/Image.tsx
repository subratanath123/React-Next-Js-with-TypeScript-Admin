import React, {useState} from 'react';
import Input from "@/components/Input";

interface ImageProps {
    submitting: boolean;
    required?: boolean;
    errors?: string;
    imageDownloadUrl: string;
    newOfferPhotoList: any[];
    existingOfferPhotoIdList: any[];
    handleNewFileAdd: (e: React.ChangeEvent<HTMLInputElement>) => void;
    canRemove: boolean,
    handleExistingFileRemove: (e: React.MouseEvent<HTMLButtonElement>, index: number, deletedPhotoId: any) => void;
    handleTransientFileRemove: (e: React.MouseEvent<HTMLButtonElement>, index: number) => void;
}

const Image: React.FC<ImageProps> = ({
                                         existingOfferPhotoIdList,
                                         newOfferPhotoList,
                                         imageDownloadUrl,
                                         required = false,
                                         canRemove = true,
                                         errors,
                                         submitting,
                                         handleExistingFileRemove,
                                         handleTransientFileRemove,
                                         handleNewFileAdd
                                     }) => {

    const [loading, setLoading] = useState(true);

    const handleLoad = () => {
        setLoading(false);
    };

    const handleError = () => {
        setLoading(false);
    };

    return (
        <>
            <Input name="photoList" title="Upload Photo" type="file" value=""
                   submitting={submitting}
                   onInputChange={handleNewFileAdd}
                   required={required} errors={errors}/>

            <div className="row mb-3">
                {existingOfferPhotoIdList && existingOfferPhotoIdList.map((photoId, index) => (
                    <>
                        <div className="col-sm-4">
                            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}
                                 hidden={!loading}>
                                <div className="spinner-border" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                            </div>

                            <img
                                key={`image-${photoId}`}
                                src={`${imageDownloadUrl}/${photoId}`}
                                className="img-fluid mx-auto rounded border border-8"
                                alt=""
                                onLoad={handleLoad}
                                onError={handleError}
                                style={{maxWidth: '100%'}}
                            ></img>

                            {
                                canRemove
                                &&
                                <button type="button" className="btn btn-outline-danger" aria-label="Close"
                                        key={`remove-${photoId}`}
                                        style={{width: "100%", display: "block"}}
                                        onClick={(event) => handleExistingFileRemove(event, index, photoId)}>
                                    Remove
                                </button>
                            }


                        </div>
                    </>
                ))}

                {newOfferPhotoList && newOfferPhotoList.map((photo, index) => (
                    <>
                        <div className="col-sm-4">
                            <img
                                key={`image-${index}`}
                                src={URL.createObjectURL(photo)}
                                className="img-fluid mx-auto rounded border border-8"
                                alt=""
                                style={{maxWidth: '100%'}}
                            />

                            {
                                canRemove
                                &&
                            <button type="button" className="btn btn-outline-danger" aria-label="Close"
                                    key={`remove-${index}`}
                                    style={{width: "100%", display: "block"}}
                                    onClick={(event) => handleTransientFileRemove(event, index)}>
                                Remove
                            </button>
                            }

                        </div>
                    </>
                ))}
            </div>
        </>
    )
};

export default Image;