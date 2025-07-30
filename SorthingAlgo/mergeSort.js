import { useEffect, useState, useRef, use } from "react";

export default function MergeSort({ arr, speedRef }) {
    const [compare, setCompare] = useState([]);
    const [swap, setSwap] = useState([]);
    const latestSpeed = useRef(speedRef);
    const [localArr, setLocalArr] = useState([...arr]);
    const stopRef = useRef(true);
    const [len, setLen] = useState(localArr.length);
    const [sorted, setSorted] = useState(false);
    const [mergeSteps, setMergeSteps] = useState([[...arr]]);

    useEffect(() => {
        setMergeSteps([[...arr]]);
        setLocalArr([...arr]);
        setLen(localArr.length);
        setSorted(false);
    }, [arr]);

    useEffect(() => {
        latestSpeed.current = speedRef;
    }, [speedRef]);

    function sleep(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }

    async function mergeSort(array, dir, val) {
        if (array.length <= 1) {
            return array;
        }

        if (stopRef.current) {
            return;
        }

        const mid = Math.floor(array.length / 2);
        const left = array.slice(0, mid);
        const right = array.slice(mid);

        setMergeSteps(prev => [...prev, [[...left], [...right]]]);
        await sleep(latestSpeed.current);

        const sortedLeft = await mergeSort(left, 0, 0);
        const sortedRight = await mergeSort(right, 1, 0);

        const merged = merge(sortedLeft, sortedRight);

        setMergeSteps(prev => [...prev, [...merged]]);
        await sleep(latestSpeed.current);
        setMergeSteps(prev => {
            const updated = [...prev];
            updated.pop();
            updated.pop();
            updated[updated.length - 1][dir] = [...merged];
            return [...updated];
        });
        await sleep(latestSpeed.current);

        if (val) {
            setMergeSteps([[...merged]]);
            setSorted(true);
            return;
        } else {
            return merged;
        }
    }

    function merge(left, right) {
        let result = [];
        let i = 0;
        let j = 0;
        while (i < left.length && j < right.length) {
            if (left[i] < right[j]) {
                result.push(left[i]);
                i++;
            } else {
                result.push(right[j]);
                j++;
            }
        }
        return result.concat(left.slice(i)).concat(right.slice(j));
    }

    return (
        <div>
            <h3 className="text-2xl">{sorted === true ? "Sorted Array" : "Unsorted Array"}</h3>
            <div className="mt-15">
                {mergeSteps.map((entry, idx) => (
                    <div className="flex flex-wrap gap-6 my-2" key={idx}>
                        {Array.isArray(entry[0]) ? (
                            entry.map((subArr, i) => (
                                <div className="flex gap-2 p-2 border-2 rounded-md" key={i}>
                                    {Array.isArray(subArr)
                                        ? subArr.map((val, j) => (
                                            <div className="flex justify-center items-center border-2 min-w-10 min-h-10 p-2 rounded-md" key={j}>
                                                {val}
                                            </div>
                                        ))
                                        : <div>{subArr}</div>
                                    }
                                </div>
                            ))
                        ) : (
                            <div className="flex flex-wrap gap-2 p-2 border-2 rounded-md">
                                {entry.map((val, j) => {
                                    return (
                                        <div
                                            className={`flex justify-center items-center border-2 min-w-10 min-h-10 p-2 rounded-md ${(entry.length === len && !sorted) ? "" : "bg-green-400"}`}
                                            key={j}
                                        >
                                            {val}
                                        </div>
                                    );
                                })}
                            </div>

                        )}

                    </div>
                ))}
            </div>

            <div className="mt-15 flex gap-4">
                <button
                    className="cursor-pointer border-2 px-4 py-2 rounded-sm bg-green-200 hover:bg-green-300"
                    onClick={async () => {
                        if (stopRef.current) {
                            stopRef.current = false;
                            await mergeSort(localArr, 0, 1);
                            stopRef.current = true;
                        }
                    }}
                >
                    Start
                </button>
            </div>
        </div>
    );
}
