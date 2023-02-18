import { Dayjs } from "dayjs";
import { Typography } from "ingred-ui";
import { KeyboardEvent, useCallback, useEffect, useRef, useState } from "react";
import { AllowedKeys } from "../constants";
import { useInput } from "./hooks";
import { NativeInputContainer } from "./styled";
import { ClickState, DateRange } from "../../Calendar/CalendarRange/types";

type Props = {
  date: {
    startDate: Dayjs;
    endDate: Dayjs;
  };
  clickState: ClickState;
  onChange?: (value: DateRange) => void;
};

export const NativeInputRange = ({ date, clickState, onChange }: Props) => {
  const startRef = useRef<HTMLInputElement>(null);
  const endRef = useRef<HTMLInputElement>(null);

  const handleStartDateChange = (newDate: Dayjs) => {
    onChange && onChange({ ...date, startDate: newDate });
  };
  const handleEndDateChange = (newDate: Dayjs) => {
    onChange && onChange({ ...date, endDate: newDate });
  };

  const handleStartKeyDown = useCallback(
    (event: KeyboardEvent<HTMLInputElement>) => {
      const k = event.key as AllowedKeys;
      if (k === AllowedKeys.ArrowRight) {
        endRef.current?.focus();
      }
    },
    []
  );

  const handleEndKeyDown = useCallback(
    (event: KeyboardEvent<HTMLInputElement>) => {
      const k = event.key as AllowedKeys;
      if (k === AllowedKeys.ArrowLeft) {
        // I want to focus on the date of the start date, but the focus is on the year
        // I don't know how to solve this...
        startRef.current?.focus();
      }
    },
    []
  );

  const { valid: validStart, handleDateChange: handleStartChange } = useInput(
    date.startDate,
    handleStartDateChange
  );

  const { valid: validEnd, handleDateChange: handleEndChange } = useInput(
    date.endDate,
    handleEndDateChange
  );

  useEffect(() => {
    switch (clickState) {
      case "start":
        // startRef.current?.focus();
        break;
      case "end":
        // endRef.current?.focus();
        break;
    }
  }, [date, clickState]);

  return (
    <>
      <NativeInputContainer
        ref={startRef}
        type="date"
        min="1900-01-01"
        max="2099-12-31"
        valid={validStart}
        focus={clickState === "start"}
        value={date.startDate.format("YYYY-MM-DD")}
        onKeyDown={handleStartKeyDown}
        onChange={handleStartChange}
      />
      <Typography component="span" color="gray">
        {" "}
        -{" "}
      </Typography>
      <NativeInputContainer
        ref={endRef}
        type="date"
        min="1900-01-01"
        max="2099-12-31"
        valid={validEnd}
        focus={clickState === "end"}
        value={date.endDate.format("YYYY-MM-DD")}
        onKeyDown={handleEndKeyDown}
        onChange={handleEndChange}
      />
    </>
  );
};
