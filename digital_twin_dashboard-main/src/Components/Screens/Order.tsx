import { useContext, useEffect, useState } from 'react';

import OrderForm from '../Orders/Order/OrderForm';
import OrderList from '../Orders/OrderList';
import Role from '../../context/role-context';
import OrderDetails from '../Orders/OrderDetails';

const Order = () => {
    const { orderForm, orderList, orderDetails } = useContext(Role);
    const [numOfComponents, setNumOfComponents] = useState<number>();
    useEffect(() => {
        const numberOfComponentsHandler = () => {
            setNumOfComponents(Number(orderForm) + Number(orderList) + Number(orderDetails));
        };
        numberOfComponentsHandler();
    }, [orderForm, orderList, orderDetails]);

    return (
        <div
            className={`grid ${numOfComponents === 1 ? 'grid-cols-1' : numOfComponents === 2 ? 'grid-cols-2' : 'grid-cols-3'} gap-4 overflow-x-hidden p-4 justify-items-center`}
        >
            {orderForm && (
                <div className={'w-full max-w-[1200px] '}>
                    <OrderForm />
                </div>
            )}
            {orderList && (
                <div className={'w-full max-w-[1200px]'}>
                    <OrderList />
                </div>
            )}
            {orderDetails && (
                <div className={'w-full max-w-[1200px]'}>
                    <OrderDetails />
                </div>
            )}
        </div>
    );
};

export default Order;
