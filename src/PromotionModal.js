import "./PromotionModal.css";
import { Modal, Button } from "semantic-ui-react";
import { useState } from "react";

function PromotionModal(props) {
  const { isDarkMode, onClose } = props;

  const [open, setOpen] = useState(true);

  const cta = getCta();

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
    (navigator.userAgent.includes("Mac") && "ontouchend" in document);

  let ctaButton = (
    <Button
      id={cta.id}
      size="large"
      className="shareButton"
      color="green"
      onClick={() => {
        window.open("https://google.com", "_blank");
      }}
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
        onClick={() => window.open("https://google.com", "_blank")}
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
        setOpen(false);
        onClose();
      }}
      onOpen={() => setOpen(true)}
      open={open}
      size="small"
    >
      <img
        style={{ marginTop: "24px" }}
        src="https://placekitten.com/g/300/100"
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

export default PromotionModal;
