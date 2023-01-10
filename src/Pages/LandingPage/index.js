import { Modules } from "../../Modules";
import { Button, Image, Spacer, Row, Col, Container } from "@nextui-org/react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineArrowRight } from "react-icons/ai";
import { getRecentUploadData } from "../../Queries/AppQueries";

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
    "Welcome to the Permaweb, This site is perma-stored on Arweave https://arweave.net/8aGgG7C_CnyOZQZsCg3lSEt9B-ESmp2puKX_tEulG_8"
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
          Arcademy is community-driven and developed learning platform, for the
          Arweave ecosystem. Maintaining a variety of modules, you can learn to
          code, design, and build with the Arweave blockchain. Create atomic
          assets and earn $Stampcoin along with stamping other profiles'
          content.
        </p>
      </div>
      <Spacer y={2} />
      <Container justify="space-around" align="center">
        <Spacer y={2} />
        <Row justify="space-between" align="center" wrap="no-wrap">
          
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
              Follow along with Nader as he teaches you how to build your first
              Smartweave contract with zero transaction fees.
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
      <div>
        <h3>Collections:</h3>
        <ul className="moduleCards">{moduleCards}</ul>
      </div>
      <Spacer y={2} />
      <div>
        <h3>Newly Added:</h3>
        <ul className="moduleCards">{recentUploadCards}</ul>
      </div>

    </>
  );
}

export default LandingPage;
