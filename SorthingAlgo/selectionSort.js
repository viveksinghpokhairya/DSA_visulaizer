import { useEffect, useState, useRef, use } from "react";

export default function Selection_sort_compo({ arr, speedRef }) {
    const [compare, setCompare] = useState([]);
    const [swap, setSwap] = useState([]);
    const [localArr, setLocalArr] = useState([...arr]);
    const [min_val, setMin_val] = useState([]);
    const stopRef = useRef(true);
    const latestSpeed = useRef(speedRef);
    const [sorted, setSorted] = useState(false);

    useEffect(() => {
        latestSpeed.current = speedRef
    }, [speedRef]);

    useEffect(() => {
        stopRef.current = true;
        setLocalArr([...arr]);
        setCompare([]);
        setSwap([]);
    }, [arr])

    function sleep(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }

    async function selectionSort() {
        stopRef.current = false;
        const copy = [...localArr];
        let n = copy.length;
        for (let i = 0; i < n - 1; i++) {
            let min_idx = i;
            for (let j = i + 1; j < n; j++) {
                if (stopRef.current) return;
                setCompare([i, j]);
                await sleep(latestSpeed.current);
                if (copy[j] < copy[min_idx]) {
                    min_idx = j;
                }
            }
            if (i != min_idx) {
                setCompare([]);
                setMin_val([min_idx]);
                await sleep(latestSpeed.current);
                setMin_val([]);
                setSwap([i, min_idx])
                let temp = copy[i];
                copy[i] = copy[min_idx];
                copy[min_idx] = temp;
                await sleep(latestSpeed.current)
                setLocalArr([...copy]);
            }
            await sleep(latestSpeed.current);
            setSwap([]);
        }
        setCompare([]);
        setSwap([]);
        setMin_val([]);
        setSorted(true);
    }
    return (
        <div>
            <h3 className="text-2xl">{sorted === true ? "Sorted Array" : "Unsorted Array"}</h3>
            <div className="flex flex-wrap gap-2 relative mt-10 border-2 p-2 rounded-md">
                {localArr.map((element, index) => (
                    <div key={index} className="relative flex flex-col items-center justify-center">
                        <div
                            className={`flex justify-center items-center min-w-10 min-h-10 border-2 p-2 rounded-md ${min_val.includes(index) ? "bg-amber-600" :
                                swap.includes(index)
                                    ? "bg-red-500"
                                    : compare.includes(index)
                                        ? "bg-green-500"
                                        : "bg-white"
                                }`}
                        >
                            {element}
                        </div>
                        {compare.includes(index) && (
                            <div className="absolute flex text-green-600 text-md z-10">
                                {index === compare[0] && (
                                    <div className=" flex flex-col items-center -translate-y-[100%]">
                                        <div>comparison</div>
                                        <div className="text-xl">↓</div>
                                    </div>
                                )}
                                {index === compare[1] && (
                                    <div className="flex flex-col items-center translate-y-[100%] animate-bounce">
                                        <div className="text-xl">↑</div>
                                        <div>comparison</div>
                                    </div>
                                )}
                            </div>
                        )}
                        {swap.includes(index) && (
                            <div className="flex absolute text-red-600 text-md z-10">
                                {index === swap[0] && (
                                    <div className=" flex flex-col items-center -translate-y-[100%] animate-bounce">
                                        <div>Swapping</div>
                                        <div className="text-xl">↓</div>
                                    </div>
                                )}
                                {index === swap[1] && (
                                    <div className="flex flex-col items-center translate-y-[100%] animate-bounce">
                                        <div className="text-xl">↑</div>
                                        <div>Swapping</div>
                                    </div>
                                )}
                            </div>
                        )}
                        {min_val.includes(index) && (
                            <div className="absolute translate-y-[120%] flex flex-col justify-center items-center text-amber-600 text-sm animate-bounce">
                                <div className="text-xl">↑</div>
                                <div>min element</div>
                            </div>
                        )}

                    </div>
                ))}
            </div>
            <div className="mt-10">
                <button onClick={() => {if(stopRef.current) selectionSort()}} className="cursor-pointer border-2 px-2 py-1 rounded-sm">Start</button>
            </div>
        </div>
    )
}