import { useContext } from 'react';
import { Navigate } from 'react-router';

import Role from '../../context/role-context';

const HomeRedirect = () => {
    const { processPage, orderPage } = useContext(Role);

    if (processPage) return <Navigate to="/process" replace />;

    if (orderPage) return <Navigate to="/order" replace />;

    return <Navigate to="/unauthorized" replace />;
};

export default HomeRedirect;
