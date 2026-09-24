import { useContext } from 'react';
import { IoLogOut, IoThermometerOutline, IoWaterSharp } from 'react-icons/io5';

import Global from '../../../context/global-context';

const OverView = () => {
    const { globalTemperature, globalHumidity, logout } = useContext(Global);

    return (
        <div className="ml-auto flex gap-10">
            <div className="flex gap-4">
                <div className="flex">
                    <IoThermometerOutline size={28} className="text-amber-300" />
                    <span className="font-semibold text-lg text-nowrap">
                        {globalTemperature ? `${globalTemperature} °C` : 'N/A'}
                    </span>
                </div>
                <div className="flex">
                    <IoWaterSharp size={28} className="text-amber-300" />
                    <span className="font-semibold text-lg text-nowrap">
                        {globalHumidity ? `${globalHumidity} %` : 'N/A'}
                    </span>
                </div>
            </div>

            <IoLogOut size={28} className="text-amber-300 hover:cursor-pointer" onClick={logout} />
        </div>
    );
};

export default OverView;
