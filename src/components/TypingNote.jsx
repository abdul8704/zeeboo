import React, { useEffect, useState } from "react";

const TYPING_SPEED = 100; // milliseconds per character

const centerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    fontSize: "2.5rem",
    fontFamily: "'Poppins', monospace",
    color: "#fff",
    fontStyle: "italic",
    background: "transparent",
};

const TypingNote = ({ text = "aabbcded Many more Happy Birthday!" }) => {
    const [displayed, setDisplayed] = useState("");

    useEffect(() => {
        setDisplayed("");
        let i = 0;
        const interval = setInterval(() => {
            if (i < text.length-1) {
                setDisplayed((prev) => prev + text[i]);
                i++;
            } else {
                clearInterval(interval);
            }
        }, TYPING_SPEED);
        return () => clearInterval(interval);
    }, [text]);

    return (
        <div style={centerStyle}>
            {displayed}
            <span style={{ opacity: 0.5 }}>{displayed.length < text.length ? "|" : ""}</span>
        </div>
    );
};

export default TypingNote;