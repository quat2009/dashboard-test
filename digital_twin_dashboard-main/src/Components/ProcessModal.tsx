import type { Asset, NumberType, ChartFilter as ChartFilterType } from '../types';

import { useContext, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { IoCloseOutline, IoEyeOutline, IoEyeOffOutline } from 'react-icons/io5';

import ChartFilter from './UI/ProcessModal/ChartFilter';
import NumberInput from './UI/inputs/NumberInput';
import Chart from './UI/ProcessModal/Chart';
import Role from '../context/role-context';
import Api from '../context/api-context';

type ProcessModalProps = {
    processID: string;
    name: string;
    onClose: () => void;
};

const ProcessModal = ({ processID, name, onClose }: ProcessModalProps) => {
    const [data, setData] = useState<Asset[]>();
    const [filter, setFilter] = useState<ChartFilterType>();
    const [selectedSensorIDs, setSelectedSensorIDs] = useState<number[]>();
    const { getProcess } = useContext(Api);
    const { actions } = useContext(Role);

    useEffect(() => {
        getProcess(processID).then((data) => data && setData(data));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onDataValueChange = (assetID: number, sensorID: number, value: number | undefined) => {
        setData(
            (prev) =>
                prev &&
                prev.map((item) =>
                    item.assetID === assetID
                        ? {
                              ...item,
                              sensors: item.sensors.map((sensor) =>
                                  sensor.id === sensorID ? { ...sensor, value: value } : sensor,
                              ),
                          }
                        : item,
                ),
        );
    };

    const handleChartToggle = (sensorID: number) => {
        if (selectedSensorIDs && selectedSensorIDs.includes(sensorID)) {
            if (selectedSensorIDs.length === 1) {
                setSelectedSensorIDs(undefined);
            } else {
                setSelectedSensorIDs((prev) =>
                    prev ? [...prev.filter((item) => item !== sensorID)] : undefined,
                );
            }
        } else {
            setSelectedSensorIDs((prev) => (prev ? [...prev, sensorID] : [sensorID]));
        }
    };

    return (
        <>
            {createPortal(
                <>
                    <div className="fixed inset-0 z-50">
                        <div className="absolute inset-0 bg-black/50" />

                        <div
                            className="relative z-10 flex h-full items-center justify-center"
                            onClick={onClose}
                        >
                            <div
                                className="relative min-w-[550px] w-[1100px] max-h-[80vh] overflow-y-auto bg-neutral-200 rounded-lg shadow-lg p-10 scrollbar-track-rounded"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <button className="absolute top-5 right-5" onClick={onClose}>
                                    <IoCloseOutline className="hover:cursor-pointer" size={28} />
                                </button>

                                <span className="absolute top-5 left-5 text-gray-700 font-bold text-2xl">
                                    {name}
                                </span>
                                <div className="h-full flex items-start justify-center flex-col pt-10">
                                    <div className="grid grid-cols-[repeat(auto-fit,minmax(400px,1fr))] gap-3 w-full">
                                        {data &&
                                            data.map((item) => (
                                                <div
                                                    className="bg-white shadow-lg p-3 rounded-xl flex gap-3 flex-col pb-4"
                                                    key={item.assetID}
                                                >
                                                    <p className="text-gray-700 font-semibold text-lg">
                                                        {item.assetName}
                                                    </p>
                                                    {item.sensors.map((sensor) => (
                                                        <div
                                                            className="grid grid-cols-[30%_30%_20%_20%] gap-2 ml-[7%] items-center"
                                                            key={`${item.assetID}-${sensor.id}`}
                                                        >
                                                            <p className="text-gray-700 font-semibold">
                                                                {sensor.name}
                                                            </p>
                                                            <NumberInput
                                                                type={sensor.type as NumberType}
                                                                value={sensor.value}
                                                                min={sensor.min}
                                                                disabled={!actions}
                                                                onValueChange={(value) =>
                                                                    onDataValueChange(
                                                                        item.assetID,
                                                                        sensor.id,
                                                                        value,
                                                                    )
                                                                }
                                                            />
                                                            <p className="text-gray-700 w-fit">
                                                                {sensor.unit}
                                                            </p>
                                                            {selectedSensorIDs?.includes(
                                                                sensor.id,
                                                            ) ? (
                                                                <IoEyeOutline
                                                                    size={25}
                                                                    className="hover:cursor-pointer"
                                                                    onClick={() =>
                                                                        handleChartToggle(sensor.id)
                                                                    }
                                                                />
                                                            ) : (
                                                                <IoEyeOffOutline
                                                                    size={25}
                                                                    className="hover:cursor-pointer"
                                                                    onClick={() =>
                                                                        handleChartToggle(sensor.id)
                                                                    }
                                                                />
                                                            )}
                                                        </div>
                                                    ))}
                                                </div>
                                            ))}
                                    </div>
                                </div>

                                {selectedSensorIDs && (
                                    <div className="flex flex-col items-center mt-10 w-full bg-white p-5 rounded-xl shadow-lg pt-8">
                                        <ChartFilter onFilterChange={setFilter} />
                                        {filter && (
                                            <Chart sensorIDs={selectedSensorIDs} filter={filter} />
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </>,
                document.getElementById('modal')!,
            )}
        </>
    );
};

export default ProcessModal;
