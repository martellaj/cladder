import { useEffect, useState } from "react";
import { Button, Input } from "semantic-ui-react";

export default function ChallengePage(props) {
  const { isDarkMode, onOptionSelected } = props;

  const [code, setCode] = useState("");

  useEffect(() => {
    window.localStorage.setItem("challengePageSeen", "true");
  }, []);

  return (
    <div>
      <p id="challengeModeDescription">
        Challenge mode is a <span style={{ fontWeight: "bold" }}>super</span>{" "}
        challenging version of Cladder with a virtually endless amount of
        puzzles (and unlimited skips)! If 1 puzzle a day isn't enough for you,
        please consider supporting us (whatever you choose to give) and we'll
        send you a code to unlock it so you can play all day!
      </p>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Button
          id="challengePageDonateButton"
          className="button active"
          style={{
            marginBottom: "12px",
          }}
          size="large"
          color="purple"
          inverted={isDarkMode}
          onClick={() => {
            window.open("https://www.buymeacoffee.com/playcladder", "_blank");
          }}
        >
          ❤️ SUPPORT BY DONATING
        </Button>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Input
            style={{ marginRight: "12px" }}
            value={code}
            onChange={(e) => {
              setCode(e.target.value);
            }}
          />
          <Button
            inverted={isDarkMode}
            className="button"
            onClick={() => {
              const CODE = "JAVAGIFT";

              if (code.trim().toLowerCase() === CODE.toLowerCase()) {
                // save for later
                window.localStorage.setItem("isSupporter", true);

                onOptionSelected("menu");

                requestAnimationFrame(() => {
                  onOptionSelected("challengeFirst");
                }, 0);
              } else {
                alert(
                  "That didn't work. Maybe try again? Please send an email to playcladder@gmail.com if the code you received isn't working."
                );
              }
            }}
          >
            UNLOCK
          </Button>
        </div>
      </div>
    </div>
  );
}
