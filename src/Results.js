import { Button } from "semantic-ui-react";
import copy from "copy-to-clipboard";
import ZenMode from "./ZenMode";

const clickedBattleshipple =
  window.localStorage.getItem("clickedBattleshipple") === "true";

export default function Results(props) {
  const {
    correct,
    time,
    onCopied,
    puzzleNumber,
    isHardMode,
    isDarkMode,
    isTeacherMode,
    isChallengeMode,
    onPlayAgain,
    skipsUsed,
    mode,
    setIsTeacherMode,
    shouldPromote,
  } = props;

  const didComplete = correct === 10;

  let bigMessage = "";
  if (correct === 10) {
    bigMessage = "Perfect!";
  } else if (correct > 6) {
    bigMessage = "Impressive!";
  } else if (correct > 2) {
    bigMessage = "Nice try!";
  } else {
    bigMessage = "There's always tomorrow!";
  }

  const style = shouldPromote ? { marginTop: "0" } : null;

  return (
    <div className="resultsContainer" style={style}>
      <div style={{ marginBottom: "24px" }}>
        {!shouldPromote && <ZenMode setIsTeacherMode={setIsTeacherMode} />}
        {shouldPromote && (
          <img
            src="/app-banner.png"
            alt="promo banner"
            style={{
              width: "100%",
              margin: "6px 0 24px 0px",
              cursor: "pointer",
            }}
            onClick={onBannerClick}
          />
        )}
        <div className="bigMessage">{bigMessage}</div>
        <div
          id="gameResult"
          className="resultsScore"
          data-score={correct}
          data-time={time}
        >
          {correct} / 10
        </div>
        {isChallengeMode && (
          <div style={{ fontSize: "medium", marginBottom: "12px" }}>
            ({skipsUsed === 1 ? `${skipsUsed} skip` : `${skipsUsed} skips`})
          </div>
        )}
        {didComplete && !isTeacherMode && (
          <div className="resultsTime">{time} seconds</div>
        )}
      </div>
      <>
        {isChallengeMode ? (
          <Button
            className="positive button"
            style={{ marginBottom: "18px" }}
            size="massive"
            inverted={isDarkMode}
            onClick={() => onPlayAgain()}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <span>PLAY AGAIN</span>
              <span style={{ marginTop: "12px", fontSize: "14px" }}>
                (SPACEBAR)
              </span>
            </div>
          </Button>
        ) : (
          <Button.Group size="massive" id="buttonz">
            <Button
              id="shareButton"
              className="button"
              color="green"
              style={{
                marginBottom: "18px",
                backgroundColor: isDarkMode ? "#2ecc40" : "#5bbd72",
                color: "white",
              }}
              inverted={isDarkMode}
              onClick={() => {
                let text = `#Cladder ${puzzleNumber}\n\n✅ ${correct}/10${
                  isHardMode && !isTeacherMode ? "*" : ""
                } ${
                  skipsUsed ? (skipsUsed === 1 ? "(1 skip)" : "(2 skips)") : ""
                }\n${
                  didComplete && !isTeacherMode ? `🚀 ${time} seconds\n` : ""
                }\nhttps://playcladder.com`;

                var ua = navigator.userAgent.toLowerCase();
                var isAndroid = ua.indexOf("android") > -1;

                const isIos =
                  [
                    "iPad Simulator",
                    "iPhone Simulator",
                    "iPod Simulator",
                    "iPad",
                    "iPhone",
                    "iPod",
                  ].includes(navigator.platform) ||
                  // iPad on iOS 13 detection
                  (navigator.userAgent.includes("Mac") &&
                    "ontouchend" in document);

                if (isIos || isAndroid) {
                  navigator.share({
                    text: text,
                  });
                } else {
                  copy(text);
                  onCopied();
                }
              }}
            >
              SHARE
            </Button>
            <Button.Or />
            <Button
              id="shareButton2"
              className="button"
              style={{ marginBottom: "18px" }}
              inverted={isDarkMode}
              onClick={() => {
                let text = `#Cladder ${puzzleNumber}\n\n✅ ${correct}/10${
                  isHardMode && !isTeacherMode ? "*" : ""
                } ${
                  skipsUsed ? (skipsUsed === 1 ? "(1 skip)" : "(2 skips)") : ""
                }\n${
                  didComplete && !isTeacherMode ? `🚀 ${time} seconds\n` : ""
                }\n`;

                for (let i = 0; i < 10; i++) {
                  if (i < correct) {
                    text += "🟩➖➖🟩\n";
                  } else if (i === correct) {
                    text += "🟨➖➖🟨\n";
                  } else {
                    text += "⬛➖➖⬛\n";
                  }
                }

                // for (let i = 0; i < 10; i++) {
                //   const rung = gameData[i];

                //   if (i < correct) {
                //     for (let j = 0; j < rung.word.length; j++) {
                //       text += rung.alteredPosition === j ? "🟩" : "⬛";
                //     }
                //     text += "\n";
                //   } else if (i === correct) {
                //     for (let j = 0; j < rung.word.length; j++) {
                //       text += rung.alteredPosition === j ? "🟨" : "⬛";
                //     }
                //     text += "\n";
                //   }
                // }

                text += "\nhttps://playcladder.com";

                var ua = navigator.userAgent.toLowerCase();
                var isAndroid = ua.indexOf("android") > -1;

                const isIos =
                  [
                    "iPad Simulator",
                    "iPhone Simulator",
                    "iPod Simulator",
                    "iPad",
                    "iPhone",
                    "iPod",
                  ].includes(navigator.platform) ||
                  // iPad on iOS 13 detection
                  (navigator.userAgent.includes("Mac") &&
                    "ontouchend" in document);

                if (isIos || isAndroid) {
                  navigator.share({
                    text: text,
                  });
                } else {
                  copy(text);
                  onCopied();
                }
              }}
            >
              🟩
            </Button>
          </Button.Group>
        )}

        {mode !== "challenge" && (
          <>
            <Button
              id="donateButton"
              className="button active"
              style={{
                marginBottom: "12px",
                width:
                  document.getElementsByClassName("buttonz")[0]?.clientWidth ||
                  "270px",
              }}
              size="large"
              color="purple"
              onClick={() => {
                window.open(
                  "https://www.buymeacoffee.com/playcladder",
                  "_blank"
                );
              }}
            >
              ❤️ DONATE
            </Button>
            {!shouldPromote && (
              <img
                style={{
                  marginBottom: "12px",
                  marginTop: "6px",
                  borderRadius: "10px",
                  cursor: "pointer",
                  width:
                    document.getElementsByClassName("buttonz")[0]
                      ?.clientWidth || "270px",
                }}
                src="/LatticeAd.jpg"
                onClick={() => window.open("https://playlattice.com", "_blank")}
              />
            )}
            {/* {!shouldPromote && !clickedBattleshipple && (
              <div
                onClick={() => {
                  window.localStorage.setItem("clickedBattleshipple", "true");
                  window.open("https://battleshipple.com", "_");
                }}
                style={{
                  backgroundColor: "#038eca",
                  width:
                    document.getElementsByClassName("buttonz")[0]
                      ?.clientWidth || "270px",
                  borderRadius: "10px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  fontVariant: "all-small-caps",
                  cursor: "pointer",
                  marginTop: "6px",
                }}
              >
                <div style={{ fontSize: "30px", marginBottom: "12px" }}>🌊</div>
                <div style={{ fontSize: "16px", marginBottom: "12px" }}>
                  Can you sink the battleship?
                </div>
                <div style={{ fontSize: "16px", marginBottom: "12px" }}>
                  battleshipple.com
                </div>
              </div>
            )} */}
          </>
        )}
      </>
    </div>
  );
}

const onBannerClick = () => {
  window.open("https://twitter.com/martellaj", "_blank");
};
