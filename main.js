import React from "react";
import ReactDOM from "react-dom/client"
import Create from "./SorthingAlgo/create_array";
import stores from "./storage/store";
import { Provider } from "react-redux";


function Main() {
    return (
        <>
            <Provider store={stores}>
                <div className=" p-10 w-[90%] mx-auto" style={{ fontFamily: '"Comic Sans MS", cursive, sans-serif' }}>
                    <Create/>
                </div>
            </Provider>
        </>
    )
}

ReactDOM.createRoot(document.getElementById("root")).render(<Main />)