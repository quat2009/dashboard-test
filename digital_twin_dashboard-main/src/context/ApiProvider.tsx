import type {
    Asset,
    BaseMetric,
    ChartData,
    ChartFilter,
    Graph,
    OptionItem,
    Order,
    OrderEnrichment,
    OrderListItem,
    Product,
    Sensor,
} from '../types';

import { images } from '../assets/dummy_images';
import Api from './api-context';

type ApiProviderProps = {
    children: React.ReactElement[] | React.ReactElement;
};

const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || '/api').replace(/\/$/, '');
const configuredLiveTolerance = Number(import.meta.env.VITE_LIVE_TOLERANCE_MS ?? 90_000);
const LIVE_TOLERANCE_MS = Number.isFinite(configuredLiveTolerance)
    ? configuredLiveTolerance
    : 90_000;

const apiUrl = (path: string) => `${API_BASE_URL}${path}`;

const websocketUrl = (path: string) => {
    const configured = (import.meta.env.VITE_WS_BASE_URL || '').replace(/\/$/, '');
    if (configured) return `${configured}${path}`;

    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    const apiPath = API_BASE_URL.startsWith('/') ? API_BASE_URL : new URL(API_BASE_URL).pathname;
    return `${protocol}//${window.location.host}${apiPath}${path}`;
};

const request = async <T,>(path: string, options?: RequestInit): Promise<T> => {
    const response = await fetch(apiUrl(path), {
        ...options,
        headers: {
            ...(options?.body ? { 'Content-Type': 'application/json' } : {}),
            ...options?.headers,
        },
    });

    if (!response.ok) {
        let detail = `${response.status} ${response.statusText}`;
        try {
            const body = (await response.json()) as { detail?: unknown; msg?: string };
            if (body.msg) detail = body.msg;
            else if (body.detail) detail = JSON.stringify(body.detail);
        } catch {
            // Keep the HTTP status when the response has no JSON body.
        }
        throw new Error(detail);
    }

    return (await response.json()) as T;
};

const addProductImages = (products: Product[]): Product[] =>
    products.map((product) => ({
        ...product,
        imageUrl: product.imageUrl ?? images[product.id as keyof typeof images] ?? images.special,
    }));

const ApiProvider = ({ children }: ApiProviderProps) => {
    const getUserTypes = () => request<OptionItem[]>('/user-types');

    const getGraph = () => request<Graph>('/process/graph');

    const getProcess = (processID: string) =>
        request<Asset[]>(`/process/${encodeURIComponent(processID)}`);

    const login = (username: string, password: string) =>
        request<boolean>('/auth/login', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
        });

    const getCharts = (sensorIDs: number[], filter: ChartFilter) =>
        request<ChartData[]>('/sensors/chart', {
            method: 'POST',
            body: JSON.stringify({ sensorIds: sensorIDs, filter }),
        });

    const subscribeCharts = (
        sensorIDs: number[],
        filter: ChartFilter,
        onData: (data: ChartData[]) => void,
    ) => {
        const toDate = new Date(filter.toDate);
        if (
            Number.isNaN(toDate.getTime()) ||
            Math.abs(Date.now() - toDate.getTime()) > LIVE_TOLERANCE_MS
        ) {
            return () => {};
        }

        let active = true;
        let socket: WebSocket | undefined;
        let retryTimer: ReturnType<typeof setTimeout> | undefined;
        let retryDelay = 500;
        let resumeToDate = filter.toDate;

        const connect = () => {
            if (!active) return;
            socket = new WebSocket(websocketUrl('/ws/sensors/chart'));
            socket.onopen = () => {
                retryDelay = 500;
                socket?.send(
                    JSON.stringify({
                        sensorIds: sensorIDs,
                        filter: { ...filter, toDate: resumeToDate },
                        source: 'real',
                    }),
                );
            };
            socket.onmessage = (event) => {
                const payload = JSON.parse(event.data) as ChartData[];
                if (Array.isArray(payload)) {
                    onData(payload);
                    resumeToDate = payload.at(-1)?.xAxis ?? resumeToDate;
                }
            };
            socket.onerror = (event) => console.error('Chart WebSocket error', event);
            socket.onclose = (event) => {
                if (!active || event.code === 1000) return;
                retryTimer = setTimeout(connect, retryDelay);
                retryDelay = Math.min(retryDelay * 2, 10_000);
            };
        };

        connect();
        return () => {
            active = false;
            if (retryTimer) clearTimeout(retryTimer);
            socket?.close(1000, 'Chart closed');
        };
    };

    const getSensorsDetails = (sensorIDs: number[]) => {
        const query = new URLSearchParams();
        sensorIDs.forEach((sensorID) => query.append('sensorIDs', String(sensorID)));
        return request<Sensor[]>(`/sensors?${query.toString()}`);
    };

    const getAvailableProducts = async () =>
        addProductImages(await request<Product[]>('/products'));

    const orderProducts = (products: Product[], details?: OrderEnrichment) =>
        request<boolean>('/orders/add', {
            method: 'POST',
            body: JSON.stringify({ products, details }),
        });

    const getOrders = () => request<OrderListItem[]>('/orders');

    const getOrder = async (orderID?: string) => {
        const order = await request<Order>(
            orderID ? `/orders/${encodeURIComponent(orderID)}` : '/orders/current',
        );
        return { ...order, products: addProductImages(order.products) };
    };

    const completeOrder = (orderID: string) =>
        request<boolean>(`/orders/${encodeURIComponent(orderID)}/complete`, {
            method: 'POST',
        });

    const deleteOrder = (orderID: string) =>
        request<boolean>(`/orders/${encodeURIComponent(orderID)}/delete`, {
            method: 'DELETE',
        });

    const getCompletedOrders = () => request<OrderListItem[]>('/orders/completed');

    const getKPIs = (userID: number) => request<BaseMetric[]>(`/kpis/${userID}`);

    const apiContext = {
        getUserTypes,
        getGraph,
        getProcess,
        login,
        getCharts,
        subscribeCharts,
        getSensorsDetails,
        getAvailableProducts,
        orderProducts,
        getOrders,
        getOrder,
        completeOrder,
        deleteOrder,
        getCompletedOrders,
        getKPIs,
    };

    return <Api.Provider value={apiContext}>{children}</Api.Provider>;
};

export default ApiProvider;
