import "./AdsModal.css";
import { Modal, Button } from "semantic-ui-react";
import { useEffect, useRef, useState } from "react";

function AdsModal(props) {
  const { isDarkMode, onClose, force } = props;

  useEffect(() => {
    window.localStorage.setItem("seenAdsModal", true);
  }, []);

  const [open, setOpen] = useState(() => {
    if (force) {
      return true;
    }

    const lastClicked = window.localStorage.getItem("clickedCta");
    const lastClickedTime = lastClicked
      ? new Date(lastClicked).getTime()
      : null;

    if (lastClickedTime === null) {
      return true;
    }

    const now = Date.now();

    // cool down for a week after they interact with install button
    return now - lastClickedTime > 7 * 24 * 60 * 60 * 1000;
  });

  const openedTime = useRef(Date.now());

  const cta = getCta();

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
    (navigator.userAgent.includes("Mac") && "ontouchend" in document);

  let ctaButton = (
    <Button
      id={cta.id}
      size="large"
      className="shareButton"
      color="green"
      onClick={onCtaClick}
    >
      {cta.text}
    </Button>
  );

  if (isIos) {
    ctaButton = (
      <img
        id="iosInstallButton"
        src={isDarkMode ? "/install-ios.svg" : "/install-ios-light.svg"}
        style={{ width: "200px" }}
        onClick={onCtaClick}
        alt="download button"
      />
    );
  }

  return (
    <Modal
      closeIcon
      id="modalContainer"
      className="modalContainer"
      onClose={() => {
        const now = Date.now();
        if (openedTime.current && now - openedTime.current > 1250) {
          setOpen(false);
          onClose();
        }
      }}
      onOpen={() => setOpen(true)}
      open={open}
      size="small"
    >
      <div className="message2">
        Ads are lame, but help keep the site running.
      </div>

      <div className="message2">
        "Buy Me a Coffee" supporters will receive a code for a permanent ad-free
        experience!
      </div>

      {ctaButton}
    </Modal>
  );
}

/**
 * Returns a random integer between min (inclusive) and max (inclusive).
 * The value is no lower than min (or the next integer greater than min
 * if min isn't an integer) and no greater than max (or the next integer
 * lower than max if max isn't an integer).
 * Using Math.round() will give you a non-uniform distribution!
 */
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getCta() {
  return {
    text: "SUPPORT",
    id: "support",
  };
}

function onCtaClick() {
  window.open("https://www.buymeacoffee.com/playcladder", "_blank");
}

export default AdsModal;
