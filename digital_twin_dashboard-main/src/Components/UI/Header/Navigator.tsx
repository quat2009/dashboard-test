import { useContext } from 'react';
import { useLocation, useNavigate } from 'react-router';

import Role from '../../../context/role-context';

const Navigator = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const { orderPage, processPage } = useContext(Role);

    const navigationHandler = (location: 'PROCESS' | 'ORDER') => {
        switch (location) {
            case 'PROCESS':
                navigate('/process');
                break;
            case 'ORDER':
                navigate('/order');
                break;
        }
    };

    return (
        <div className=" mr-auto flex flex-row justify-center items-center gap-6">
            {processPage && (
                <div
                    className="relative cursor-pointer"
                    onClick={() => navigationHandler('PROCESS')}
                >
                    <span className="text-md font-semibold">Process</span>
                    <span
                        className={`absolute left-0 -bottom-1 h-0.5 w-full bg-amber-300 transition-transform duration-300 origin-left ${location.pathname === '/process' ? 'scale-x-100' : 'scale-x-0'}`}
                    />
                </div>
            )}

            {orderPage && (
                <div className="relative cursor-pointer" onClick={() => navigationHandler('ORDER')}>
                    <span className="text-md font-semibold">Order</span>
                    <span
                        className={`absolute left-0 -bottom-1 h-0.5 w-full bg-amber-300 transition-transform duration-300 origin-left ${location.pathname === '/order' ? 'scale-x-100' : 'scale-x-0'}`}
                    />
                </div>
            )}
        </div>
    );
};
export default Navigator;
