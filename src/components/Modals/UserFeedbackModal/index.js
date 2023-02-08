import { useEffect, useState } from "react";
import { Modal, Text, Button, Loading, Grid, Spacer } from "@nextui-org/react";

export function UserFeedbackModal(isOpen, hasClosed) {
  useEffect(() => {
    console.log("UserFeedbackModal useEffect");
  }, []);

  return (
    <>
      <Modal
        preventClose
        closeButton
        aria-labelledby="Edit profile"
        open={isOpen}
        onClose={hasClosed}
      >
        <Modal.Header>
          <Text id="modal-title" size={18}>
            User feedback
          </Text>
        </Modal.Header>
        <Modal.Body>
          <Grid.Container gap={1} justify="center">
            <Loading />
          </Grid.Container>

          <Spacer y={1} />
        </Modal.Body>
        <Modal.Footer>
          <Button auto flat color="error" onPress={hasClosed}>
            Cancel
          </Button>
          <Button css={{ px: "$13" }}>"Save"</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default UserFeedbackModal;
