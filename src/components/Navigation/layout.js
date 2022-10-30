import { Box } from "./box.js";

export const Layout = ({ children }) => (
  <Box
    css={{
      maxW: "110%"
    }}
  >
    {children}
  </Box>
);
