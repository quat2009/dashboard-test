import { useContext, useEffect, useState } from 'react';
import Api from '../../context/api-context';
import type { Order } from '../../types';
import OrderProduct from './OrderProduct';

const OrderDetails = () => {
    const [order, setOrder] = useState<Order>();
    const { getOrder } = useContext(Api);

    useEffect(() => {
        getOrder().then((order) => order && setOrder(order));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            {order && (
                <div className="w-full p-6 drop-shadow-lg bg-white rounded-lg">
                    <div className=" text-gray-700 font-bold text-xl mb-6">
                        Order ID: {order.details.orderID}
                    </div>
                    <div className="grid grid-cols-3 gap-6 justify-items-center ">
                        {order.products.map((product) => {
                            if (product.quantity && product.quantity > 0) {
                                return <OrderProduct key={product.id} product={product} />;
                            }
                        })}
                    </div>
                </div>
            )}
        </>
    );
};

export default OrderDetails;
