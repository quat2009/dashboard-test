type CheckboxInputProps = {
    id: string;
    label: string;
    disabled?: boolean;
    checked?: boolean;
    onValueChange: (value: boolean) => void;
    className?: string;
};

const CheckboxInput = ({
    checked = false,
    disabled = false,
    onValueChange,
    id,
    label,
    className,
}: CheckboxInputProps) => {
    return (
        <div className="flex items-center justify-between bg-neutral-100 shadow-sm gap-3 rounded-md h-10 p-2 px-4">
            <label htmlFor={id}>{label}:</label>
            <input
                type="checkbox"
                id={id}
                disabled={disabled}
                checked={checked}
                onChange={(event) => onValueChange(event.target.checked)}
                className={`h-5 w-5 rounded border-neutral-300 text-amber-500 focus:ring-amber-300 accent-violet-800 ${className}`}
            />
        </div>
    );
};

export default CheckboxInput;
