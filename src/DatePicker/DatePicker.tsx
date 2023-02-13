import { Flex, Modal, Spacer } from "ingred-ui";
import { FC, ReactNode, memo, useRef, useState } from "react";
import { Input, InputInCalendar } from "../Input/Input";
import { Calendar } from "../Calendar/Calendar";
import { Dayjs } from "dayjs";
import { Card, Action, LeftContainer } from "./styled";

type Action = {
  text: ReactNode;
  onClick: () => void;
};

type Props = {
  date: Dayjs;
  actions?: Action[];
  onChange: (date: Dayjs) => void;
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
export const DatePicker: FC<Props> = ({ date, actions, onChange }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Flex ref={ref}>
      {/* input */}
      {!isOpen && (
        <Input
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
              <InputInCalendar date={date} onChange={onChange} />
              <Spacer pb={1} />
              <Actions actions={actions} />
            </LeftContainer>
            <Spacer pl={1} />
            <Calendar date={date} onDateChange={onChange} />
          </Card>
        </Modal>
      )}
    </Flex>
  );
};
