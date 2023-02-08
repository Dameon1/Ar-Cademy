import AtomicVideoPlayerContainer from "../../components/AtomicVideoPlayerContainer";

import AtomicSandbox from "../../components/AtomicSandbox";
import { useState, useEffect } from "react";
import { getAssetData } from "../../Queries/AssetQueries/assetData";

export default function AtomicPlayground() {
  const [isLoading, setIsLoading] = useState(true);
  const [urls, setUrls] = useState([]);
  let module = window.location.hash.split("/");
  let itemId = module[module.length - 1];

  useEffect(() => {
    async function data(id) {
      let assetData = await getAssetData(id);
      setUrls(JSON.parse(assetData.externalLinks));
      setIsLoading(false);
    }
    data(itemId);
  }, [itemId, isLoading]);

  function setState() {
    setIsLoading(true);
  }

  return (
    <>
      {isLoading ? null : (
        <section>
          <div className="playground-section">
            <AtomicVideoPlayerContainer setState={setState} />
            <AtomicSandbox
              title="sandbox"
              sandboxContent={urls.links[0]}
              sandboxLinks={urls.links}
            />
          </div>
        </section>
      )}
    </>
  );
}
