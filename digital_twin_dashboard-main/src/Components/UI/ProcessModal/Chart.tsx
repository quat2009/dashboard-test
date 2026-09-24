import type { AxisGroups, ChartData, ChartFilter, Domain, Sensor } from '../../../types';

import { useContext, useEffect, useState } from 'react';
import { LineChart, XAxis, YAxis, CartesianGrid, Tooltip, Line } from 'recharts';

import { CHART_AXIS_TOLERANCE } from '../../../util/constants';
import { generateHexColor } from '../../../util/functions';
import SensorLegend from '../Chart/SensorLegend';
import Api from '../../../context/api-context';

const MAX_CHART_POINTS = 5_000;

type ChartProps = {
    sensorIDs: number[];
    filter: ChartFilter;
};

const mergeChartData = (...groups: ChartData[][]): ChartData[] => {
    const byTime = new Map<string, ChartData>();

    groups.forEach((group) => {
        group.forEach((point) => {
            byTime.set(point.xAxis, {
                ...byTime.get(point.xAxis),
                ...point,
            });
        });
    });

    return Array.from(byTime.values())
        .sort((left, right) => left.xAxis.localeCompare(right.xAxis))
        .slice(-MAX_CHART_POINTS);
};

const Chart = ({ sensorIDs, filter }: ChartProps) => {
    const [data, setData] = useState<ChartData[]>();
    const [sensors, setSensors] = useState<Sensor[]>();
    const [domains, setDomains] = useState<{ left: Domain; right: Domain }>();

    const leftLegend = sensors?.filter((sensor) => sensor.axisID === 'left');
    const rightLegend = sensors?.filter((sensor) => sensor.axisID === 'right');

    const { getCharts, getSensorsDetails, subscribeCharts } = useContext(Api);

    useEffect(() => {
        getSensorsDetails(sensorIDs).then((data) =>
            setSensors((prev) => {
                if (!data) return prev;
                const coloredSensors = data.map((item) => {
                    const sensor = prev ? prev.find((sensor) => sensor.id === item.id) : undefined;
                    if (sensor) return sensor;
                    return { ...item, color: generateHexColor() };
                });
                return coloredSensors;
            }),
        );

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sensorIDs]);

    useEffect(() => {
        let active = true;
        const unsubscribe = subscribeCharts(sensorIDs, filter, (incoming) => {
            if (!active) return;
            setData((previous) => mergeChartData(previous ?? [], incoming));
        });

        getCharts(sensorIDs, filter)
            .then((initialData) => {
                if (!active) return;
                // Live points can arrive while history is loading. Merge history
                // first so an already received live value wins on overlap.
                setData((previous) => mergeChartData(initialData ?? [], previous ?? []));
            })
            .catch((error: unknown) => console.error('Could not load chart data', error));

        return () => {
            active = false;
            unsubscribe();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filter, sensorIDs]);

    useEffect(() => {
        if (data?.length) calculateGrouping(data);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data]);

    const groupByAverage = (averages: Record<string, number>): AxisGroups => {
        const entries = Object.entries(averages);

        if (!entries.length) return { left: [], right: [] };
        if (entries.length === 1) return { left: [entries[0][0]], right: [] };

        const min = entries.reduce((a, b) => (a[1] < b[1] ? a : b));
        const max = entries.reduce((a, b) => (a[1] > b[1] ? a : b));

        const left: string[] = [min[0]];
        let leftAvg: number = min[1];
        const right: string[] = [max[0]];
        let rightAvg: number = max[1];

        for (const [id, avg] of entries) {
            if (id === min[0] || id === max[0]) continue;

            const distanceLeft = Math.abs(avg - leftAvg);
            const distanceRight = Math.abs(avg - rightAvg);

            if (distanceLeft <= distanceRight) {
                left.push(id);
                leftAvg = (avg + leftAvg) / 2;
            } else {
                right.push(id);
                rightAvg = (avg + rightAvg) / 2;
            }
        }

        if (Math.abs(leftAvg / rightAvg) > CHART_AXIS_TOLERANCE) {
            return {
                left: left.concat(right),
                right: [],
            };
        }

        return {
            left,
            right,
        };
    };

    const calculateGrouping = (data: ChartData[]) => {
        if (!data.length) return;
        const sensorKeys = Array.from(
            new Set(data.flatMap((point) => Object.keys(point))),
        ).filter((key) => key !== 'xAxis');
        const averages = sensorKeys
            .reduce<Record<string, number>>((acc, id) => {
                const values = data
                    .map((point) => Number(point[id]))
                    .filter(Number.isFinite);
                if (values.length) {
                    acc[id] = values.reduce((sum, value) => sum + value, 0) / values.length;
                }
                return acc;
            }, {});

        const grouping = groupByAverage(averages);
        const leftDomain = getAxisDomain(data, grouping.left);
        const rightDomain = getAxisDomain(data, grouping.right);

        setDomains({ left: leftDomain, right: rightDomain });

        setSensors((prev) => {
            if (!prev) return;
            return prev.map((item) => ({
                ...item,
                axisID: grouping.left.includes(String(item.id)) ? 'left' : 'right',
            }));
        });
    };

    const getAxisDomain = (data: ChartData[], sensorIDs: string[]): Domain => {
        if (!sensorIDs.length) return [0, 1];
        const values = data
            .flatMap((point) => sensorIDs.map((id) => Number(point[id])))
            .filter(Number.isFinite);

        if (!values.length) return [0, 1];

        const min = Math.min(...values);
        const max = Math.max(...values);
        const range = max - min;

        const padding = range > 0 ? range * 0.05 : Math.max(Math.abs(min) * 0.01, 0.01);

        return [min - padding, max + padding];
    };

    return (
        <>
            {sensors && (
                <>
                    <LineChart
                        style={{
                            width: '100%',
                            maxHeight: '400px',
                            aspectRatio: 1.318,
                        }}
                        responsive
                        data={data}
                        margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="xAxis" />
                        <YAxis
                            yAxisId="left"
                            width="auto"
                            orientation="left"
                            domain={domains?.left}
                        />
                        <YAxis
                            yAxisId="right"
                            width="auto"
                            orientation="right"
                            domain={domains?.right}
                        />
                        <Tooltip />
                        {sensors.map((item) => (
                            <Line
                                key={item.id}
                                yAxisId={item.axisID}
                                type="monotone"
                                dataKey={item.id}
                                name={item.name}
                                stroke={item.color}
                                isAnimationActive={false}
                                strokeWidth={2}
                            />
                        ))}
                    </LineChart>

                    <div className="flex flex-row justify-between w-[80%]">
                        <SensorLegend sensors={leftLegend} />
                        <SensorLegend sensors={rightLegend} />
                    </div>
                </>
            )}
        </>
    );
};

export default Chart;
