import type { Order } from '../../types';
import { createPortal } from 'react-dom';
import { IoCloseOutline } from 'react-icons/io5';
import { useContext, useEffect, useState } from 'react';
import Api from '../../context/api-context';
import OrderModalDetailComponent from './OrderModalDetailComponent';
import Role from '../../context/role-context';
import OrderProduct from './OrderProduct';

type OrderModalProps = {
    orderID?: string;
    onClose: () => void;
};

const OrderModal = ({ orderID, onClose }: OrderModalProps) => {
    const { orderCompleteButton, orderDeleteButton } = useContext(Role);

    const [order, setOrder] = useState<Order>();
    const { getOrder, completeOrder, deleteOrder } = useContext(Api);

    useEffect(() => {
        if (orderID) {
            getOrder(orderID).then((order) => order && setOrder(order));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const isExpired =
        order?.details.fulfillmentDate !== undefined &&
        new Date(order.details.fulfillmentDate) < new Date();
    return (
        <>
            {createPortal(
                <>
                    <div className="fixed inset-0 z-50">
                        <div className="absolute inset-0 bg-black/50" />

                        <div
                            className="relative z-10 flex h-full items-center justify-center"
                            onClick={onClose}
                        >
                            <div
                                className="relative min-w-[550px] w-[1200px] max-h-[80vh] overflow-y-auto bg-neutral-200 rounded-lg shadow-lg p-5 scrollbar-track-rounded"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <button className="absolute top-5 right-5" onClick={onClose}>
                                    <IoCloseOutline className="hover:cursor-pointer" size={28} />
                                </button>
                                {order && (
                                    <>
                                        <span className=" text-gray-700 font-bold text-2xl">
                                            Order details
                                        </span>
                                        <div className="m-5">
                                            <div className="grid grid-cols-5 gap-4">
                                                <OrderModalDetailComponent
                                                    label="Order ID"
                                                    value={order.details.orderID}
                                                    key={'orderID'}
                                                />
                                                <OrderModalDetailComponent
                                                    label="Customer Name"
                                                    value={order.details.customerName}
                                                    key={'customerName'}
                                                />
                                                <OrderModalDetailComponent
                                                    label="Order date"
                                                    value={order.details.orderDate}
                                                    key={'orderDate'}
                                                />
                                                <OrderModalDetailComponent
                                                    label="Fulfillment Date"
                                                    value={order.details.fulfillmentDate}
                                                    key={'fulfillmentDate'}
                                                />
                                                <OrderModalDetailComponent
                                                    label="Priority"
                                                    value={
                                                        order.details.priority
                                                            ? 'Important'
                                                            : 'Regular'
                                                    }
                                                    key={'prority'}
                                                />
                                            </div>
                                            <div className="grid grid-cols-3 mt-6 gap-4">
                                                {order.products.map((product) => (
                                                    <>
                                                        {product.quantity &&
                                                        product.quantity > 0 ? (
                                                            <OrderProduct
                                                                product={product}
                                                                expired={isExpired}
                                                            />
                                                        ) : null}
                                                    </>
                                                ))}
                                            </div>
                                            {(orderCompleteButton || orderDeleteButton) && (
                                                <div className="mt-7 w-full flex justify-center items-center gap-7">
                                                    {orderDeleteButton && (
                                                        <button
                                                            className="px-6 py-2 bg-red-400 text-gray-700 rounded-lg hover:bg-red-500 hover:cursor-pointer transform transition duration-200 hover:scale-105 font-semibold tracking-wide shadow-lg"
                                                            onClick={() => {
                                                                deleteOrder(order.details.orderID);
                                                            }}
                                                        >
                                                            Delete Order
                                                        </button>
                                                    )}
                                                    {orderCompleteButton && (
                                                        <button
                                                            className="px-6 py-2 bg-amber-300 text-gray-700 rounded-lg hover:bg-amber-400 hover:cursor-pointer transform transition duration-200 hover:scale-105 font-semibold tracking-wide shadow-lg"
                                                            onClick={() => {
                                                                completeOrder(
                                                                    order.details.orderID,
                                                                );
                                                            }}
                                                        >
                                                            Complete Order
                                                        </button>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </>,
                document.getElementById('modal')!,
            )}
        </>
    );
};

export default OrderModal;
