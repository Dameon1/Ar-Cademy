import { Button, Row } from "@nextui-org/react";

export default function StampButton(props) {
  const {  txId, handleStamp, disabled, count } = props;
  return (
    <Row wrap="wrap" align="center" justify="space-around">
      <Button
        flat
        auto
        rounded
        css={{ color: "red", bg: "white", m: 6, p: 6, fontSize: 16 ,  zIndex: 1,  }}
        onPress={disabled ? null : () => handleStamp(txId)}
      >
        {props.icon}
        <p style={{ padding: "5px", fontSize: 14 }}>{count}</p>
      </Button>
    </Row>
  );
}
