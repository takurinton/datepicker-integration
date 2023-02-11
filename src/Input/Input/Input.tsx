import { Dayjs } from "dayjs";
import { FC } from "react";
import { useInput } from "./hooks";
import { CommonInput, CommonInputInCalendar } from "./CommonInput";

type Props = {
  date: Dayjs;
  onChange?: (date: Dayjs) => void;
  onClick?: () => void;
};

export const Input: FC<Props> = ({ date, onChange, onClick }) => {
  const {
    ref,
    yearRef,
    monthRef,
    dayRef,
    focus,
    selected,
    valid,
    handleChange,
    onFocus,
    onBlur,
    onKeyDown,
  } = useInput(date, onChange);

  console.log("Input render");

  return (
    <CommonInput
      ref={ref}
      date={date}
      focus={focus}
      valid={valid}
      selected={selected}
      yearRef={yearRef}
      monthRef={monthRef}
      dayRef={dayRef}
      handleChange={handleChange}
      onFocus={onFocus}
      onBlur={onBlur}
      onKeyDown={onKeyDown}
      onClick={onClick}
    />
  );
};

export const InputInCalendar: FC<Props> = ({ date, onChange }) => {
  const {
    ref,
    yearRef,
    monthRef,
    dayRef,
    focus,
    selected,
    valid,
    handleChange,
    onFocus,
    onBlur,
    onKeyDown,
  } = useInput(date, onChange);

  console.log("Input render");

  return (
    <CommonInputInCalendar
      ref={ref}
      date={date}
      focus={focus}
      valid={valid}
      selected={selected}
      yearRef={yearRef}
      monthRef={monthRef}
      dayRef={dayRef}
      handleChange={handleChange}
      onFocus={onFocus}
      onBlur={onBlur}
      onKeyDown={onKeyDown}
    />
  );
};
