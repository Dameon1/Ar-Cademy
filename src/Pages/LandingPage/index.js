import { Link } from "react-router-dom";

import { Modules } from "../../Modules";
import {
  Button,
  Image,
  Text,
  Loading,
  Spacer,
  Row,
  Col,
  Container,
} from "@nextui-org/react";

import { useNavigate } from "react-router-dom";
import { AiOutlineArrowRight } from "react-icons/ai";

export function LandingPage() {
  const navigate = useNavigate();
  const modules = Object.keys(Modules);
  const bundlrNader = "https://arweave.net/Adtwh6Z4k_OWzvnkILpwXqFDM5po0JpgqLW8PsMcZoU";

  const moduleCards = modules.map((module, index) => {
    return (
      <li key={module} className="moduleContent">
        <h4>{modules[index]}</h4>
        <p>{Modules[module].description}</p>
        <img
          src={Modules[module].moduleImage}
          className="heroImage"
          alt={`Follow of ${Modules[module].title}`}
        />
        <Row justify="center">
          <Button
            className="nav-link identity-link buttonText"
            onClick={() => navigate(`/modules/${module}`)}
            iconRight={<AiOutlineArrowRight size={18} />}
          >
            Explore
          </Button>
        </Row>
      </li>
    );
  });
  console.log(
    "Welcome to the Permaweb, This site is perma-stored on Arweave https://arweave.net/JE4YYPRLLrdXoHZnVlatTm27qu5WS3rIQQMbBMZpgq4"
  );

  return (
    <>
      <div className="text-container">
        <h2 className="landingPageHeadline">Welcome to ARcademy</h2>
        <p className="page-introduction">
          Arcademy is community-driven and developed learning platform, for the
          Arweave ecosystem. Maintaining a variety of modules, you can learn to
          code, design, and build with the Arweave blockchain. Upload your own
          instructional videos and make the community leader board or learn a
          new skill with our community of developers and creators to show Proof
          of Knowledge (PoK) to the world.
        </p>
      </div>
      <Spacer y={2} />
      <Container justify="space-around" align="center">
        <Spacer y={2} />
        <Row justify="space-between" align="center" wrap="no-wrap">
          <Col width="150px">
            <h3>Learn with Nader</h3>
            <p>
              Follow along with Nader as he teaches you how to build your first
              Smartweave contract with zero transaction fees.
            </p>
            <Spacer y={1} />
            <Row justify="center">
              
                <Button className="nav-link identity-link buttonText" onClick={() => navigate("/playground/28")}>
                  Enter
                </Button>
              
            </Row>
          </Col>
          <Spacer x={2} />
          <Col>
            <Image
              src={bundlrNader}
              alt="bundlrNader"
              css={{ maxWidth: "650px" }}
            />
          </Col>
        </Row>
      </Container>
      <Spacer y={2} />
      <div>
        <h3>Collections:</h3>
        <ul className="moduleCards">{moduleCards}</ul>
      </div>
    </>
  );
}

export default LandingPage;
