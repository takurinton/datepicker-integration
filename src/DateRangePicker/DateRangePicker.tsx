import { Flex, Modal, Spacer } from "ingred-ui";
import { FC, ReactNode, useRef, useState } from "react";
import { InputRange, InputRangeInCalendar } from "../Input/Input";
import { Card, Action, LeftContainer } from "./styled";
import { CalendarRange } from "../Calendar/CalendarRange";
import { DateRange } from "../Calendar/CalendarRange/types";

type Action = {
  text: ReactNode;
  onClick: () => void;
};

type Props = {
  date: DateRange;
  actions?: Action[];
  onChange?: (date: DateRange) => void;
};

/**
 * @todo add close if keydown esc
 * @todo forwardRef
 */
export const DateRangePicker: FC<Props> = ({ date, actions, onChange }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Flex ref={ref}>
      {/* input */}
      <InputRange
        date={date}
        onChange={onChange}
        onClick={() => setIsOpen(true)}
      />
      <Spacer pb={1} />

      {/* calendar */}
      {/* TODO: should think using modal */}
      {isOpen && (
        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
          <Card display="flex">
            <LeftContainer>
              <InputRangeInCalendar date={date} onChange={onChange} />
              <Spacer pb={1} />
              {actions?.map(({ text, onClick }, i) => (
                <Action key={i} onClick={() => onClick()}>
                  {text}
                </Action>
              ))}
            </LeftContainer>
            <Spacer pl={1} />
            <CalendarRange date={date} onDateChange={onChange} />
          </Card>
        </Modal>
      )}
    </Flex>
  );
};
