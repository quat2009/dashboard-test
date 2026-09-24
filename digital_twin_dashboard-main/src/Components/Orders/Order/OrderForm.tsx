import type { OrderEnrichment as OrderEnrichmentType, Product } from '../../../types';
import { useContext, useEffect, useReducer, useState } from 'react';

import OrderItem from './OrderItem';
import Api from '../../../context/api-context';
import OrderEnrichment from './OrderEnrichment';

type Action =
    | { type: 'INITIALIZE' }
    | { type: 'SET_NAME'; payload: string | undefined }
    | { type: 'SET_FULFILLMENT_DATE'; payload: string | undefined }
    | { type: 'SET_PRIORITY'; payload: boolean };

const reducer = (state: OrderEnrichmentType, action: Action): OrderEnrichmentType => {
    switch (action.type) {
        case 'INITIALIZE':
            return initialState;
        case 'SET_NAME':
            return { ...state, customerName: action.payload as string };
        case 'SET_FULFILLMENT_DATE':
            return { ...state, fulfillmentDate: action.payload };
        case 'SET_PRIORITY':
            return { ...state, priority: action.payload };
        default:
            return state;
    }
};

const initialState: OrderEnrichmentType = {
    customerName: undefined,
    fulfillmentDate: undefined,
    priority: false,
};

const OrderForm = () => {
    const { getAvailableProducts, orderProducts } = useContext(Api);
    const [products, setProducts] = useState<Product[]>();
    const [details, dispatch] = useReducer(reducer, initialState);
    const canSubmit =
        products?.some((product) => (product.quantity ?? 0) > 0) &&
        details.customerName &&
        details.fulfillmentDate;

    useEffect(() => {
        getAvailableProducts().then((data) => setProducts(data));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleQuantityChange = (productID: string, quantity: number) => {
        setProducts((prevState) =>
            prevState?.map((product) =>
                product.id === productID ? { ...product, quantity } : product,
            ),
        );
    };

    const productOrderHandler = () => {
        if (products) {
            const productsToSave: Product[] = products?.map((product) => ({
                id: product.id,
                quantity: product.quantity ?? 0,
            }));

            orderProducts(productsToSave, details).then((success) => {
                if (success) initializeForm();
            });
        }
    };

    const initializeForm = () => {
        setProducts((prevState) =>
            prevState?.map((product) => ({
                ...product,
                quantity: 0,
            })),
        );

        dispatch({ type: 'INITIALIZE' });
    };

    return (
        <div className="h-full w-full">
            <div className="bg-amber-50 drop-shadow-xl rounded-2xl p-4 w-full h-full flex-col justify-between">
                <div className="grid grid-cols-2 gap-4">
                    {products &&
                        products.map((product) => (
                            <OrderItem
                                key={product.id}
                                imageUrl={product.imageUrl}
                                quantity={product.quantity}
                                maxQuantity={product.maxQuantity}
                                onQuantityChange={(quantity) =>
                                    handleQuantityChange(product.id, quantity)
                                }
                            />
                        ))}
                </div>

                <OrderEnrichment
                    state={details}
                    onFulfillmentDateChange={(value) =>
                        dispatch({ type: 'SET_FULFILLMENT_DATE', payload: value })
                    }
                    onNameChange={(value) => dispatch({ type: 'SET_NAME', payload: value })}
                    onPriorityChange={(value) => dispatch({ type: 'SET_PRIORITY', payload: value })}
                />

                <div className="flex justify-center my-8">
                    <button
                        className="px-6 py-2 bg-amber-300 text-gray-700 rounded-lg hover:bg-amber-400 hover:cursor-pointer transform transition duration-200 hover:scale-105 font-semibold tracking-wide shadow-lg disabled:opacity-80 disabled:cursor-not-allowed disabled:hover:scale-100"
                        onClick={productOrderHandler}
                        disabled={!canSubmit}
                    >
                        Place Order
                    </button>
                </div>
            </div>
        </div>
    );
};
export default OrderForm;
