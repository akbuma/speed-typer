import React, { useEffect } from "react";
import CTA from "../styled/CTA";
import { Accent, StyledTitle } from "../styled/Random";
import { StyledDisplay } from "../styled/Game";
import { useAuth0 } from "@auth0/auth0-react";

export default function Home() {
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();

  useEffect(() => {
    if (isAuthenticated) {
      const getToken = async () => {
        const token = await getAccessTokenSilently({
          audience: "https://speedtyperapi/",
        });
        console.log(`token is ${token}`);
      };
      getToken();
    }
  });

  return (
    <StyledDisplay>
      <StyledTitle>Ready to Type?</StyledTitle>
      <CTA to="/game" data-test="game-link">
        Click or type <Accent>'s'</Accent> to start playing!
      </CTA>
    </StyledDisplay>
  );
}
