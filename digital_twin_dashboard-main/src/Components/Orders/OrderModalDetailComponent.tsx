type OrderModalDetailComponentType = {
    label: string;
    value?: string;
};

const OrderModalDetailComponent = ({ label, value }: OrderModalDetailComponentType) => {
    return (
        <div className="min-w-0">
            <label className="font-bold block truncate cursor-pointer">{label}</label>
            <div className="bg-white p-2 rounded-md shadow-sm truncate">{value ?? 'N/A'}</div>
        </div>
    );
};

export default OrderModalDetailComponent;
