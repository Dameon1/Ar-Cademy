import React from "react";
import "./Footer.css";
import permaSeal from "../../light.png";
import { Row, Col, Link, Spacer } from "@nextui-org/react";
import { FaTwitter, FaDiscord } from "react-icons/fa";

export function Footer() {
  return (
    <footer className="main-footer">
      <Row justify="flex-start">
        <Col css={{ height: "100%", marginTop: "10px" }}>
          <Row justify="flex-start">
            <div className="permaSeal">
              <img src={permaSeal} alt="Arcademy Perma Seal" />
            </div>
          </Row>
        </Col>
        <Col css={{ height: "100%", marginTop: "20px" }}>
          <Row align="center" justify="center" className="pText">
            &copy;2023
          </Row>
        </Col>
        <Col>
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
    </footer>
  );
}

export default Footer;
