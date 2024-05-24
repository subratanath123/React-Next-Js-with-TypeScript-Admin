export const timeRangeOptionList = [
    'Daily',
    'Monthly',
    'Yearly'
];

export type TimeRangeOption = typeof timeRangeOptionList[number];

export const reportTypeOptionList = [
    'Customer',
    'Sales',
    'Revenue'
];

export type ReportTypeOption = typeof reportTypeOptionList[number];

export const reportTypeOptionToIconMap: Map<ReportTypeOption, string> = new Map();
reportTypeOptionToIconMap.set('Customer', 'people');
reportTypeOptionToIconMap.set('Sales', 'cart');
reportTypeOptionToIconMap.set('Revenue', 'currency-dollar');


export interface FormState {
    deleted?: boolean;
    newOfferPhotoList?: File[];
    deletedPhotoIdList?: any[];
    existingOfferPhotoIdList?: any[];
    submitting: boolean;
    offerCategory: string;
    offerType: string;
    link: string;
    details: string;
    title: string;
    subtitle: string;
    buttonName: string;
    photoList: File[];
    order: string;
    validityFrom: string;
    validityTo: string;
}

export interface FormError {
    offerCategory: string;
    offerType: string;
    link: string;
    details: string;
    title: string;
    subtitle: string;
    buttonName: string;
    photoList: string;
    order: string;
    validityFrom: string;
    validityTo: string;
}

export const initialState: FormState = {
    submitting: false,
    offerCategory: '',
    offerType: '',
    link: '',
    details: '',
    title: '',
    subtitle: '',
    buttonName: '',
    photoList: [],
    order: '',
    validityFrom: '',
    validityTo: ''
};

export const initialError: FormError = {
    offerCategory: '',
    offerType: '',
    link: '',
    details: '',
    title: '',
    subtitle: '',
    buttonName: '',
    photoList: '',
    order: '',
    validityFrom: '',
    validityTo: ''
};


export interface ErrorResponse {
    fieldName: string;
    rejectedValue: string;
    messageError: string;
}