import styled from "styled-components";

export const StyledGame = styled.div`
  height: 75vh;
  max-height: 500px;
  display: grid;
  grid-template-rows: 50px 1fr;
  grid-template-columns: minmax(50px, auto) 1fr minmax(50px, auto);
`;

export const StyledScore = styled.p`
  font-size: 1.5rem;
`;

export const StyledTimer = styled.p`
  font-size: 1.5rem;
  grid-column: 3;
`;

export const StyledCharacterGame = styled.p`
  font-size: 15rem;
  grid-row: 2;
  grid-column: 1/4;
  text-align: center;
  color: var(--accent-color);
  margin-top: 15vh;
`;

export const StyledCharacterGameOver = styled.p`
  font-size: 15rem;
  grid-row: 2;
  grid-column: 1/4;
  text-align: center;
  color: var(--accent-color);
`;

export const StyledDisplay = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 65vh;
`;

export const StyledOptions = styled.div`
  margin: 0px auto;
  margin-bottom: 15px;
  width: 200px;
`;
