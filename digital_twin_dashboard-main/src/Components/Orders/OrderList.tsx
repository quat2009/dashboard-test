import type { OrderListItem as OrderListItemType } from '../../types';

import { useContext, useEffect, useState } from 'react';

import OrderListItem from './OrderListItem';
import OrderModal from './OrderModal';
import Api from '../../context/api-context';
import Role from '../../context/role-context';
import { IoEye, IoEyeOff } from 'react-icons/io5';

const OrderList = () => {
    const { getOrders, getCompletedOrders } = useContext(Api);
    const { orderDetailsModal, completedOrderList } = useContext(Role);

    const [orders, setOrders] = useState<OrderListItemType[]>();
    const [completedOrders, setCompletedOrders] = useState<OrderListItemType[]>();
    const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
    const [selectedOrderID, setSelectedOrderID] = useState<string>();

    useEffect(() => {
        getOrders().then((data) => data && setOrders(data));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const getCompletedOrdersHandler = async () => {
        if (!completedOrders) {
            getCompletedOrders().then((data) => data && setCompletedOrders(data));
        } else {
            setCompletedOrders(undefined);
        }
    };

    const modalOpenHandler = (orderID: string) => {
        setSelectedOrderID(orderID);
        setModalIsOpen(true);
    };

    const modalCloseHandler = () => {
        setModalIsOpen(false);
        setSelectedOrderID(undefined);
    };

    return (
        <div className="w-full">
            {orders &&
                orders.map((order) => (
                    <OrderListItem
                        key={order.orderID}
                        orderID={order.orderID}
                        customerName={order.customerName}
                        orderDate={order.orderDate}
                        fulfillmentDate={order.fulfillmentDate}
                        priority={order.priority}
                        onModalOpen={() => orderDetailsModal && modalOpenHandler(order.orderID)}
                        checkExpiration={true}
                    />
                ))}
            {completedOrderList && (
                <div>
                    <div className="h-[2.5px] w-full bg-amber-300 mb-2"></div>
                    <p className="font-semibold text-lg ">Completed orders</p>
                    <div className="flex justify-center mb-4">
                        <div
                            className="inline-flex items-center rounded-xl p-3 shadow-md bg-amber-300 hover:bg-amber-400 hover:cursor-pointer transition-transform duration-200 hover:scale-105"
                            onClick={getCompletedOrdersHandler}
                        >
                            <button className="rounded-lg hover:cursor-pointer ">
                                {!completedOrders ? <IoEye size={28} /> : <IoEyeOff size={28} />}
                            </button>
                        </div>
                    </div>
                    {completedOrders &&
                        completedOrders.map((completedOrder) => (
                            <OrderListItem
                                key={completedOrder.orderID}
                                orderID={completedOrder.orderID}
                                customerName={completedOrder.customerName}
                                orderDate={completedOrder.orderDate}
                                fulfillmentDate={completedOrder.fulfillmentDate}
                                priority={completedOrder.priority}
                                onModalOpen={() =>
                                    orderDetailsModal && modalOpenHandler(completedOrder.orderID)
                                }
                            />
                        ))}
                </div>
            )}
            {modalIsOpen && <OrderModal onClose={modalCloseHandler} orderID={selectedOrderID} />}
        </div>
    );
};
export default OrderList;
