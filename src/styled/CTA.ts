import styled from "styled-components";
import { Link } from "react-router-dom";

export default styled(Link)`
  font-size: 1.5rem;
  text-align: center;
  border: 1px solid var(--accent-color);
  border-radius: 10px;
  padding: 10px;
  display: block;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;
