import { useState } from "react";
import "./styles.css";

export default function FloatingButtons() {
    const [showButtons, setShowButtons] = useState(false);

    return (
        <div className="container">
            <div className="button-wrapper">
            <div className={`extra-buttons ${showButtons ? "show" : ""}`}>
                <button>Button 1</button>
                <button>Button 2</button>
                <button>Button 3</button>
                </div>

                <button onClick={() => setShowButtons(!showButtons)} className="btn main-btn">
                    {showButtons ? "Close" : "Open"}
                </button>
            </div>
        </div>
    )
}