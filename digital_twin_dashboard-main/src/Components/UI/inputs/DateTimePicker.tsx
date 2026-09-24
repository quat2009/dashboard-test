type DateTimePickerProps = {
    disabled?: boolean;
    value?: string;
    id: string;
    min?: string;
    max?: string;
    label?: string;
    onValueChange: (value: string) => void;
};

const DateTimePicker = ({
    value,
    label,
    id,
    disabled = false,
    min,
    max,
    onValueChange,
}: DateTimePickerProps) => {
    return (
        <div className="flex flex-col gap-1">
            {label && (
                <label htmlFor={id} className="text-md font-bold">
                    {label}
                </label>
            )}
            <input
                id={id}
                type="datetime-local"
                disabled={disabled}
                value={value}
                step={1}
                min={min}
                max={max}
                onChange={(event) => onValueChange(event.target.value)}
                className="bg-neutral-100 shadow-sm rounded-md h-10 p-2 focus:outline-none focus:ring-2 focus:ring-amber-300"
            />
        </div>
    );
};

export default DateTimePicker;
