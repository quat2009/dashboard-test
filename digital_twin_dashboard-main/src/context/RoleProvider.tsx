import type { Privileges } from '../types';

import { useContext, useEffect, useState } from 'react';

import Role from './role-context';
import Global from './global-context';

type RoleProviderProps = {
    children: React.ReactElement[] | React.ReactElement;
};

const RoleProvider = ({ children }: RoleProviderProps) => {
    const [privileges, setPrivileges] = useState<Privileges>();
    const { selectedUserType } = useContext(Global);

    useEffect(() => {
        const privilegesHandler = () => {
            if (selectedUserType) {
                switch (selectedUserType.id) {
                    case 1:
                        //Customer
                        setPrivileges({
                            orderPage: true,
                            processPage: false,
                            processDetails: false,
                            actions: false,
                            graphs: false,
                            orderForm: true,
                            orderList: false,
                            completedOrderList: false,
                            orderDetailsModal: false,
                            orderCompleteButton: false,
                            orderDeleteButton: false,
                            orderDetails: false,
                            toggleSwitch: false,
                        });
                        break;
                    case 2:
                        // Operator
                        setPrivileges({
                            orderPage: true,
                            processPage: true,
                            processDetails: false,
                            actions: false,
                            graphs: false,
                            orderForm: false,
                            orderList: false,
                            completedOrderList: false,
                            orderDetailsModal: false,
                            orderCompleteButton: false,
                            orderDeleteButton: false,
                            orderDetails: true,
                            toggleSwitch: false,
                        });
                        break;
                    case 3:
                        // Technician
                        setPrivileges({
                            orderPage: false,
                            processPage: true,
                            processDetails: true,
                            actions: true,
                            graphs: true,
                            orderForm: false,
                            orderList: false,
                            completedOrderList: false,
                            orderDetailsModal: false,
                            orderCompleteButton: false,
                            orderDeleteButton: false,
                            orderDetails: false,
                            toggleSwitch: false,
                        });
                        break;
                    case 4:
                        // Shift Supervisor
                        setPrivileges({
                            orderPage: true,
                            processPage: true,
                            processDetails: false,
                            actions: false,
                            graphs: false,
                            orderForm: false,
                            orderList: true,
                            completedOrderList: false,
                            orderDetailsModal: true,
                            orderCompleteButton: true,
                            orderDeleteButton: false,
                            orderDetails: false,
                            toggleSwitch: false,
                        });
                        break;
                    case 5:
                        // Engineer
                        setPrivileges({
                            orderPage: false,
                            processPage: true,
                            processDetails: true,
                            actions: true,
                            graphs: true,
                            orderForm: false,
                            orderList: false,
                            completedOrderList: false,
                            orderDetailsModal: false,
                            orderCompleteButton: false,
                            orderDeleteButton: false,
                            orderDetails: false,
                            toggleSwitch: true,
                        });
                        break;
                    case 6:
                        // Manager
                        setPrivileges({
                            orderPage: true,
                            processPage: true,
                            processDetails: true,
                            actions: false,
                            graphs: false,
                            orderForm: false,
                            orderList: true,
                            completedOrderList: true,
                            orderDetailsModal: true,
                            orderCompleteButton: true,
                            orderDeleteButton: true,
                            orderDetails: false,
                            toggleSwitch: false,
                        });
                        break;
                    default:
                        setPrivileges({
                            orderPage: false,
                            processPage: false,
                            processDetails: false,
                            actions: false,
                            graphs: false,
                            orderForm: false,
                            orderList: false,
                            completedOrderList: false,
                            orderDetailsModal: false,
                            orderCompleteButton: false,
                            orderDeleteButton: false,
                            orderDetails: false,
                            toggleSwitch: false,
                        });
                        break;
                }
            }
        };

        privilegesHandler();
    }, [selectedUserType]);

    const roleContext = {
        orderPage: privileges?.orderPage ?? false,
        processPage: privileges?.processPage ?? false,
        toggleSwitch: privileges?.toggleSwitch ?? false,
        orderForm: privileges?.orderForm ?? false,
        orderList: privileges?.orderList ?? false,
        completedOrderList: privileges?.completedOrderList ?? false,
        orderDetailsModal: privileges?.orderDetailsModal ?? false,
        orderDetails: privileges?.orderDetails ?? false,
        orderCompleteButton: privileges?.orderCompleteButton ?? false,
        orderDeleteButton: privileges?.orderDeleteButton ?? false,
        processDetails: privileges?.processDetails ?? false,
        graphs: privileges?.graphs ?? false,
        actions: privileges?.actions ?? false,
    };

    return <Role.Provider value={roleContext}>{children}</Role.Provider>;
};

export default RoleProvider;
