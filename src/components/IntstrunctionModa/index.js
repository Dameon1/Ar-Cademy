import React from "react";
import Modal from "react-responsive-modal";
import "./instructionModal.css";

export function InstructionModal() {

  const [open, setOpen] = React.useState(false);
  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

  return (
    <div>
      <button className="modal" onClick={onOpenModal}>
        ?
      </button>
      <div>
        <button >Open modal</button>
        <Modal open={open}
          onClose={onCloseModal}
          center
          classNames={{
            modal: "info-modal",
            closeButton: "info-btn"
          }}>
          <h2>Simple centered modal</h2>
        </Modal>
      </div>
      <Modal
        open={open}
        onClose={this.onCloseModal}
        center
        classNames={{
          modal: "info-modal",
          closeButton: "info-btn"
        }}
      >
        <p>This is the Playground page of Arcademy!</p>
        <p>
          Here, you have access to different tools you will find necessary to get create and solve problems. The repl.it allows you to code along with and try
          the things in the video.
        </p>
      </Modal>
    </div>
  );
}