import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setData, setArray_size, setmax_Element, setmin_Element, setSpeed } from "../storage/slice_arr";
import { useSelector } from "react-redux";
import Bubble from "./bubbleSort";
import Selection_sort_compo from "./selectionSort";
import InsertionSort_compo from "./insertionSort";
import MergeSort from "./mergeSort";

export default function Create() {
    const dispatch = useDispatch();
    const size = useSelector((state) => state.slice_arr.Array_size);
    const max = useSelector((state) => state.slice_arr.max_Element);
    const min = useSelector((state) => state.slice_arr.min_Element);
    const speed = useSelector((state) => state.slice_arr.speed);
    const [algorithm, setAlgorithm] = useState("Bubble Sort");

    useEffect(() => {
        generateArray(size, max, min);
    }, [size, max, min]);

    const generateArray = (size, max, min) => {
        if (size > 10) {
            alert("Array size should not exceed 10.");
            return;
        }
        if (max <= min) {
            alert("Max value should be greater than Min value.");
            return;
        }
        const newArr = [];
        for (let i = 0; i < Number(size); i++) {
            newArr.push(Math.floor(Math.random() * (max - min + 1) + min));
        }
        dispatch(setData(newArr));
    };

    const arr = useSelector((state) => state.slice_arr.data);
    const speedRef = useSelector((state) => state.slice_arr.speed);

    return (
        <div>
            <h1 className="text-5xl">Sorting Algorithms</h1>
        <div className="w-[100%] border-2 rounded-3xl text-black p-20 mt-10">
            <h2 className="max-w-[90%] mx-auto text-3xl">Setting Array values and Algorithm Speed</h2>
            <div className="flex border-2 gap-5 max-w-[90%] mx-auto flex-wrap p-4 justify-center items-center rounded-2xl mt-5 shadow-2xl">
                <div>
                    <label>Size: </label>
                    <input
                        type="number"
                        defaultValue={size}
                        id="size"
                        placeholder="Enter the size of array"
                        onChange={(e) => dispatch(setArray_size(e.target.value))}
                        className="border-2 pl-2 rounded-md"
                    />
                </div>
                <div>
                    <label>Max: </label>
                    <input
                        type="number"
                        defaultValue={max}
                        id="max_val"
                        onChange={(e) => dispatch(setmax_Element(Number(e.target.value)))}
                        placeholder="Enter the max value"
                        className="border-2 pl-2 rounded-md"
                    />
                </div>
                <div>
                    <label>Min: </label>
                    <input
                        type="number"
                        defaultValue={min}
                        id="min_val"
                        onChange={(e) => dispatch(setmin_Element(Number(e.target.value)))}
                        placeholder="Enter the min value"
                        className="border-2 pl-2 rounded-md"
                    />
                </div>

                <div className="p-4 max-w-md mx-auto">
                    <label htmlFor="speedRange" className="block text-lg font-semibold mb-2">
                        Sorting Speed: <span className="text-blue-600">{speed}ms</span>
                    </label>
                    <input
                        id="speedRange"
                        type="range"
                        min="100"
                        max="4000"
                        step="100"
                        value={speed}
                        onChange={(e) => dispatch(setSpeed(Number(e.target.value)))}
                        className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer"
                    />
                </div>
                <div className="p-4 max-w-md mx-auto">
                    <button className="border-2 text-2xl px-2 rounded-md cursor-pointer"
                        onClick={() => generateArray(size, max, min)}>
                        Randomize Array
                    </button>
                </div>
                <div className="p-4 max-w-md mx-auto">
                    <select
                        className="border-2 text-2xl px-2 rounded-md cursor-pointer"
                        value={algorithm}
                        onChange={(e) => setAlgorithm(e.target.value)}
                    >
                        <option value="Bubble Sort">Bubble Sort</option>
                        <option value="Selection Sort">Selection Sort</option>
                        <option value="Insertion Sort">Insertion Sort</option>
                        <option value="Merge Sort">Merge Sort</option>
                        <option value="Quick Sort">Quick Sort</option>
                    </select>
                </div>
            </div>
            <h2 className="max-w-[90%] mx-auto text-3xl mt-5">{algorithm}</h2>
            <div className="flex border-2 max-w-[90%] mx-auto mt-5 rounded-2xl p-5 shadow-2xl">
                {/* <Bubble arr={arr} speedRef={speedRef}></Bubble> */}
                {/* <Selection_sort_compo arr={arr} speedRef={speedRef}></Selection_sort_compo> */}
                {/* <Selection_sort_compo></Selection_sort_compo> */}
                {algorithm === "Bubble Sort" && <Bubble arr={arr} speedRef={speedRef} />}
                {algorithm === "Selection Sort" && <Selection_sort_compo arr={arr} speedRef={speedRef} />}
                {algorithm === "Insertion Sort" && <InsertionSort_compo arr={arr} speedRef={speedRef} />}
                {algorithm === "Merge Sort" && <MergeSort arr={arr} speedRef={speedRef}/>}
                {/* {algorithm === "quick" && <QuickSort arr={arr} speed={speed} />} */}
            </div>

            {/* <Selection_sort_compo></Selection_sort_compo>  */}
        </div>
        </div>
    );
}
