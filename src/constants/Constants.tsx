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
    country: string;
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
    country: string;
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
    country: '',
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
    validityTo: '',
    country: ''
};


export interface ErrorResponse {
    fieldName: string;
    rejectedValue: string;
    messageError: string;
}


export const countries = [{value: "", label: "Please Select"}, {value: "af", label: "Afghanistan"}, {
    value: "al",
    label: "Albania"
}, {
    value: "dz",
    label: "Algeria"
}, {value: "ad", label: "Andorra"}, {value: "ao", label: "Angola"}, {
    value: "ag",
    label: "Antigua and Barbuda"
}, {value: "ar", label: "Argentina"}, {value: "am", label: "Armenia"}, {
    value: "au",
    label: "Australia"
}, {value: "at", label: "Austria"}, {value: "az", label: "Azerbaijan"}, {
    value: "bs",
    label: "Bahamas"
}, {value: "bh", label: "Bahrain"}, {value: "bd", label: "Bangladesh"}, {
    value: "bb",
    label: "Barbados"
}, {value: "by", label: "Belarus"}, {value: "be", label: "Belgium"}, {
    value: "bz",
    label: "Belize"
}, {value: "bj", label: "Benin"}, {value: "bt", label: "Bhutan"}, {
    value: "bo",
    label: "Bolivia"
}, {value: "ba", label: "Bosnia and Herzegovina"}, {value: "bw", label: "Botswana"}, {
    value: "br",
    label: "Brazil"
}, {value: "bn", label: "Brunei"}, {value: "bg", label: "Bulgaria"}, {
    value: "bf",
    label: "Burkina Faso"
}, {value: "bi", label: "Burundi"}, {value: "cv", label: "Cabo Verde"}, {
    value: "kh",
    label: "Cambodia"
}, {value: "cm", label: "Cameroon"}, {value: "ca", label: "Canada"}, {
    value: "cf",
    label: "Central African Republic"
}, {value: "td", label: "Chad"}, {value: "cl", label: "Chile"}, {
    value: "cn",
    label: "China"
}, {value: "co", label: "Colombia"}, {value: "km", label: "Comoros"}, {
    value: "cd",
    label: "Congo, Democratic Republic of the"
}, {value: "cg", label: "Congo, Republic of the"}, {value: "cr", label: "Costa Rica"}, {
    value: "hr",
    label: "Croatia"
}, {value: "cu", label: "Cuba"}, {value: "cy", label: "Cyprus"}, {
    value: "cz",
    label: "Czech Republic (Czechia)"
}, {value: "dk", label: "Denmark"}, {value: "dj", label: "Djibouti"}, {
    value: "dm",
    label: "Dominica"
}, {value: "do", label: "Dominican Republic"}, {value: "tl", label: "East Timor (Timor-Leste)"}, {
    value: "ec",
    label: "Ecuador"
}, {value: "eg", label: "Egypt"}, {value: "sv", label: "El Salvador"}, {
    value: "gq",
    label: "Equatorial Guinea"
}, {value: "er", label: "Eritrea"}, {value: "ee", label: "Estonia"}, {
    value: "sz",
    label: "Eswatini"
}, {value: "et", label: "Ethiopia"}, {value: "fj", label: "Fiji"}, {
    value: "fi",
    label: "Finland"
}, {value: "fr", label: "France"}, {value: "ga", label: "Gabon"}, {
    value: "gm",
    label: "Gambia"
}, {value: "ge", label: "Georgia"}, {value: "de", label: "Germany"}, {
    value: "gh",
    label: "Ghana"
}, {value: "gr", label: "Greece"}, {value: "gd", label: "Grenada"}, {
    value: "gt",
    label: "Guatemala"
}, {value: "gn", label: "Guinea"}, {value: "gw", label: "Guinea-Bissau"}, {
    value: "gy",
    label: "Guyana"
}, {value: "ht", label: "Haiti"}, {value: "hn", label: "Honduras"}, {
    value: "hu",
    label: "Hungary"
}, {value: "is", label: "Iceland"}, {value: "in", label: "India"}, {
    value: "id",
    label: "Indonesia"
}, {value: "ir", label: "Iran"}, {value: "iq", label: "Iraq"}, {
    value: "ie",
    label: "Ireland"
}, {value: "il", label: "Israel"}, {value: "it", label: "Italy"}, {
    value: "ci",
    label: "Ivory Coast (Côte d'Ivoire)"
}, {value: "jm", label: "Jamaica"}, {value: "jp", label: "Japan"}, {
    value: "jo",
    label: "Jordan"
}, {value: "kz", label: "Kazakhstan"}, {value: "ke", label: "Kenya"}, {
    value: "ki",
    label: "Kiribati"
}, {value: "kp", label: "Korea, North (North Korea)"}, {
    value: "kr",
    label: "Korea, South (South Korea)"
}, {value: "xk", label: "Kosovo"}, {value: "kw", label: "Kuwait"}, {
    value: "kg",
    label: "Kyrgyzstan"
}, {value: "la", label: "Laos"}, {value: "lv", label: "Latvia"}, {
    value: "lb",
    label: "Lebanon"
}, {value: "ls", label: "Lesotho"}, {value: "lr", label: "Liberia"}, {
    value: "ly",
    label: "Libya"
}, {value: "li", label: "Liechtenstein"}, {value: "lt", label: "Lithuania"}, {
    value: "lu",
    label: "Luxembourg"
}, {value: "mg", label: "Madagascar"}, {value: "mw", label: "Malawi"}, {
    value: "my",
    label: "Malaysia"
}, {value: "mv", label: "Maldives"}, {value: "ml", label: "Mali"}, {
    value: "mt",
    label: "Malta"
}, {value: "mh", label: "Marshall Islands"}, {value: "mr", label: "Mauritania"}, {
    value: "mu",
    label: "Mauritius"
}, {value: "mx", label: "Mexico"}, {value: "fm", label: "Micronesia"}, {
    value: "md",
    label: "Moldova"
}, {value: "mc", label: "Monaco"}, {value: "mn", label: "Mongolia"}, {
    value: "me",
    label: "Montenegro"
}, {value: "ma", label: "Morocco"}, {value: "mz", label: "Mozambique"}, {
    value: "mm",
    label: "Myanmar (Burma)"
}, {value: "na", label: "Namibia"}, {value: "nr", label: "Nauru"}, {
    value: "np",
    label: "Nepal"
}, {value: "nl", label: "Netherlands"}, {value: "nz", label: "New Zealand"}, {
    value: "ni",
    label: "Nicaragua"
}, {value: "ne", label: "Niger"}, {value: "ng", label: "Nigeria"}, {
    value: "mk",
    label: "North Macedonia"
}, {value: "no", label: "Norway"}, {value: "om", label: "Oman"}, {
    value: "pk",
    label: "Pakistan"
}, {value: "pw", label: "Palau"}, {value: "pa", label: "Panama"}, {
    value: "pg",
    label: "Papua New Guinea"
}, {value: "py", label: "Paraguay"}, {value: "pe", label: "Peru"}, {
    value: "ph",
    label: "Philippines"
}, {value: "pl", label: "Poland"}, {value: "pt", label: "Portugal"}, {
    value: "qa",
    label: "Qatar"
}, {value: "ro", label: "Romania"}, {value: "ru", label: "Russia"}, {
    value: "rw",
    label: "Rwanda"
}, {value: "kn", label: "Saint Kitts and Nevis"}, {value: "lc", label: "Saint Lucia"}, {
    value: "vc",
    label: "Saint Vincent and the Grenadines"
}, {value: "ws", label: "Samoa"}, {value: "sm", label: "San Marino"}, {
    value: "st",
    label: "Sao Tome and Principe"
}, {value: "sa", label: "Saudi Arabia"}, {value: "sn", label: "Senegal"}, {
    value: "rs",
    label: "Serbia"
}, {value: "sc", label: "Seychelles"}, {value: "sl", label: "Sierra Leone"}, {
    value: "sg",
    label: "Singapore"
}, {value: "sk", label: "Slovakia"}, {value: "si", label: "Slovenia"}, {
    value: "sb",
    label: "Solomon Islands"
}, {value: "so", label: "Somalia"}, {value: "za", label: "South Africa"}, {
    value: "ss",
    label: "South Sudan"
}, {value: "es", label: "Spain"}, {value: "lk", label: "Sri Lanka"}, {
    value: "sd",
    label: "Sudan"
}, {value: "sr", label: "Suriname"}, {value: "se", label: "Sweden"}, {
    value: "ch",
    label: "Switzerland"
}, {value: "sy", label: "Syria"}, {value: "tw", label: "Taiwan"}, {
    value: "tj",
    label: "Tajikistan"
}, {value: "tz", label: "Tanzania"}, {value: "th", label: "Thailand"}, {
    value: "tg",
    label: "Togo"
}, {value: "to", label: "Tonga"}, {value: "tt", label: "Trinidad and Tobago"}, {
    value: "tn",
    label: "Tunisia"
}, {value: "tr", label: "Turkey"}, {value: "tm", label: "Turkmenistan"}, {
    value: "tv",
    label: "Tuvalu"
}, {value: "ug", label: "Uganda"}, {value: "ua", label: "Ukraine"}, {
    value: "ae",
    label: "United Arab Emirates"
}, {value: "gb", label: "United Kingdom"}, {value: "us", label: "United States of America"}, {
    value: "uy",
    label: "Uruguay"
}, {value: "uz", label: "Uzbekistan"}, {value: "vu", label: "Vanuatu"}, {
    value: "va",
    label: "Vatican City (Holy See)"
}, {value: "ve", label: "Venezuela"}, {value: "vn", label: "Vietnam"}, {
    value: "ye",
    label: "Yemen"
}, {value: "zm", label: "Zambia"}, {value: "zw", label: "Zimbabwe"}];