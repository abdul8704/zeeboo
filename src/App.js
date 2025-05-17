import "./index.css";
import './App.css';
import BirthdayAnimator from './components/BirthdayAnimator';
import ParticleCanvas from "./components/ParticleBG";
import HeroPage from './components/Hero';
import { useState } from "react";
import TypingNote from './components/TypingNote';

function App() {
  // Simple device check using window.navigator.userAgent
  const isMobile = /Mobi|Android|iPhone|iPad|iPod/i.test(window.navigator.userAgent);
  const [showMain, setShowMain] = useState(true);
  if (isMobile) {
    return (
      <div className="App">
        <div style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          background: "#222",
          color: "#fff",
          fontSize: "1.5rem"
        }}>
          <p>
            This experience is best viewed on a laptop or desktop.<br />
            Please visit this page from a larger screen.
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="App" style={{ position: "relative", minHeight: "100vh" }}>
        <ParticleCanvas />
        {showMain ? (
          <>
            <BirthdayAnimator />
            <HeroPage />
            <button
              style={{
                position: "fixed",
                bottom: 24,
                right: 32,
                padding: "8px 20px",
                fontSize: "1rem",
                borderRadius: "8px",
                border: "2px solid #3a235a",
                background: "#231942",
                color: "#fff",
                boxShadow: "0 2px 12px 0 rgba(35, 25, 66, 0.25)",
                letterSpacing: "0.5px",
                fontWeight: 500,
                cursor: "pointer",
                zIndex: 10,
                transition: "background 0.3s, box-shadow 0.3s, transform 0.2s"
              }}
              onMouseOver={e => {
                e.currentTarget.style.background = "#3a235a";
                e.currentTarget.style.boxShadow = "0 4px 20px 0 rgba(58, 35, 90, 0.35)";
                e.currentTarget.style.transform = "scale(1.05)";
              }}
              onMouseOut={e => {
                e.currentTarget.style.background = "#231942";
                e.currentTarget.style.boxShadow = "0 2px 12px 0 rgba(35, 25, 66, 0.25)";
                e.currentTarget.style.transform = "scale(1)";
              }}
              onClick={() => setShowMain(false)}
            >
              Continue
            </button>
          </>
        ) : (
          <>
            <TypingNote />
            <button
              style={{
                position: "fixed",
                bottom: 24,
                right: 32,
                padding: "8px 20px",
                fontSize: "1rem",
                borderRadius: "8px",
                border: "2px solid #3a235a",
                background: "#231942",
                color: "#fff",
                boxShadow: "0 2px 12px 0 rgba(35, 25, 66, 0.25)",
                letterSpacing: "0.5px",
                fontWeight: 500,
                cursor: "pointer",
                zIndex: 10,
                transition: "background 0.3s, box-shadow 0.3s, transform 0.2s"
              }}
              onMouseOver={e => {
                e.currentTarget.style.background = "#3a235a";
                e.currentTarget.style.boxShadow = "0 4px 20px 0 rgba(58, 35, 90, 0.35)";
                e.currentTarget.style.transform = "scale(1.05)";
              }}
              onMouseOut={e => {
                e.currentTarget.style.background = "#231942";
                e.currentTarget.style.boxShadow = "0 2px 12px 0 rgba(35, 25, 66, 0.25)";
                e.currentTarget.style.transform = "scale(1)";
              }}
              onClick={() => setShowMain(true)}
            >
              Back
            </button>
          </>
        )}
      </div>
    </>
   
  );
}

export default App;
