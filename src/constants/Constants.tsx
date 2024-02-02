export const timeRangeOptionList = [
    'Daily',
    'Weekly',
    'Monthly',
    'Year'
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

