import  { useEffect, useState } from "react";

const TYPING_SPEED = 100; // milliseconds per character
const message = "YYou're reallyyy one of the bestestest person i have ever shared my days with(i really mean it). you're the only person i was able to open up and rant out(i felt alive)... i truly really sincerely, believe that you deserve aaaaallll the love in the world...\n i hope this year has your eyes sparkling all the time... \nWishing you a veryyyyyyy Happy 0000010011th Birthday!!"
const centerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    fontSize: "1.9rem",
    fontFamily: "'Poppins', monospace",
    color: "#fff",
    fontStyle: "italic",
    background: "transparent",
};

const TypingNote = ({ text = message }) => {
    const [displayed, setDisplayed] = useState("");

    useEffect(() => {
        setDisplayed("");
        let i = 0;
        const interval = setInterval(() => {
            if (i < text.length - 1) {
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
            <span style={{ opacity: 0.5 }}>
                {displayed.length < text.length ? "|" : ""}
            </span>
        </div>
    );
};

export default TypingNote;