import { useEffect, useState } from "react";
import {
  Modal,
  Text,
  Input,
  /*Row, Checkbox,*/ Button,
  Textarea,
  Loading,
  Grid,
  Spacer,
} from "@nextui-org/react";

export function UserFeedbackModal( isOpen, hasClosed) {
  const [profileData, setProfileData] = useState({
    addr: "",
    links: {},
  });
  const [handleError, setHandleError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    console.log("UserFeedbackModal useEffect");
  }, []);

  return (
    <>
    {console.log("UserFeedbackModal render", isOpen)}
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
          <Button css={{ px: "$13" }}>
            {isLoading ? <Loading color="white" size="sm" /> : "Save"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default UserFeedbackModal;
