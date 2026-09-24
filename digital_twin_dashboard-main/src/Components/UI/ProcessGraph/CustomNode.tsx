import type { ProcessNodeData } from '../../../types';
import { type NodeProps, type Node, Handle, Position, ViewportPortal } from '@xyflow/react';

import { useState } from 'react';

const CustomNode = ({
    data,
    width,
    positionAbsoluteX,
    positionAbsoluteY,
}: NodeProps<Node<ProcessNodeData>>) => {
    const [hovered, setHovered] = useState(false);

    return (
        <div key={data.label}>
            <div
                className="group relative outline-1 p-3 px-6 rounded-xl hover:cursor-pointer hover:z-100"
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
            >
                <div className="hover:cursor-pointer flex flex-row items-center justify-between gap-3">
                    <label className="hover:cursor-pointer">{data.label}</label>
                    <div className="bg-violet-300 px-2 rounded-md">3</div>
                </div>

                <Handle type="source" position={Position.Bottom} isConnectable={false} />
                <Handle type="target" position={Position.Top} isConnectable={false} />
            </div>

            {hovered && (
                <ViewportPortal>
                    <div
                        style={{
                            position: 'absolute',
                            left: positionAbsoluteX + (width ?? 150) + 5,
                            top: positionAbsoluteY,
                            zIndex: 1000,
                        }}
                        className="bg-amber-300 text-white text-xs px-3 py-2 rounded-xl shadow-md"
                    >
                        {data.type.map((item) => (
                            <div key={item}>{item}</div>
                        ))}
                    </div>
                </ViewportPortal>
            )}
        </div>
    );
};

export default CustomNode;
