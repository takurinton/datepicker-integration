import { Flex } from "ingred-ui";
import styled from "styled-components";

export const Card = styled(Flex)`
  border: 1px solid #ccc;
  border-radius: 4px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);
  padding: 16px;
  width: fit-content;
`;

export const LeftContainer = styled.div`
  /* width: 200px; */
`;

export const Action = styled.button`
  cursor: pointer;
  font-weight: bold;
  background: none;
  border: none;
  padding: 0;
  display: block;
  margin-top: 8px;
  margin-bottom: 8px;
`;
