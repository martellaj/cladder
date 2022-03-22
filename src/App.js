import { useState } from "react";
import "./App.css";
import Game from "./Game";
import Menu from "./Menu";
import { Icon } from "semantic-ui-react";

function App() {
  const [view, setView] = useState("menu");

  const onOptionSelected = (option) => {
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
      <div className="headerSection" style={{ marginLeft: "6px" }}>
        <Icon
          onClick={() => setView("menu")}
          tabIndex="0"
          style={{
            cursor: "pointer",
            visibility: view !== "menu" ? "visible" : "hidden",
          }}
          name="bars"
        />
      </div>
      <span>ONE-OFF</span>
      <div
        className="headerSection"
        style={{ flexDirection: "row-reverse", marginRight: "6px" }}
      >
        <Icon
          onClick={() => window.open("https://twitter.com/martellaj", "_blank")}
          tabIndex="0"
          style={{
            cursor: "pointer",
          }}
          name="twitter"
        />
      </div>
    </div>
  );

  let content = <Menu onOptionSelected={onOptionSelected} />;

  switch (view) {
    case "game":
      content = <Game />;
      break;
    case "menu":
    default:
      content = <Menu onOptionSelected={onOptionSelected} />;
      break;
  }

  const isIos = iOS();

  return (
    <div className={`App ${isIos && "App-iOS"}`}>
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

export default App;
