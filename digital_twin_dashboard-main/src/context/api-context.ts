import type {
    Graph,
    OptionItem,
    Asset,
    ChartData,
    Sensor,
    ChartFilter,
    Product,
    OrderEnrichment,
    OrderListItem,
    Order,
    BaseMetric,
} from '../types';
import { createContext } from 'react';

type ApiContext = {
    login: (username: string, password: string) => Promise<boolean | undefined>;
    getUserTypes: () => Promise<OptionItem[] | undefined>;
    getKPIs: (usedID: number) => Promise<BaseMetric[] | undefined>;
    getGraph: () => Promise<Graph | undefined>;
    getProcess: (processID: string) => Promise<Asset[] | undefined>;
    getCharts: (sensorIDs: number[], filter: ChartFilter) => Promise<ChartData[] | undefined>;
    subscribeCharts: (
        sensorIDs: number[],
        filter: ChartFilter,
        onData: (data: ChartData[]) => void,
    ) => () => void;
    getSensorsDetails: (sensorIDs: number[]) => Promise<Sensor[] | undefined>;
    getOrders: () => Promise<OrderListItem[] | undefined>;
    orderProducts: (products: Product[], details?: OrderEnrichment) => Promise<boolean | undefined>;
    getCompletedOrders: () => Promise<OrderListItem[] | undefined>;
    getOrder: (orderID?: string) => Promise<Order | undefined>;
    deleteOrder: (orderID: string) => Promise<boolean | undefined>;
    completeOrder: (orderID: string) => Promise<boolean | undefined>;
    getAvailableProducts: () => Promise<Product[] | undefined>;
};

const Api = createContext<ApiContext>({
    getUserTypes: async () => undefined,
    getGraph: async () => undefined,
    getProcess: async (_processID: string) => undefined,
    login: async (_username: string, _password: string) => undefined,
    getCharts: async (_sensorIDs: number[], _filter: ChartFilter) => undefined,
    subscribeCharts:
        (_sensorIDs: number[], _filter: ChartFilter, _onData: (data: ChartData[]) => void) =>
        () => {},
    getSensorsDetails: async (_sensorIDs: number[]) => undefined,
    getAvailableProducts: async () => undefined,
    orderProducts: async (_products: Product[], _details?: OrderEnrichment) => undefined,
    getOrders: async () => undefined,
    getOrder: async (_orderID?: string) => undefined,
    completeOrder: async (_orderID: string) => undefined,
    deleteOrder: async (_orderID: string) => undefined,
    getCompletedOrders: async () => undefined,
    getKPIs: async (_userID: number) => undefined,
});

export default Api;
