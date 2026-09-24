type TextInputProps = {
    disabled?: boolean;
    onValueChange: (value: string) => void;
    value?: string;
    placeholder?: string;
    maxLength?: number;
    className?: string;
};

const TextInput = ({
    value,
    disabled = false,
    onValueChange,
    placeholder,
    maxLength,
    className,
}: TextInputProps) => {
    return (
        <input
            type="text"
            disabled={disabled}
            value={value ?? ''}
            placeholder={placeholder}
            maxLength={maxLength}
            onChange={(event) => onValueChange(event.target.value)}
            className={`bg-neutral-100 shadow-sm rounded-md h-10 p-2 focus:outline-none focus:ring-2 focus:ring-amber-300 ${className}`}
        />
    );
};

export default TextInput;
