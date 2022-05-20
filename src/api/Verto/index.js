import Verto from "@verto/js";
import Arweave from "arweave";

export const client = new Verto(
  // wallet to use for interactions (for arconnect, leave it undefined or "use_wallet")
  "use_wallet",

  // custom arweave client
  new Arweave({
    host: "www.arweave.run",
    port: "443",
    protocol: "https",
  }),
);

export default client;