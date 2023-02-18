import { memo } from "react";
import styled from "styled-components";
import { Theme } from "ingred-ui";

export const NativeInputContainer = memo(styled.input<{
  valid: boolean;
  focus: boolean;
}>`
  border: none;
  border-bottom: 1px solid #ccc;
  border-bottom: solid 2px ${({ theme }) => theme.palette.divider};

  &::-webkit-calendar-picker-indicator {
    display: none;
  }

  ${({ valid, focus, theme }) => `
    border-bottom: solid 2px ${
      !valid
        ? theme.palette.danger.main
        : focus
        ? theme.palette.primary.main
        : theme.palette.divider
    };
  `}

  &:focus {
    outline: none;
    border-bottom: solid 2px
      ${({ theme, valid }) =>
        valid ? theme.palette.primary.main : theme.palette.danger.main};
  }
`);
