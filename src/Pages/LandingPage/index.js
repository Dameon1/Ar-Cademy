import { Modules } from "../../Modules";
import { Button, Image, Spacer, Row, Col, Container } from "@nextui-org/react";

import { useNavigate } from "react-router-dom";
import { AiOutlineArrowRight } from "react-icons/ai";

export function LandingPage() {
  const navigate = useNavigate();
  const modules = Object.keys(Modules);
  const bundlrNader =
    "https://arweave.net/Adtwh6Z4k_OWzvnkILpwXqFDM5po0JpgqLW8PsMcZoU";

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
            <p className="page-introduction">Explore</p>
          </Button>
        </Row>
      </li>
    );
  });
  console.log(
    "Welcome to the Permaweb, This site is perma-stored on Arweave https://arweave.net/8aGgG7C_CnyOZQZsCg3lSEt9B-ESmp2puKX_tEulG_8"
  );

  return (
    <>
      <div className="text-container">
        <h2 className="landingPageHeadline">Welcome to ARcademy</h2>
        <p className="page-introduction">
          Arcademy is community-driven and developed learning platform, for the
          Arweave ecosystem. Maintaining a variety of modules, you can learn to
          code, design, and build with the Arweave blockchain. Create atomic assets
          and earn $Stampcoin along with stamping other profiles' content.
        </p>
      </div>
      <Spacer y={2} />
      <Container justify="space-around" align="center">
        <Spacer y={2} />
        <Row justify="space-between" align="center" wrap="no-wrap">
          <Col width="150px">
            <h3>Learn with Nader</h3>
            <p className="page-introduction">
              Follow along with Nader as he teaches you how to build your first
              Smartweave contract with zero transaction fees.
            </p>
            <Spacer y={1} />
            <Row justify="center">
              <Button
                className="nav-link identity-link buttonText"
                onClick={() => navigate("/playground/28")}
              >
                <p className="page-introduction">Enter</p>
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
