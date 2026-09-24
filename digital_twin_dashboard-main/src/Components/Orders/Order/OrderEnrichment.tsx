import type { OrderEnrichment as OrderEnrichmentType } from '../../../types';

import DateTimePicker from '../../UI/inputs/DateTimePicker';
import ToggleSwitch from '../../UI/ToggleSwitch';
import TextInput from '../../UI/inputs/TextInput';

type OrderEnrichmentProps = {
    state: OrderEnrichmentType;
    onNameChange: (name: string) => void;
    onFulfillmentDateChange: (date: string) => void;
    onPriorityChange: (priority: boolean) => void;
};

const PRIORITY_OPTIONS = [
    { id: 1, name: 'Regular' },
    { id: 2, name: 'Important' },
];

const OrderEnrichment = ({
    state,
    onFulfillmentDateChange,
    onNameChange,
    onPriorityChange,
}: OrderEnrichmentProps) => {
    return (
        <div className="flex gap-5 mt-6 bg-violet-50 p-3 rounded-lg drop-shadow-sm justify-between">
            <div className="flex flex-col gap-1 w-full">
                <label className="text-md font-bold">Customer name:</label>
                <TextInput value={state.customerName ?? ''} onValueChange={onNameChange} />
            </div>
            <div className="w-full">
                <DateTimePicker
                    label="Fulfillment date"
                    id="fulfillment-date"
                    value={state.fulfillmentDate ?? ''}
                    onValueChange={onFulfillmentDateChange}
                />
            </div>
            <div className="flex flex-col gap-1 w-full items-center">
                <label className="text-md font-bold">Priority:</label>
                <ToggleSwitch
                    options={PRIORITY_OPTIONS}
                    onChange={(value) =>
                        onPriorityChange(value.name === 'Important' ? true : false)
                    }
                    value={state.priority === true ? PRIORITY_OPTIONS[1] : PRIORITY_OPTIONS[0]}
                />
            </div>
        </div>
    );
};
export default OrderEnrichment;
