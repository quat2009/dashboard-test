# Dummy API data structures

This file preserves the dummy data structures that were present in
`src/context/ApiProvider.tsx` before commit `c718ab3`. It is documentation only;
the active provider uses the backend API and WebSocket.

The snippets assume the types from `src/types.ts` and the image map from
`src/assets/dummy_images`:

```ts
import type {
    Asset,
    BaseMetric,
    ChartData,
    Graph,
    GraphEdge,
    GraphNode,
    OptionItem,
    Order,
    OrderListItem,
    Product,
    Sensor,
} from '../src/types';
import { images } from '../src/assets/dummy_images';
```

## Sensors

```ts
const DUMMY_SENSORS: Sensor[] = [
    { id: 1, name: 'Speed', unit: '%', value: 70, type: 'percent' },
    {
        id: 2,
        name: 'Temperature',
        unit: '?C',
        value: 125.5,
        type: 'float',
        min: -120,
    },
    { id: 3, name: 'Pressure', unit: 'bar', value: 5, type: 'int' },
    { id: 4, name: 'Flow Rate', unit: 'L/min', value: 12.3, type: 'float' },
    { id: 5, name: 'Batch Count', unit: 'pcs', value: 42, type: 'int' },
    { id: 6, name: 'Speed', unit: '%', value: 70, type: 'percent' },
    {
        id: 7,
        name: 'Temperature',
        unit: '?C',
        value: 125.5,
        type: 'float',
        min: -120,
    },
    { id: 8, name: 'Batch Count', unit: 'pcs', value: 42, type: 'int' },
];
```

## KPIs

```ts
const DUMMY_KPIs: BaseMetric[] = [
    {
        id: 1,
        name: 'Overall Equipment Effectiveness',
        unit: '%',
        value: 87.5,
        type: 'percent',
    },
    {
        id: 2,
        name: 'Production Rate',
        unit: 'pcs/h',
        value: 245,
        type: 'int',
    },
    {
        id: 3,
        name: 'Average Cycle Time',
        unit: 's',
        value: 42.8,
        type: 'float',
    },
    {
        id: 4,
        name: 'Energy Consumption',
        unit: 'kWh',
        value: 356.4,
        type: 'float',
    },
    {
        id: 5,
        name: 'Downtime',
        unit: 'min',
        value: 18,
        type: 'int',
    },
    {
        id: 6,
        name: 'Defect Rate',
        unit: '%',
        value: 1.8,
        type: 'percent',
    },
];
```

## User types

```ts
const USER_TYPES: OptionItem[] = [
    { id: 1, name: 'Customer' },
    { id: 2, name: 'Operator' },
    { id: 3, name: 'Technician' },
    { id: 4, name: 'Shift Supervisor' },
    { id: 5, name: 'Engineer' },
    { id: 6, name: 'Manager' },
];
```

## Process graph

```ts
const DUMMY_NODES: GraphNode[] = [
    { id: 'p1', name: 'Process 1' },
    { id: 'p2', name: 'Process 2' },
    { id: 'p3', name: 'Process 3' },
    { id: 'p4', name: 'Process 4' },
    { id: 'p5', name: 'Process 5' },
    { id: 'p6', name: 'Process 6' },
    { id: 'p7', name: 'Process 7' },
    { id: 'p8', name: 'Process 8' },
    { id: 'p9', name: 'Process 9' },
    { id: 'p10', name: 'Process 10' },
    { id: 'p11', name: 'Process 11' },
    { id: 'p12', name: 'Process 12' },
    { id: 'p13', name: 'Process 13' },
    { id: 'p14', name: 'Process 14' },
    { id: 'p15', name: 'Process 15' },
    { id: 'p16', name: 'Process 16' },
    { id: 'p17', name: 'Process 17' },
    { id: 'p18', name: 'Process 18' },
    { id: 'p19', name: 'Process 19' },
    { id: 'p20', name: 'Process 20' },
];

const DUMMY_EDGES: GraphEdge[] = [
    { id: 'p1-p3', source: 'p1', target: 'p3' },
    { id: 'p1-p4', source: 'p1', target: 'p4' },
    { id: 'p2-p5', source: 'p2', target: 'p5' },
    { id: 'p3-p6', source: 'p3', target: 'p6' },
    { id: 'p4-p6', source: 'p4', target: 'p6' },
    { id: 'p5-p7', source: 'p5', target: 'p7' },
    { id: 'p6-p8', source: 'p6', target: 'p8' },
    { id: 'p7-p9', source: 'p7', target: 'p9' },
    { id: 'p7-p10', source: 'p7', target: 'p10' },
    { id: 'p8-p11', source: 'p8', target: 'p11' },
    { id: 'p9-p12', source: 'p9', target: 'p12' },
    { id: 'p10-p12', source: 'p10', target: 'p12' },
    { id: 'p10-p13', source: 'p10', target: 'p13' },
    { id: 'p11-p14', source: 'p11', target: 'p14' },
    { id: 'p12-p15', source: 'p12', target: 'p15' },
    { id: 'p13-p16', source: 'p13', target: 'p16' },
    { id: 'p14-p17', source: 'p14', target: 'p17' },
    { id: 'p15-p17', source: 'p15', target: 'p17' },
    { id: 'p16-p18', source: 'p16', target: 'p18' },
    { id: 'p17-p19', source: 'p17', target: 'p19' },
    { id: 'p18-p20', source: 'p18', target: 'p20' },
    { id: 'p3-p9', source: 'p3', target: 'p9' },
    { id: 'p5-p8', source: 'p5', target: 'p8' },
    { id: 'p11-p15', source: 'p11', target: 'p15' },
    { id: 'p12-p18', source: 'p12', target: 'p18' },
];

const DUMMY_GRAPH: Graph = {
    edges: DUMMY_EDGES,
    nodes: DUMMY_NODES,
};
```

## Process details

```ts
const DUMMY_PROCESS: Asset[] = [
    {
        assetID: 1,
        assetName: 'Conveyor Speed',
        sensors: [DUMMY_SENSORS[0], DUMMY_SENSORS[1]],
    },
    {
        assetID: 2,
        assetName: 'Inspection machine',
        sensors: [DUMMY_SENSORS[2], DUMMY_SENSORS[3], DUMMY_SENSORS[4]],
    },
    {
        assetID: 3,
        assetName: 'Robot arm',
        sensors: [DUMMY_SENSORS[5], DUMMY_SENSORS[6], DUMMY_SENSORS[7]],
    },
];
```

## Chart data

The original provider generated a new random value for each requested sensor and
timestamp:

```ts
const times = ['15:00', '15:05', '15:10', '15:15', '15:20', '15:25', '15:30'];

const chartData: ChartData[] = times.map((time) => ({
    xAxis: time,
    ...Object.fromEntries(
        sensorIDs.map((id) => [
            id,
            Math.floor(Math.random() * (Math.random() * (1000 - 0.001) + 0.001)),
        ]),
    ),
}));
```

## Products

```ts
const DUMMY_PRODUCT_DATA: Product[] = [
    { id: 'A', imageUrl: images.A, maxQuantity: 20 },
    { id: 'B', imageUrl: images.B, maxQuantity: 30 },
    { id: 'C', imageUrl: images.C, maxQuantity: 10 },
    { id: 'D', imageUrl: images.D, maxQuantity: 50 },
    { id: 'Special', imageUrl: images.special, maxQuantity: 5 },
];
```

## Order list

The same list was returned by both `getOrders` and `getCompletedOrders`:

```ts
const DUMMY_ORDER_LIST: OrderListItem[] = [
    {
        orderID: '1',
        customerName: 'Dummy name',
        orderDate: '2026.02.01.',
        fulfillmentDate: '2026.08.01.',
        priority: true,
    },
    {
        orderID: '2',
        customerName: 'Dummy name',
        orderDate: '2026.02.01.',
        fulfillmentDate: '2026.08.01.',
        priority: false,
    },
    {
        orderID: '3',
        customerName: 'Dummy name',
        orderDate: '2026.02.01.',
        fulfillmentDate: '2026.03.01.',
        priority: false,
    },
    {
        orderID: '4',
        customerName: 'Dummy name',
        orderDate: '2026.02.01.',
        fulfillmentDate: '2026.03.01.',
        priority: false,
    },
    {
        orderID: '5',
        customerName: 'Dummy name',
        orderDate: '2026.02.01.',
        fulfillmentDate: '2026.03.01.',
        priority: true,
    },
];
```

## Order details

```ts
const DUMMY_ORDER: Order = {
    details: {
        orderID: orderID ?? '1',
        customerName: 'Teszt Name',
        fulfillmentDate: '2026.07.01',
        orderDate: '2026.01.01',
        priority: false,
    },
    products: [
        { id: 'A', imageUrl: images.A, quantity: 2, completedQuantity: 2 },
        { id: 'B', imageUrl: images.B, quantity: 0, completedQuantity: 0 },
        { id: 'C', imageUrl: images.C, quantity: 3, completedQuantity: 2 },
        { id: 'D', imageUrl: images.D, quantity: 1, completedQuantity: 0 },
        { id: 'Special', imageUrl: images.special, quantity: 2, completedQuantity: 0 },
    ],
};
```

## Dummy operation results

The following operations always resolved to `true`:

```ts
login(username, password): Promise<boolean>
orderProducts(products, details): Promise<boolean>
completeOrder(orderID): Promise<boolean>
deleteOrder(orderID): Promise<boolean>
```
