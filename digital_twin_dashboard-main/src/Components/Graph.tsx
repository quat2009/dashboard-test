import type { GraphNode, ProcessNodeData } from '../types';
import { useContext, useEffect, useState } from 'react';
import { MarkerType, ReactFlow, type Edge, type Node } from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import CustomNode from './UI/ProcessGraph/CustomNode';
import ProcessModal from './ProcessModal';
import Api from '../context/api-context';
import Role from '../context/role-context';

const DUMMY_DATA = ['3:D', '4:A', '2:C'];

const nodeTypes = {
    processStep: CustomNode,
};

const Graph = () => {
    const [nodes, setNodes] = useState<Node<ProcessNodeData>[]>([]);
    const [edges, setEdges] = useState<Edge[]>([]);
    const [selectedProcessID, setSelectedProcessID] = useState<string | null>(null);
    const { getGraph } = useContext(Api);
    const { processDetails } = useContext(Role);

    const calculateNodes = (edges: Edge[], initialNodes: GraphNode[]) => {
        const allNodeIDs = new Set(initialNodes.map((item) => item.id));
        edges.forEach((edge) => {
            allNodeIDs.add(edge.source);
            allNodeIDs.add(edge.target);
        });
        if (!allNodeIDs.size) {
            setNodes([]);
            return;
        }

        const incoming = new Map(Array.from(allNodeIDs, (id) => [id, 0]));
        const targetsBySource = new Map<string, string[]>();
        edges.forEach((edge) => {
            incoming.set(edge.target, (incoming.get(edge.target) ?? 0) + 1);
            targetsBySource.set(edge.source, [
                ...(targetsBySource.get(edge.source) ?? []),
                edge.target,
            ]);
        });

        let sourceToCheck = Array.from(allNodeIDs).filter((id) => incoming.get(id) === 0);
        if (!sourceToCheck.length) sourceToCheck = [Array.from(allNodeIDs)[0]];

        const nodes: Node<ProcessNodeData>[] = [];
        const levels: string[][] = [];
        const visited = new Set<string>();

        while (sourceToCheck.length) {
            const level = sourceToCheck.filter((id) => !visited.has(id));
            if (!level.length) break;
            levels.push(level);
            level.forEach((id) => visited.add(id));
            sourceToCheck = Array.from(
                new Set(level.flatMap((id) => targetsBySource.get(id) ?? [])),
            ).filter((id) => !visited.has(id));
        }

        Array.from(allNodeIDs)
            .filter((id) => !visited.has(id))
            .forEach((id) => levels.push([id]));

        levels.forEach((level, levelIndex) => {
            level.forEach((node, nodeIndex) => {
                nodes.push({
                    id: node,
                    position: {
                        x: -(200 * (level.length - 1)) / 2 + 200 * nodeIndex,
                        y: (levelIndex + 1) * 100,
                    },
                    data: {
                        label: initialNodes.find((item) => item.id === node)?.name || 'N/A',
                        type: DUMMY_DATA,
                        state: 'ACTIVE',
                    },
                    type: 'processStep',
                });
            });
        });

        setNodes(nodes);
    };

    const resetNodeSelection = () => {
        setNodes((prev) =>
            prev.map((node) => ({
                ...node,
                selected: false,
            })),
        );
    };

    const getProcessNameById = (id: string) => {
        const process = nodes.find((item) => item.id === id);
        return process!.data.label;
    };

    useEffect(() => {
        getGraph().then((data) => {
            if (data) {
                setEdges(data.edges);
                calculateNodes(data.edges, data.nodes);
            }
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            <div className="h-full w-full">
                <ReactFlow
                    nodes={nodes}
                    nodeTypes={nodeTypes}
                    edges={edges.map((e) => ({
                        ...e,
                        selectable: false,
                        markerEnd: {
                            type: MarkerType.ArrowClosed,
                        },
                        // animated: true,
                        // label: 'product',
                    }))}
                    nodesDraggable={false}
                    nodesConnectable={false}
                    elementsSelectable={true}
                    panOnDrag={true}
                    onNodeClick={(_event: React.MouseEvent, node: Node) => {
                        if (processDetails) {
                            setSelectedProcessID(node.id);
                        }
                    }}
                    fitView
                />
            </div>

            {selectedProcessID && processDetails && (
                <ProcessModal
                    processID={selectedProcessID}
                    name={getProcessNameById(selectedProcessID)}
                    onClose={() => {
                        resetNodeSelection();
                        setSelectedProcessID(null);
                    }}
                />
            )}
        </>
    );
};

export default Graph;
