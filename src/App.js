import { useEffect, useState } from "react";
import "./App.css";
import Game from "./Game";
import Menu from "./Menu";
import { Icon } from "semantic-ui-react";
import HowToPlay from "./HowToPlay";
import About from "./About";
import { copyStats } from "./stats";
import StatsComponent from "./StatsComponent";
import Settings from "./Settings";
import animateCSS from "./animateCSS";

// set the app height for mobile
const appHeight = () =>
  document.documentElement.style.setProperty(
    "--app-height",
    `${window.innerHeight}px`
  );
window.addEventListener("resize", appHeight);
appHeight();

const returningPlayer =
  window.localStorage.getItem("returningPlayer") === "true";

const seenSettings = window.localStorage.getItem("seenSettings") === "true";

// set default mode to dark mode
if (!returningPlayer) {
  window.localStorage.setItem("mode", "dark");
}

const params = new Proxy(new URLSearchParams(window.location.search), {
  get: (searchParams, prop) => searchParams.get(prop),
});

setTimeout(() => {
  const stats = params?.stats;

  if (stats) {
    copyStats(stats);
  }
}, 50);

function App() {
  const [view, setView] = useState(returningPlayer ? "menu" : "howToPlay");
  const [isDarkMode, setIsDarkMode] = useState(
    window.localStorage.getItem("mode") === "dark"
  );
  const [selectionMode, setSelectionMode] = useState(
    window.localStorage.getItem("selectionMode") === "true"
  );

  // note the player has played before so we don't show help next time
  useEffect(() => {
    if (returningPlayer && !seenSettings) {
      setTimeout(() => {
        animateCSS("#settings", "heartBeat");
      }, 100);
    }

    window.localStorage.setItem("returningPlayer", "true");
  }, []);

  const onOptionSelected = (option) => {
    if (option === "toggleDarkMode") {
      setIsDarkMode(!isDarkMode);
    }

    setView(option);
  };

  const header = (
    <div
      className="header"
      style={{
        width: "100%",
        fontSize: "28px",
        height: "50px",
        fontVariant: "all-small-caps",
        marginBottom: "12px",
        flexShrink: "0",
      }}
    >
      <div className="headerSection" style={{ marginLeft: "12px" }}>
        <Icon
          onClick={() => {
            setView("menu");
          }}
          tabIndex="0"
          style={{
            cursor: "pointer",
            visibility: view !== "menu" ? "visible" : "hidden",
            marginRight: "12px",
          }}
          name={view === "game" || view === "practice" ? "arrow left" : "close"}
          inverted={isDarkMode}
        />
        <Icon
          onClick={() => {
            setView("menu");
          }}
          tabIndex="0"
          style={{
            cursor: "pointer",
            visibility: "hidden",
          }}
          name="bars"
          inverted={isDarkMode}
        />
      </div>
      <span>CLADDER</span>
      <div className="headerSection" style={{ marginRight: "12px" }}>
        <Icon
          name={"chart bar"}
          onClick={() => {
            setView("stats");
          }}
          style={{
            cursor: "pointer",
          }}
          className="button chart"
          inverted={isDarkMode}
        />
        <Icon
          id="settings"
          name={"setting"}
          onClick={() => {
            setView("settings");
          }}
          style={{
            cursor: "pointer",
          }}
          className="button"
          inverted={isDarkMode}
        />
        {/* <Icon
          onClick={() => window.open("https://twitter.com/martellaj", "_blank")}
          tabIndex="0"
          style={{
            cursor: "pointer",
            visibility: false ? "visible" : "hidden",
          }}
          name="twitter"
        /> */}
      </div>
    </div>
  );

  let content = null;

  switch (view) {
    case "game":
      content = (
        <Game
          isIos={iOS()}
          isDarkMode={isDarkMode}
          selectionMode={selectionMode}
        />
      );
      break;
    case "practice":
      content = (
        <Game
          isIos={iOS()}
          isDarkMode={isDarkMode}
          isPractice={true}
          selectionMode={selectionMode}
        />
      );
      break;
    case "howToPlay":
      content = <HowToPlay />;
      break;
    case "about":
      content = <About />;
      break;
    case "stats":
      content = <StatsComponent />;
      break;
    case "settings":
      content = (
        <Settings
          setIsDarkMode={setIsDarkMode}
          isDarkMode={isDarkMode}
          setSelectionMode={setSelectionMode}
          selectionMode={selectionMode}
        />
      );
      break;
    case "menu":
    default:
      content = (
        <Menu
          onOptionSelected={onOptionSelected}
          puzzleNumber={params?.p ?? getPuzzleNumber()}
          isDarkMode={isDarkMode}
        />
      );
      break;
  }

  return (
    <div className={`App`}>
      {header}
      {content}
    </div>
  );
}

function iOS() {
  return (
    [
      "iPad Simulator",
      "iPhone Simulator",
      "iPod Simulator",
      "iPad",
      "iPhone",
      "iPod",
    ].includes(navigator.platform) ||
    // iPad on iOS 13 detection
    (navigator.userAgent.includes("Mac") && "ontouchend" in document)
  );
}

const getPuzzleNumber = (date) => {
  const refDate = new Date(2022, 2, 22, 0, 0, 0, 0);
  const _date = date || new Date();
  const val =
    new Date(_date).setHours(0, 0, 0, 0) - refDate.setHours(0, 0, 0, 0);
  return Math.round(val / 864e5);
};

export default App;
