import logo from './logo.svg';
import "./index.css";
import './App.css';
import BirthdayAnimator from './components/BirthdayAnimator';
import ParticleCanvas from "./components/ParticleBG";
import HeroPage from './components/Hero';

function App() {
  // Simple device check using window.navigator.userAgent
  const isMobile = /Mobi|Android|iPhone|iPad|iPod/i.test(window.navigator.userAgent);

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
      <div className="App">
          <ParticleCanvas />
          <BirthdayAnimator />
          <HeroPage />
      </div>
  );
}

export default App;
