import "./PromotionModal.css";
import { Modal, Button } from "semantic-ui-react";
import { useState } from "react";

function PromotionModal(props) {
  const { isDarkMode, onClose } = props;

  const [open, setOpen] = useState(true);

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
      <div>Do you want MORE Cladder?</div>

      <Button
        inverted={isDarkMode}
        size="large"
        className="shareButton"
        color="green"
        onClick={() => {
          alert("k");
        }}
      >
        install
      </Button>
    </Modal>
  );
}

export default PromotionModal;
