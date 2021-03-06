import "./PromotionModal.css";
import { Modal, Button } from "semantic-ui-react";
import { useRef, useState } from "react";

function PromotionModal(props) {
  const { isDarkMode, onClose, force } = props;

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
      <img
        style={{
          marginTop: "24px",
          width: "100%",
          backgroundColor: "white",
          padding: " 24px 12px 12px 12px",
          borderRadius: "10px",
        }}
        src="/app-logo.png"
        alt="download button"
      />

      <div id="message">
        Play more Cladder and other fun word games in the app!
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
  const variant = getRandomInt(0, 3);

  switch (variant) {
    case 0:
      return {
        text: "FREE INSTALL",
        id: "freeInstallCta",
      };
    case 1:
      return {
        text: "GET THE APP",
        id: "getTheAppCta",
      };
    case 2:
      return {
        text: "DOWNLOAD",
        id: "downloadCta",
      };
    case 3:
    default:
      return {
        text: "FREE DOWNLOAD",
        id: "freeDownloadCta",
      };
  }
}

function onCtaClick() {
  // eslint-disable-next-line no-undef
  dataLayer.push({ event: "adClicked" });
  window.localStorage.setItem("clickedCta", Date.now().toString());
  window.open("https://epcladder.onelink.me/W079/joptk2js", "_blank");
}

export default PromotionModal;
