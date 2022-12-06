import { useContext } from "react";
import { FaTwitter, FaGithub, FaGlobe } from "react-icons/fa";
import { Button, Spacer, Row, Tooltip, Link } from "@nextui-org/react";
import { icons } from "../../static";
import { AvatarS, Bio } from "../../static/styles/Profile";

import MainContext from "../../context";

function ARKdisplay(props) {
  const { content, evmAddr } = props;
  const { theme } = useContext(MainContext);
  const lensLabel = content.EVM[evmAddr]?.LENS_HANDLES[0].replace("@", "");

  return (
    <div style={{ padding: "5px" }}>
      <AvatarS
        src={`https://arweave.net/${content.ARWEAVE.ANS.avatar}`}
        sx={{ width: 100, height: 100 }}
      />

      {props.content.ARWEAVE.ANS.currentLabel && (
        <>
          <h2>{props.content.ARWEAVE.ANS.currentLabel}</h2>
          <h2>{content.EVM[evmAddr].ENS}</h2>
        </>
      )}

      <Bio>{props.content.ARWEAVE.ANS.bio}</Bio>
      <Row wrap="wrap" align="center" justify="space-around">
        {props.content.ARWEAVE.ANS.links.twitter && (
          <>
            <Tooltip content={`${props.content.ARWEAVE.ANS.links.twitter}`}>
              <Link
                href={`https://twitter.com/${props.content.ARWEAVE.ANS.links.twitter}`}
                target="_blank"
                rel="noreferrer"
              >
                <FaTwitter
                  className="socialImageLinks"
                  size={25}
                  aria-hidden="true"
                />
              </Link>
            </Tooltip>
          </>
        )}

        {props.content.ARWEAVE.ANS.links.github && (
          <Tooltip content={`${props.content.ARWEAVE.ANS.links.github}`}>
            <Link
              href={`https://github.com/${props.content.ARWEAVE.ANS.links.github}`}
              target="_blank"
              rel="noreferrer"
              aria-hidden="true"
            >
              <FaGithub
                href={`https://github.com/${props.content.ARWEAVE.ANS.links.github}`}
                size={25}
                className="socialImageLinks"
              />
            </Link>
          </Tooltip>
        )}
        {props.content.ARWEAVE.ANS.links.customUrl && (
          <Tooltip content={`${props.content.ARWEAVE.ANS.links.customUrl}`}>
            <Link
              href={`${props.content.ARWEAVE.ANS.links.customUrl}`}
              target="_blank"
              rel="noreferrer"
              aria-hidden="true"
            >
              <FaGlobe className="socialImageLinks" size={25} />
            </Link>
          </Tooltip>
        )}
      </Row>
      <Spacer y={1} />
      <Row wrap="wrap" align="center" justify="space-around">
        {content.EVM[evmAddr]?.LENS_HANDLES && (
          <Tooltip content={`${lensLabel}`}>
            <Link
              href={`https://lenster.xyz/u/${lensLabel}`}
              target="_blank"
              rel="noreferrer"
              aria-hidden="true"
            >
              <img
                height={30}
                width={30}
                className="socialImageLinks"
                src="https://raw.githubusercontent.com/lens-protocol/brand-kit/main/Logo/SVG/LENS%20LOGO_%20copy_Icon%20Only.svg"
                alt="Lens logo"
              />
            </Link>
          </Tooltip>
        )}
        {content.ARWEAVE.ANS.currentLabel && (
          <Tooltip content={`${content.ARWEAVE.ANS.currentLabel}`}>
            <Link
              href={`https://v2.viewblock.io/arweave/address/${content.ARWEAVE.ANS.currentLabel}`}
              target="_blank"
            >
              <img
                width={30}
                height={30}
                className="socialImageLinks"
                src={
                  !theme
                    ? icons.arweaveWebWallet.light
                    : icons.arweaveWebWallet.dark
                }
                alt="Arweave logo"
                quality={50}
              />
            </Link>
          </Tooltip>
        )}
        {content.EVM[evmAddr].ENS && (
          <Tooltip content={`${content.EVM[evmAddr].ENS}`}>
            <Link
              href={`https://etherscan.io/enslookup-search?search=${content.EVM[evmAddr].ENS}`}
              target="_blank"
            >
              <img
                height={30}
                width={30}
                src="https://cryptologos.cc/logos/ethereum-eth-logo.svg?v=002"
                alt="Eth logo"
                quality={50}
              />
            </Link>
          </Tooltip>
        )}
      </Row>

      <Spacer y={1} />
      <a
        href={`https://${content.ARWEAVE.ANS.currentLabel}.ar.page`}
        target="_blank"
        rel="noreferrer"
        className="textNoDec"
      >
        <Button className="identity-link buttonText">
          <p>{content.ARWEAVE.ANS.currentLabel}.ar.page</p>
        </Button>
      </a>
    </div>
  );
}

export default ARKdisplay;