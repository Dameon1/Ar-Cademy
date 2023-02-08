
import fallbackImage from "../../../winstonMedia.png";
import { CenterProvider, Asset } from '@center-inc/react';
//function called nftviewer to return the nft image
export default function NFTViewer(props) {
  let { content } = props;
  let network = content.ark_network;
  let tokenAddress = content.token_address;
  let tokenId = content.token_id;
  // console.log("network", network);
  // console.log("tokenAddress", tokenAddress);
  return (
    // <p>{network}, {tokenAddress}, {tokenId}</p>
    <CenterProvider network={`${network}-mainnet`} apiKey={`key2f48330116ac56e1f63c7dd0`}>
      <Asset
        network={`${network}-mainnet`}
        address={tokenAddress}
        tokenId={tokenId}
        width="100%"
        height="100%"
        preset= "small"
        style={{ borderRadius: "10px", padding: "0px" }}
        onError={(e) => {
            e.target.src = fallbackImage;}}
      />
    </CenterProvider>
  );
}

