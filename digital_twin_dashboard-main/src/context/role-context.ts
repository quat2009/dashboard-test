import { createContext } from 'react';
import type { Privileges } from '../types';

const Role = createContext<Privileges>({
    orderPage: false,
    processPage: false,
    toggleSwitch: false,
    orderForm: false,
    orderList: false,
    completedOrderList: false,
    orderDetailsModal: false,
    orderDetails: false,
    orderCompleteButton: false,
    orderDeleteButton: false,
    processDetails: false,
    graphs: false,
    actions: false,
});

export default Role;
