import { Button } from "semantic-ui-react";
import { useEffect, useMemo, useState } from "react";

export default function ZenMode(props) {
  const { setIsTeacherMode } = props;

  const isZenMode = useMemo(() => {
    return window.localStorage.getItem("teacherMode") === "true";
  }, []);
  const [showButton, setShowButton] = useState(true);

  const hasSeen = useMemo(() => {
    return window.localStorage.getItem("hasSeenZenMode") === "true";
  }, []);

  useEffect(() => {
    window.localStorage.setItem("hasSeenZenMode", true);
  }, []);

  if (isZenMode || hasSeen) {
    return null;
  }

  return (
    <div className="zenModeContainer">
      <div style={{ marginBottom: "12px" }}>
        Is the timer too stressful? Turn on Zen Mode to disable it! You can
        always change it later in the settings menu.
      </div>
      {showButton ? (
        <Button
          id="zenButton"
          color="black"
          inverted={true}
          style={{ fontVariant: "all-petite-caps", width: "fit-content" }}
          onClick={() => {
            window.localStorage.setItem("teacherMode", true);
            setShowButton(false);
            setIsTeacherMode(true);
          }}
        >
          Enable Zen Mode
        </Button>
      ) : (
        <div>👍</div>
      )}
    </div>
  );
}
