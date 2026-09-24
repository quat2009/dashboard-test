import type { Sensor } from '../../../types';

type SensorLegendProps = {
    sensors?: Sensor[];
};

const SensorLegend = ({ sensors }: SensorLegendProps) => {
    if (!sensors) return <></>;

    return (
        <ul className="w-[30%] flex flex-row gap-2 flex-wrap justify-center">
            {sensors.map((sensor) => (
                <li key={sensor.id} className="flex flex-row items-center gap-1">
                    <span
                        className="w-3 h-3 rounded-lg"
                        style={{
                            display: 'inline-block',
                            backgroundColor: sensor.color,
                        }}
                    />
                    {sensor.name}
                </li>
            ))}
        </ul>
    );
};

export default SensorLegend;
