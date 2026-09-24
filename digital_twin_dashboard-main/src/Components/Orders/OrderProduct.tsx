import type { Product } from '../../types';

type OrderProductProps = {
    product: Product;
    expired?: boolean;
};

const OrderProduct = ({ product, expired }: OrderProductProps) => {
    return (
        <>
            {product.quantity !== undefined && product.completedQuantity !== undefined && (
                <div
                    className={`drop-shadow-sm rounded-lg p-2 w-full ${expired && product.completedQuantity < product.quantity ? 'bg-red-300' : product.completedQuantity >= product.quantity ? 'bg-green-300' : 'bg-violet-50'}`}
                >
                    <img
                        src={product.imageUrl}
                        alt="Product image"
                        className="rounded-md shadow-lg w-[50%] mx-auto mb-3 max-w-[150px]"
                    />
                    <div className="w-full grid grid-cols-2 gap-5 items-center">
                        <div>
                            <label className="font-bold block truncate text-wrap">Quantity</label>
                            <div className="bg-white p-2 rounded-md shadow-sm truncate">
                                {product.quantity}
                            </div>
                        </div>
                        <div>
                            <label className="font-bold block truncate text-wrap">
                                Completed quantity
                            </label>
                            <div className="bg-white p-2 rounded-md shadow-sm truncate">
                                {product.completedQuantity}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};
export default OrderProduct;
