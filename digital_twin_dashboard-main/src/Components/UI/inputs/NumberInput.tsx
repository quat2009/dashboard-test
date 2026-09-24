import type { NumberType } from '../../../types';

type NumberInputProps = {
    disabled?: boolean;
    onValueChange: (value: number | undefined) => void;
    min?: number;
    type: NumberType;
    value?: number;
    step?: number;
    max?: number;
    className?: string;
};

const NumberInput = ({
    value,
    disabled = false,
    type = 'int',
    min = 0,
    step,
    max,
    onValueChange,
    className,
}: NumberInputProps) => {
    return (
        <input
            type="number"
            disabled={disabled}
            min={!disabled ? min : undefined}
            value={value !== undefined ? value : ''}
            onChange={(event) => onValueChange(parseFloat(event.target.value))}
            step={step ? step : type === 'float' ? 0.1 : 1}
            max={max ? max : type === 'percent' ? 100 : undefined}
            className={`bg-neutral-100 shadow-sm rounded-md h-10 p-2 focus:outline-none focus:ring-2 focus:ring-amber-300 ${className}`}
        />
    );
};

export default NumberInput;
