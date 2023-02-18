import { Flex, Modal, Spacer } from "ingred-ui";
import { FC, ReactNode, memo, useCallback, useRef, useState } from "react";
import { InputRange, InputRangeInCalendar } from "../Input/Input";
import { Card, Action, LeftContainer } from "./styled";
import { CalendarRange } from "../Calendar/CalendarRange";
import { DateRange } from "../Calendar/CalendarRange/types";
import { NativeInputRange } from "../Input/Native";
import { Dayjs } from "dayjs";

type Action = {
  text: ReactNode;
  onClick: () => void;
};

type Props = {
  date: DateRange;
  actions?: Action[];
  onChange?: (date: DateRange) => void;
};

// TODO: should be moved to internal/Actions.tsx
export const Actions = memo(({ actions }: { actions?: Action[] }) => (
  <>
    {actions?.map(({ text, onClick }, i) => (
      <Action key={i} onClick={() => onClick()}>
        {text}
      </Action>
    ))}
  </>
));

/**
 * @todo add close if keydown esc
 * @todo forwardRef
 */
export const DateRangePicker: FC<Props> = ({ date, actions, onChange }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [clickState, setClickState] = useState<"start" | "end">("start");

  const handleDateChange = useCallback(
    (value: Dayjs) => {
      switch (clickState) {
        case "start":
          onChange?.({
            startDate: value,
            endDate: date.endDate,
          });
          setClickState("end");
          break;
        case "end":
          onChange?.({
            startDate: date.startDate,
            endDate: value,
          });
          setClickState("start");
          break;
        // Maybe, I will add other state.
        default:
          console.warn("Unexpected clickState");
          break;
      }
    },
    [date]
  );

  return (
    <Flex ref={ref}>
      {/* input */}
      {!isOpen && (
        <InputRange
          date={date}
          onChange={onChange}
          onClick={() => setIsOpen(true)}
        />
      )}

      {/* calendar */}
      {/* TODO: should think using modal */}
      {isOpen && (
        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
          <Card display="flex">
            <LeftContainer>
              <NativeInputRange
                date={date}
                clickState={clickState}
                onChange={onChange}
              />
              <Spacer pb={1} />
              <Actions actions={actions} />
            </LeftContainer>
            <Spacer pl={1} />
            <CalendarRange date={date} onDateChange={handleDateChange} />
          </Card>
        </Modal>
      )}
    </Flex>
  );
};
