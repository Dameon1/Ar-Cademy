import { Modules } from "../../Modules";
import { Button, Image, Spacer, Row, Col, Container } from "@nextui-org/react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineArrowRight } from "react-icons/ai";
import { getRecentUploadData } from "../../Queries/AppQueries";
import { Grid, Card, Text, Link, Tooltip } from "@nextui-org/react";

import AsyncImageLoader from "../../components/AsyncImageLoader";

export function LandingPage() {
  const navigate = useNavigate();
  const [recentUploads, setRecentUploads] = useState([]);
  const modules = Object.keys(Modules);
  const bundlrNader =
    "https://arweave.net/Adtwh6Z4k_OWzvnkILpwXqFDM5po0JpgqLW8PsMcZoU";

  useEffect(() => {
    async function getRecentUploads() {
      const recentUploadData = await getRecentUploadData();
      setRecentUploads(recentUploadData);
    }
    getRecentUploads();
  }, []);

  const MockItem = ({ text }) => {
    return (
      <Card css={{ h: "$24", $$cardColor: "$colors$primary" }}>
        <Card.Body>
          <Text h6 size={15} color="white" css={{ mt: 0 }}>
            {text}
          </Text>
        </Card.Body>
      </Card>
    );
  };

  const moduleCards = modules.map((module, index) => {
    return (
      <li key={module} className="moduleContent">
        <h4>{modules[index]}</h4>
        <p>{Modules[module].description}</p>
        <img
          src={Modules[module].moduleImage}
          className="heroImage"
          alt={`${Modules[module].title}`}
        />
        <Row justify="center">
          <Button
            className="button buttonText"
            css={{
              color: "black",
              border: "2px solid #008c9e",
              fontSize: "0.75em",
              padding: "0.3em",
              backgroundColor: "white",
              transition: "all 0.2s ease-in-out",
            }}
            onClick={() => navigate(`/modules/${module}`)}
            iconRight={<AiOutlineArrowRight size={18} />}
          >
            <p>Explore</p>
          </Button>
        </Row>
      </li>
    );
  });
  console.log(
    "Welcome to the Permaweb, This site is perma-stored on Arweave https://arweave.net/dHf8bIr9FHoAFuvhbxKiGDaRF5AU_7p9x9W3wFsuMbY"
  );

  let recentUploadCards = recentUploads.map((upload, index) => {
    return (
      <li key={index} className="moduleContent">
        <h4>{upload.title}</h4>

        <img
          src={`https://arweave.net/${upload.videoImageId}`}
          className="heroImage"
          alt={`Follow of ${upload.title}`}
        />
        <Row justify="center">
          <Button
            className="button buttonText"
            css={{
              color: "black",
              border: "2px solid #008c9e",
              fontSize: "0.75em",
              padding: "0.3em",
              backgroundColor: "white",
              transition: "all 0.2s ease-in-out",
            }}
            onClick={() => navigate(`/AtomicPlayground/${upload.id}`)}
            iconRight={<AiOutlineArrowRight size={18} />}
          >
            <p>Goto</p>
          </Button>
        </Row>
      </li>
    );
  });

  return (
    <>
      <div className="text-container">
        <h2 className="landingPageHeadline">Welcome to ARcademy</h2>
        <p className="pText">
          Welcome to Arcademy, the ultimate community-driven learning platform
          for the Arweave ecosystem! Here, you'll discover a vast array of
          modules that will teach you everything you need to know about coding,
          design, and building with the Arweave blockchain. Imagine creating
          atomic assets, earning $Stampcoin, and even stamping other profiles'
          content as you master the art of building on this cutting-edge
          technology. Join us now and be part of the future of blockchain!
        </p>
      </div>
      <Spacer y={2} />
      <Container justify="space-around" align="center">
        <Spacer y={2} />
        <Row justify="space-around" align="center" wrap="no-wrap">
          <Col>
            <Image
              src={bundlrNader}
              alt="bundlrNader"
              css={{ maxWidth: "650px" }}
            />
          </Col>
          <Spacer x={2} />
          <Col width="150px">
            <h3>Learn with Nader</h3>
            <p className="pText">
              Are you ready to take the first step towards building your own
              Smartweave contract without breaking the bank? Look no further!
              Join Nader on an exciting journey as he guides you through the
              process of creating your very own contract, with zero transaction
              fees!
            </p>
            <Spacer y={1} />
            <Row justify="center">
              <Button
                css={{
                  color: "black",
                  border: "2px solid #008c9e",
                  fontSize: "0.75em",
                  padding: "0.3em",
                  backgroundColor: "white",
                  transition: "all 0.2s ease-in-out",
                }}
                className="button buttonText"
                onClick={() => navigate("/playground/28")}
              >
                <p className="pText">Enter</p>
              </Button>
            </Row>
          </Col>
        </Row>
      </Container>
      <Spacer y={2} />

      <Row justify="center" align="center">
        <h3>This Months Spotlight Content</h3>
      </Row>

      <Grid.Container gap={2} justify="center" align="center">
        <Grid sm={4} justify="center" align="center">
          <Card css={{ mw: "240px" }}>
            <Card.Header css={{ display: "inline-block", padding: "5" }}>
              <h3 b>Hyper63 - Company</h3>
            </Card.Header>
            <Card.Divider />
            <Card.Body css={{ py: "$10" }}>
              <Text className="pText">
                Building products and services for developers.
              </Text>
            </Card.Body>
            <Card.Divider />
            <Card.Footer>
              <img
                style={{ width: "50px" }}
                alt="hyper63Logo"
                src="https://arweave.net/daB-oX1SnG8gH1Tvx5DtcZ3DAAIWSTsixjDd8Nhl-Yw"
              />

              <Row justify="flex-end">
                <Link href="https://hyper63.com/" target="_blank">
                  <Button
                    size="sm"
                    className="button"
                    css={{
                      color: "black",
                      border: "2px solid #008c9e",
                      fontSize: "1.1em",
                      backgroundColor: "white",
                      transition: "all 0.2s ease-in-out",
                    }}
                  >
                    Learn more
                  </Button>
                </Link>
              </Row>
            </Card.Footer>
          </Card>
        </Grid>
        <Grid sm={4} justify="center" align="center">
          <Card css={{ mw: "240px" }}>
            <Card.Header css={{ display: "inline-block", padding: "5" }}>
              <h3 b>Tom Wilson - Creator</h3>
            </Card.Header>
            <Card.Divider />
            <Card.Body css={{ py: "$10" }}>
              <Text className="pText">Founder/CEO at Hyper63, LLC</Text>
            </Card.Body>
            <Card.Divider />
            <Card.Footer>
              <img
                style={{ width: "50px" }}
                alt="hyper63Logo"
                src="https://arweave.net/pFgnS-OV3a_egOjwio0Tzza3jfYADQLmmtfgbe2JKHc"
              />
              <Row justify="flex-end">
                <Button
                  size="sm"
                  className="button"
                  css={{
                    color: "black",
                    border: "2px solid #008c9e",
                    fontSize: "1.1em",
                    backgroundColor: "white",
                    transition: "all 0.2s ease-in-out",
                  }}
                  onPress={() =>
                    navigate(
                      "/profile/vh-NTHVvlKZqRxc8LyyTNok65yQ55a_PJ1zWLb9G2JI/vh-NTHVvlKZqRxc8LyyTNok65yQ55a_PJ1zWLb9G2JI"
                    )
                  }
                >
                  Learn more
                </Button>
              </Row>
            </Card.Footer>
          </Card>
        </Grid>
      </Grid.Container>
      <Spacer y={2} />
      <div>
        <Row justify="center" align="center">
          <h3>Collections:</h3>
        </Row>
        <ul className="moduleCards">{moduleCards}</ul>
      </div>
      <Spacer y={2} />
      <div>
        <h3>Newly Added:</h3>
        <ul className="moduleCards">{recentUploadCards}</ul>
      </div>
      <Spacer y={2} />
      <Row justify="center" align="center">
        <h3>February Sponsors</h3>
      </Row>
      <Container gap={2} justify="space-between" align="center">
        <Row justify="center">
          <Col style={{ width: "75px", height: "75px" }}>
            <Tooltip content="PermaDAO">
              <Link
                href="https://twitter.com/perma_dao"
                target="_blank"
                rel="noreferrer"
              >
                <div style={{ width: "75px", height: "75px" }}>
                  <AsyncImageLoader
                    src={
                      "https://arweave.net/ywMQ7PhpCU8XFK2urlPV3frzA2B4Wwvb5q1_anxPD7M"
                    }
                    alt="PermaDAO"
                  />
                </div>
              </Link>
            </Tooltip>
          </Col>
          <Spacer x={2} />

          <Col style={{ width: "75px", height: "75px" }}>
            <Tooltip content="DecentLand">
              <Link
                href="https://www.decent.land/"
                target="_blank"
                rel="noreferrer"
              >
                <div style={{ width: "100px", height: "90px" }}>
                  <AsyncImageLoader
                    src={
                      "https://arweave.net/qOe4PDOcCOGJmEue2HE6qPgFphMu5qO7mwYPKtGBbRA"
                    }
                    alt="DecentLand"
                  />
                </div>
              </Link>
            </Tooltip>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default LandingPage;
