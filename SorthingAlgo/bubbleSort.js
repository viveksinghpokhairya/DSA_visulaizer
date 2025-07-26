import { useState, useRef, useEffect } from "react";

export default function Bubble({ arr, speedRef }) {
    const [compare, setCompare] = useState([]);
    const [swap, setSwap] = useState([]);
    const [localArr, setLocalArr] = useState([...arr]);
    const stopRef = useRef(true);
    const latestSpeed = useRef(speedRef);
    const [sorted, setSorted] = useState(false);


    useEffect(() => {
        stopRef.current = true;
        setLocalArr([...arr]);
        setCompare([]);
        setSwap([]);
    }, [arr]);

    useEffect(() => {
        latestSpeed.current = speedRef;
    }, [speedRef]);

    function sleep(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }

    async function bubbleSort() {
        stopRef.current = false;
        const copy = [...localArr];
        let n = copy.length;
        for (let i = 0; i < n - 1; i++) {
            let swapped = false;
            for (let j = 0; j < n - i - 1; j++) {
                if (stopRef.current) return;
                setCompare([j, j + 1]);
                await sleep(latestSpeed.current);
                setCompare([]);
                if (copy[j] > copy[j + 1]) {
                    swapped = true;
                    [copy[j], copy[j + 1]] = [copy[j + 1], copy[j]];
                    setSwap([j, j + 1]);
                    await sleep(latestSpeed.current);
                    setLocalArr([...copy]);
                    await sleep(latestSpeed.current);
                }
                setSwap([]);
            }
            if (!swapped) break;
        }
        setSorted(true);
    }

    return (
        <div className="">
            <h3 className="text-2xl">{sorted === true ? "Sorted Array" : "Unsorted Array"}</h3>
            <div className="flex gap-2 border-2 p-2 mt-10 rounded-md">{
                localArr.map((element, index) => <div className={`flex justify-center items-center border-2 min-w-10 min-h-10 p-2 rounded-md ${compare.includes(index) ? "bg-green-600" : ""} ${swap.includes(index) ? "bg-red-600" : ""}`} key={index}>{element}
                    {compare.includes(index) && (<div className="flex absolute  text-green-600 text-md z-10">
                        {index === compare[0] && (
                            <div className=" flex flex-col items-center -translate-y-[100%] animate-bounce">
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
                    </div>)}
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
                </div>)
            }
            </div>
            <div className="mt-10">
            <button className="cursor-pointer border-2 px-2 py-1 rounded-sm" onClick={() => {
                if (stopRef.current == true)
                    bubbleSort()
            }}>Start</button>
            </div>
        </div>
    )
}
