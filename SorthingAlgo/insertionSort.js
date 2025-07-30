import { useEffect, useState, useRef } from "react";


export default function InsertionSort_compo({ arr, speedRef }) {
    const [compare, setCompare] = useState([]);
    const [swap, setSwap] = useState([]);
    const [localArr, setLocalArr] = useState([...arr]);
    const [comp, setComp] = useState();
    const stopRef = useRef(true);
    const latestSpeed = useRef(speedRef);
    const [sorted, setSorted] = useState(false);

    useEffect(() => {
        setLocalArr([...arr]);
        stopRef.current = true;
        setSorted(false);
        setCompare([]);
        setSwap([]);
    }, [arr])

    useEffect(() => {
        latestSpeed.current = speedRef;
    }, [speedRef])
    function sleep(ms){
        return new Promise((resolve) => setTimeout(resolve, ms));
    }

    async function insertionSort() {
        stopRef.current = false;
        const copy = [...localArr];
        let n = copy.length;
        for (let i = 1; i < n; i++) {
            let key = copy[i];
            let j = i - 1;
            while (j >= 0 && copy[j] > key) {
                setCompare([j+1, j]);
                await sleep(latestSpeed.current)
                setCompare([]);
                setSwap([j+1, j])
                await sleep(latestSpeed.current);
                [copy[j], copy[j + 1]] = [copy[j + 1], copy[j]];
                setLocalArr([...copy]);
                await sleep(latestSpeed.current);
                setSwap([]);
                j = j - 1;
            }
            setComp([]);
        }
        setSorted(true);
        setCompare([]);
    }

    return (
        <div className="">
            <h3 className="text-2xl">{sorted === true ? "Sorted Array" : "Unsorted Array"}</h3>
            <div className="flex gap-2 border-2 p-2 mt-15 rounded-md">{
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
            <div className="mt-15">
            <button className="cursor-pointer border-2 px-4 py-2 rounded-sm bg-green-200 hover:bg-green-300" onClick={() => {
                if (stopRef.current == true)
                    insertionSort()
            }}>Start</button>
            </div>
        </div>
    )
}


