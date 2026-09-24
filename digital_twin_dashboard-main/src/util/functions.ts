export function convertDateToTimestampTz(date: string): string {
    const d = new Date(date);
    return d.toISOString();
}

export function convertTimestampTzToDate(timestamp: string): string {
    const date = new Date(timestamp);
    return date.toISOString().slice(0, 16);
}

export const getDateTimeLocal = (date: Date) => {
    const d = new Date(date);
    d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
    return d.toISOString().slice(0, 19);
};

export const generateHexColor = () => {
    return `#${Math.floor(Math.random() * 0xffffff)
        .toString(16)
        .padStart(6, '0')}`;
};
