import type { Page } from '../../types';

import { useContext } from 'react';
import { Navigate } from 'react-router';

import Global from '../../context/global-context';
import Role from '../../context/role-context';
import Header from '../Header';

type ProtectedRouteType = {
    children: React.ReactElement;
    required: Page;
};

const ProtectedRoute = ({ children, required }: ProtectedRouteType) => {
    const { isUserLoggedIn } = useContext(Global);
    const { orderPage, processPage } = useContext(Role);

    if (!isUserLoggedIn) return <Navigate to="/login" replace />;

    if (required.includes('PROCESS') && !processPage) return <Navigate to="/" replace />;
    if (required.includes('ORDER') && !orderPage) return <Navigate to="/" replace />;

    return (
        <div className="w-screen h-screen flex flex-col">
            <Header />
            {children}
        </div>
    );
};

export default ProtectedRoute;
