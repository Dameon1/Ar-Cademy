import React from "react";
import "./Footer.css";
import permaSeal from "../../light.png";
import { Container, Row, Col, Link, Spacer } from "@nextui-org/react";
import { FaTwitter, FaGithub, FaDiscord } from "react-icons/fa";

export function Footer() {
  return (
    <footer className="main-footer">
      <Row gap={1} justify="flex-start">
        <Col css={{ height: "100%", marginTop: "10px" }}>
          <Row justify="flex-start">
            <div className="permaSeal">
              <img src={permaSeal} alt="Arcademy Perma Seal" />
            </div>
          </Row>
        </Col>
        <Col css={{ height: "100%", marginTop: "20px" }}>
          <p className="pText">
           &copy;2023{" "}
          </p>
        </Col>
        <Col alignItems="center">
          <Row
            justify="flex-end"
            align="flex-end"
            css={{ height: "100%", marginTop: "20px", paddingRight: "10px" }}
          >
            <Link
              href={`https://discord.gg/QgRwBCdG3d`}
              target="_blank"
              rel="noreferrer"
            >
              <FaDiscord
                className="socialImageLinks"
                size={30}
                aria-hidden="true"
              />
            </Link>

<Spacer x={1} />

            <Link
              href={`https://twitter.com/Ar_Cademy`}
              target="_blank"
              rel="noreferrer"
            >
              <FaTwitter
                className="socialImageLinks"
                size={30}
                aria-hidden="true"
              />
            </Link>
          </Row>
        </Col>
      </Row>
      <Row>
        {/* <Col>
            <p className="pText">
              &copy;2023{" "}
              <a
                href="https://arweave.news/"
                target="_blank"
                rel="noopener noreferrer"
                className="textNoDec "
              >
                @Arweave News
              </a>
            </p>
          </Col>
          <Col>
            <Link
              href={`https://twitter.com/Ar_Cademy`}
              target="_blank"
              rel="noreferrer"
            >
              <FaTwitter
                className="socialImageLinks"
                size={25}
                aria-hidden="true"
              />
            </Link>
            <Link>
              <FaDiscord
                className="socialImageLinks"
                size={25}
                aria-hidden="true"
              />
            </Link>
          </Col> */}
      </Row>

      {/* <div className="permaSeal">
        <img src={permaSeal} alt="Arcademy Perma Seal" />
      </div>

      <p className="pText">
        &copy;2023{" "}
        <a
          href="https://arweave.news/"
          target="_blank"
          rel="noopener noreferrer"
          className="textNoDec "
        >
          @Arweave News
        </a>
      </p> */}
    </footer>
  );
}

export default Footer;
