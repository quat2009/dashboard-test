type OrderListItemProps = {
    orderID: string;
    customerName?: string;
    orderDate?: string;
    fulfillmentDate?: string;
    priority?: boolean;
    onModalOpen: () => void;
    checkExpiration?: boolean;
};

const OrderListItem = ({
    orderID,
    customerName,
    orderDate,
    fulfillmentDate,
    priority,
    onModalOpen,
    checkExpiration = false,
}: OrderListItemProps) => {
    const isExpired = checkExpiration
        ? fulfillmentDate !== undefined && new Date(fulfillmentDate) < new Date()
        : false;

    return (
        <div
            className={`w-full drop-shadow-md rounded-xl p-4 mb-6 grid grid-cols-4 gap-8 hover:cursor-pointer ${isExpired ? 'bg-red-300' : priority ? 'bg-amber-300' : 'bg-amber-50'}`}
            onClick={onModalOpen}
        >
            <div className="min-w-0">
                <label className="font-bold block truncate cursor-pointer">Order ID</label>
                <div className="bg-white p-2 rounded-md shadow-sm truncate">{orderID}</div>
            </div>
            <div className="min-w-0">
                <label className="font-bold block truncate cursor-pointer">Customer name:</label>
                <div className="bg-white p-2 rounded-md shadow-sm truncate">
                    {customerName ?? 'N/A'}
                </div>
            </div>
            <div className="min-w-0">
                <label className=" font-bold block truncate cursor-pointer">Order date:</label>
                <div className="bg-white p-2 rounded-md shadow-sm truncate">
                    {orderDate ?? 'N/A'}
                </div>
            </div>
            <div className="min-w-0">
                <label className=" font-bold block truncate cursor-pointer">
                    Fulfillment date:
                </label>
                <div className="bg-white p-2 rounded-md shadow-sm truncate ">
                    {fulfillmentDate ?? 'N/A'}
                </div>
            </div>
        </div>
    );
};
export default OrderListItem;
