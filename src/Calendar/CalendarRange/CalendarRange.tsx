import dayjs, { Dayjs } from "dayjs";
import { ScrollArea, Typography } from "ingred-ui";
import { FC, useCallback, useMemo, useRef, useState } from "react";
import { Day } from "./internal/Day";
import { ClickState, DateRange } from "./types";
import { isSelected, isBetween } from "./utils";
import { HEIGHT, weekList } from "../constants";
import {
  CalendarContainer,
  Container,
  DatePickerContainer,
  DayStyle,
} from "../styled";
import { useScroll } from "../hooks/useScroll";

type Props = {
  date: DateRange;
  onDateChange?: (date: Dayjs) => void;
};

/**
 * CalendarRange
 * Scrollable calendar UI.
 * Currently, one year from the currently selected date is displayed.
 * @todo forwardRef
 */
export const CalendarRange: FC<Props> = ({ date, onDateChange }) => {
  const vdate = useMemo(
    () => ({
      startDate: date.startDate?.clone(),
      endDate: date.endDate?.clone(),
    }),
    []
  );

  const ref = useRef<HTMLDivElement>(null);
  const { monthList } = useScroll(vdate.startDate ?? dayjs(), ref);

  return (
    <Container>
      <ScrollArea ref={ref} minHeight={HEIGHT} maxHeight={HEIGHT} id="calendar">
        <>
          {monthList.map((m) => (
            <DatePickerContainer
              key={m.format("YYYY-MM")}
              id={m.format("YYYY-MM")}
              className={m.format("YYYY-MM")}
            >
              <Typography align="center" component="h1" weight="bold">
                {m.format("YYYY年MM月")}
              </Typography>
              <CalendarContainer>
                {weekList["ja"].map((week) => (
                  <DayStyle key={week}>{week}</DayStyle>
                ))}
                {Array.from(new Array(m.startOf("month").day()), (_, i) => (
                  <DayStyle key={i} />
                ))}
                {Array.from(new Array(m.daysInMonth()), (_, i) => i + 1).map(
                  (day) => (
                    <DayStyle key={day}>
                      <Day
                        key={day}
                        value={dayjs(new Date(m.year(), m.month(), day))}
                        selected={isSelected(date, m, day)}
                        isBetween={isBetween(date, m, day)}
                        onClickDate={onDateChange}
                      >
                        {day}
                      </Day>
                    </DayStyle>
                  )
                )}
              </CalendarContainer>
            </DatePickerContainer>
          ))}
        </>
      </ScrollArea>
    </Container>
  );
};
