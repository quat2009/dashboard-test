import Graph from '../Graph';
import KPIs from '../KPIs';

const Process = () => {
    return (
        <div className="w-full h-full grid grid-cols-[75%_25%] justify-items-center">
            <Graph />
            <KPIs />
        </div>
    );
};
export default Process;
