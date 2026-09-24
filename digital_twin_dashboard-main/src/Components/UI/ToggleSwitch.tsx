import type { OptionItem } from '../../types';

type ToggleSwitchProps = {
    options: OptionItem[];
    value: OptionItem;
    onChange: (option: OptionItem) => void;
    disabled?: boolean;
};

const ToggleSwitch = ({ options, value, onChange, disabled = false }: ToggleSwitchProps) => {
    const isFirst = value.id === options[0].id;

    return (
        <div className="relative min-w-[200px] flex h-10 w-60 rounded-full p-1 bg-white shadow-sm">
            <div
                className={`absolute top-1 left-1 h-8 w-1/2 bg-amber-300 rounded-full shadow-md transition-transform duration-200 ${isFirst ? 'translate-x-0' : 'translate-x-[calc(100%-0.5rem)]'}`}
            />

            {options.map((opt) => (
                <button
                    key={opt.id}
                    type="button"
                    disabled={disabled}
                    onClick={() => !disabled && onChange(opt)}
                    className="relative z-10 flex-1 text-center font-semibold text-gray-700 select-none hover:cursor-pointer"
                >
                    {opt.name}
                </button>
            ))}
        </div>
    );
};

export default ToggleSwitch;
