import { useEffect, useState } from "react";
import "./App.css";
import Game from "./Game";
import Menu from "./Menu";
import { Icon } from "semantic-ui-react";
import HowToPlay from "./HowToPlay";
import About from "./About";
import StatsComponent from "./StatsComponent";
import Settings from "./Settings";
import Archive from "./Archive";
import animateCSS from "./animateCSS";
import Converter from "./Converter";
import CreatorWeekBanner from "./CreatorWeekBanner";
import Loading from "./Loading";
import getDailyPuzzleNumber from "./getDailyPuzzleNumber";

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

const seenSettings = window.localStorage.getItem("seenSettings3") === "true";

// set default mode to dark mode
if (!returningPlayer) {
  let isMobile = false; //initiate as false

  // device detection
  if (
    /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(
      navigator.userAgent
    ) ||
    /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
      navigator.userAgent.substr(0, 4)
    )
  ) {
    isMobile = true;
  }

  window.localStorage.setItem("mode", "dark");
  window.localStorage.setItem("selectionMode", isMobile ? "true" : "false");
}

const params = new Proxy(new URLSearchParams(window.location.search), {
  get: (searchParams, prop) => searchParams.get(prop),
});

function App() {
  const [view, setView] = useState(returningPlayer ? "menu" : "howToPlay");
  const [isDarkMode, setIsDarkMode] = useState(
    window.localStorage.getItem("mode") === "dark"
  );
  const [selectionMode, setSelectionMode] = useState(
    window.localStorage.getItem("selectionMode") === "true"
  );
  const [isHardMode, setIsHardMode] = useState(
    window.localStorage.getItem("hardMode") === "true"
  );
  const [isTeacherMode, setIsTeacherMode] = useState(
    window.localStorage.getItem("teacherMode") === "true"
  );
  const [selectedArchivePuzzleNumber, setSelectedArchivePuzzleNumber] =
    useState(undefined);
  const [showCreatorWeekBanner, setShowCreatorWeekBanner] = useState(() => {
    const puzzleNumber = params?.p ?? getDailyPuzzleNumber();
    if (puzzleNumber >= 48 && puzzleNumber <= 53 && view === "menu") {
      return true;
    } else {
      return false;
    }
  });

  useEffect(() => {
    if (params?.convert) {
      setView("convert");
    }
  }, []);

  useEffect(() => {
    const puzzleNumber = params?.p ?? getDailyPuzzleNumber();
    if (puzzleNumber >= 48 && puzzleNumber <= 53 && view === "menu") {
      setShowCreatorWeekBanner(true);
    } else {
      setShowCreatorWeekBanner(false);
    }
  }, [view]);

  // note the player has played before so we don't show help next time
  useEffect(() => {
    if (returningPlayer && !seenSettings) {
      setTimeout(() => {
        animateCSS("#settings", "flash");
      }, 100);
    }

    window.localStorage.setItem("returningPlayer", "true");
  }, []);

  const onOptionSelected = (option, level) => {
    if (option === "toggleDarkMode") {
      setIsDarkMode(!isDarkMode);
    }

    setSelectedArchivePuzzleNumber(level || undefined);

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
            if (view === "game" && selectedArchivePuzzleNumber !== undefined) {
              setView("archive");
            } else {
              setView("menu");
            }
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
          mode={selectedArchivePuzzleNumber !== undefined ? "archive" : "daily"}
          archivePuzzleNumber={selectedArchivePuzzleNumber}
          isDarkMode={isDarkMode}
          selectionMode={selectionMode}
          isHardMode={isHardMode}
          isTeacherMode={isTeacherMode}
        />
      );
      break;
    case "practice":
      content = (
        <Game
          mode="practice"
          isDarkMode={isDarkMode}
          selectionMode={selectionMode}
          isHardMode={isHardMode}
          isTeacherMode={isTeacherMode}
        />
      );
      break;
    case "challenge":
      content = (
        <Game
          mode="challenge"
          isDarkMode={isDarkMode}
          selectionMode={selectionMode}
          isHardMode={isHardMode}
          isTeacherMode={isTeacherMode}
          onPlayAgain={() => {
            setView("loading");
            setTimeout(() => setView("challenge"), 500);
          }}
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
      content = <StatsComponent isTeacherMode={isTeacherMode} />;
      break;
    case "settings":
      content = (
        <Settings
          setIsDarkMode={setIsDarkMode}
          isDarkMode={isDarkMode}
          setSelectionMode={setSelectionMode}
          selectionMode={selectionMode}
          isHardMode={isHardMode}
          setIsHardMode={setIsHardMode}
          isTeacherMode={isTeacherMode}
          setIsTeacherMode={setIsTeacherMode}
        />
      );
      break;
    case "archive":
      content = <Archive onOptionSelected={onOptionSelected} />;
      break;
    case "convert":
      content = <Converter />;
      break;
    case "loading":
      content = <Loading />;
      break;
    case "menu":
    default:
      content = (
        <Menu
          onOptionSelected={onOptionSelected}
          puzzleNumber={params?.p ?? getDailyPuzzleNumber()}
          isDarkMode={isDarkMode}
          showChallengeMode={params?.challenge}
        />
      );
      break;
  }

  return (
    <div className={`App`}>
      {header}
      {showCreatorWeekBanner && <CreatorWeekBanner />}
      {content}
    </div>
  );
}

export default App;
