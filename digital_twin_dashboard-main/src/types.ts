export type OptionItem = {
    id: number;
    name: string;
};

export type NumberType = 'int' | 'float' | 'percent';

export type GraphNode = {
    id: string;
    name: string;
};

export type GraphEdge = {
    id: string;
    source: string;
    target: string;
};

export type Graph = {
    nodes: GraphNode[];
    edges: GraphEdge[];
};

export type BaseMetric = {
    id: number;
    name: string;
    unit: string;
    value: number;
    type: NumberType;
};

export type Sensor = Omit<BaseMetric, 'value'> & {
    value?: number;
    min?: number;
    disabled?: boolean;
    color?: string;
    axisID?: string;
};

export type Asset = {
    assetID: number;
    assetName: string;
    sensors: Sensor[];
};

export type ProcessNodeData = {
    label: string;
    type: string[];
    state: 'ACTIVE' | 'ERROR' | 'DONE';
};

export type ChartData = {
    xAxis: string;
    [sensorId: string]: number | string;
};

export type ChartFilter = {
    samplingFrequency: number;
    fromDate: string;
    toDate: string;
};

export type Product = {
    id: string;
    imageUrl?: string;
    maxQuantity?: number;
    quantity?: number;
    completedQuantity?: number;
};

export type OrderEnrichment = {
    customerName: string | undefined;
    fulfillmentDate: string | undefined;
    priority: boolean;
};

export type OrderListItem = {
    orderID: string;
    customerName?: string;
    orderDate?: string;
    fulfillmentDate?: string;
    priority?: boolean;
};

export type Order = {
    details: OrderListItem;
    products: Product[];
};

export type Privileges = {
    orderPage: boolean;
    processPage: boolean;
    processDetails: boolean;
    actions: boolean;
    graphs: boolean;
    orderForm: boolean;
    orderList: boolean;
    completedOrderList: boolean;
    orderDetailsModal: boolean;
    orderCompleteButton: boolean;
    orderDeleteButton: boolean;
    orderDetails: boolean;
    toggleSwitch: boolean;
};

export type AxisGroups = {
    left: string[];
    right: string[];
};

export type Domain = [number, number];

export type Page = 'ORDER' | 'PROCESS';
