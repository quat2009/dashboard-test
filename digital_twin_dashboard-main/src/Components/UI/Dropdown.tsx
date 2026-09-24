import type { OptionItem } from '../../types';

import { useState, useRef, useEffect } from 'react';
import { IoChevronDownCircleSharp } from 'react-icons/io5';

type DropdownProps = {
    options: OptionItem[];
    value: OptionItem;
    onChange: (newValue: OptionItem) => void;
    disabled?: boolean;
};

const Dropdown = ({ options, value, onChange, disabled = false }: DropdownProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [hoveredOnce, setHoveredOnce] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
                setHoveredOnce(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isOpen]);

    return (
        <div className="relative w-60 h-10" ref={dropdownRef}>
            <button
                type="button"
                onClick={() => {
                    if (!disabled) {
                        setIsOpen(!isOpen);
                        setHoveredOnce(false);
                    }
                }}
                className={`
          w-full px-4 py-2 text-left bg-white border rounded-full shadow-sm font-semibold text-gray-700
          ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
          flex justify-between items-center text-nowrap
        `}
            >
                {value.name}
                <IoChevronDownCircleSharp size={20} className="text-amber-300" />
            </button>

            {isOpen && (
                <ul
                    className="absolute z-10 w-full mt-1 bg-white rounded shadow-md max-h-60 overflow-auto"
                    onMouseEnter={() => {
                        if (isOpen && !hoveredOnce) {
                            setHoveredOnce(true);
                        }
                    }}
                >
                    {options.map((opt) => (
                        <li
                            key={opt.id}
                            className={`
                px-4 py-2 cursor-pointer font-semibold text-gray-700 text-nowrap ${
                    !hoveredOnce && opt === value
                        ? 'bg-amber-300 shadow-md'
                        : 'hover:bg-amber-300 hover:shadow:md'
                }`}
                            onClick={() => {
                                onChange(opt);
                                setIsOpen(false);
                            }}
                        >
                            {opt.name}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Dropdown;
