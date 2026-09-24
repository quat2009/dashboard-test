import type { ChartFilter as ChartFilterObjectType } from '../../../types';

import { useEffect, useState } from 'react';
import { FaFilter } from 'react-icons/fa';

import { getDateTimeLocal } from '../../../util/functions';
import DateTimePicker from '../inputs/DateTimePicker';
import NumberInput from '../inputs/NumberInput';

type ChartFilterProps = {
    onFilterChange: (filter: ChartFilterObjectType) => void;
};

const DEFAULT_SAMPLING_FREQUENCY_SECONDS = 5;
const DEFAULT_CHART_POINTS = 2_000;

const ChartFilter = ({ onFilterChange }: ChartFilterProps) => {
    const [samplingFrequency, setSamplingFrequency] = useState<number | undefined>(
        DEFAULT_SAMPLING_FREQUENCY_SECONDS,
    );
    const [disableFilter, setDisableFilter] = useState(false);

    const [toDate, setToDate] = useState(() => {
        const now = new Date();
        return getDateTimeLocal(now);
    });

    const [fromDate, setFromDate] = useState(() => {
        const defaultRangeStart = new Date(
            Date.now() -
                DEFAULT_CHART_POINTS * DEFAULT_SAMPLING_FREQUENCY_SECONDS * 1000,
        );
        return getDateTimeLocal(defaultRangeStart);
    });

    const onFilterChangeHandler = () => {
        if (samplingFrequency && fromDate && toDate) {
            onFilterChange({ samplingFrequency, fromDate, toDate });
        }
    };

    useEffect(() => {
        if (!samplingFrequency || !fromDate || !toDate) {
            setDisableFilter(true);
        } else {
            setDisableFilter(false);
        }
    }, [samplingFrequency, fromDate, toDate]);

    useEffect(() => {
        onFilterChangeHandler();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleFrequencyChange = (value: number | undefined) => {
        if (value === 1.1) {
            setSamplingFrequency(2);
        } else {
            setSamplingFrequency(value);
        }
    };

    return (
        <div className="mb-6 p-2 w-[90%] flex flex-row gap-3 items-center justify-between">
            <DateTimePicker
                id="from-date"
                label="From:"
                value={fromDate}
                onValueChange={setFromDate}
            />
            <DateTimePicker id="to-date" label="To:" value={toDate} onValueChange={setToDate} />

            <div className="flex flex-col gap-1">
                <label className="text-md font-bold">Sampling frequency:</label>
                <div className="flex flex-row items-center gap-2">
                    <NumberInput
                        onValueChange={handleFrequencyChange}
                        type="float"
                        value={samplingFrequency}
                        min={0}
                        step={samplingFrequency && samplingFrequency > 1 ? 1 : 0.1}
                    />
                    <p className="text-gray-700 font-semibold w-fit text-lg">sec</p>
                </div>
            </div>
            <div
                className={`bg-amber-300 p-3 rounded-lg shadow-sm mt-5 hover:cursor-not-allowed ${!disableFilter && 'hover:cursor-pointer hover:scale-105 transition-all ease-in-out'}`}
            >
                <FaFilter size={20} onClick={() => !disableFilter && onFilterChangeHandler()} />
            </div>
        </div>
    );
};

export default ChartFilter;
