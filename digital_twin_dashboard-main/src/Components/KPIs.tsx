import type { NumberType, Sensor } from '../types';

import { useContext, useEffect, useState } from 'react';
import NumberInput from './UI/inputs/NumberInput';
import Global from '../context/global-context';
import Api from '../context/api-context';

const KPIs = () => {
    const [kpis, setKpis] = useState<Sensor[]>();
    const { selectedUserType } = useContext(Global);
    const { getKPIs } = useContext(Api);

    useEffect(() => {
        if (selectedUserType) getKPIs(selectedUserType?.id).then((data) => data && setKpis(data));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedUserType]);

    return (
        <div className=" p-4">
            <div className="w-fit h-fit p-5 bg-neutral-50 border border-gray-200 rounded-xl drop-shadow-md">
                {kpis && (
                    <>
                        {kpis.map((kpi) => (
                            <div
                                className="grid grid-cols-[40%_35%_25%] gap-2 items-center mb-3 "
                                key={kpi.id}
                            >
                                <p className="text-gray-700 font-semibold">{kpi.name}</p>
                                <NumberInput
                                    type={kpi.type as NumberType}
                                    value={kpi.value}
                                    disabled={true}
                                    onValueChange={() => {}}
                                />
                                <p className="text-gray-700 w-fit">{kpi.unit}</p>
                            </div>
                        ))}
                    </>
                )}
            </div>
        </div>
    );
};

export default KPIs;
