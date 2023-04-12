import { Flex, Modal, Spacer } from "ingred-ui";
import { FC, ReactNode, memo, useRef, useState } from "react";
import { Input, InputInCalendar } from "../Input/Input";
import { Calendar } from "../Calendar/Calendar";
import { Dayjs } from "dayjs";
import { Card, Action, LeftContainer } from "./styled";
import { NativeInput } from "../Input/Native";
import {
  FloatingFocusManager,
  flip,
  offset,
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
  useRole,
} from "@floating-ui/react";

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
 * @todo forwardRef
 */
export const DatePicker: FC<Props> = ({ date, actions, onChange }) => {
  const [open, setOpen] = useState(false);
  const { context, refs, strategy, x, y } = useFloating({
    placement: "right-start",
    open,
    onOpenChange: setOpen,
    middleware: [offset(10), flip()],
  });
  const ref = useRef<HTMLDivElement>(null);
  const click = useClick(context);
  const dismiss = useDismiss(context);
  const role = useRole(context);

  const { getReferenceProps, getFloatingProps } = useInteractions([
    click,
    dismiss,
    role,
  ]);

  const handleClickCalendarIcon = () => {
    setOpen((prev) => !prev);
  };

  return (
    <Flex ref={ref}>
      <div
        ref={refs.setReference}
        {...getReferenceProps()}
        style={{ width: "fit-content" }}
      >
        <Input
          date={date}
          onChange={onChange}
          onClick={handleClickCalendarIcon}
        />
      </div>
      {open && (
        <FloatingFocusManager context={context} modal={false}>
          <Card
            ref={refs.setFloating}
            display="flex"
            style={{ position: strategy, top: y ?? 0, left: x ?? 0 }}
            {...getFloatingProps()}
          >
            <LeftContainer>
              {/* <InputInCalendar date={date} onChange={onChange} /> */}
              <NativeInput date={date} onChange={onChange} />
              <Spacer pb={1} />
              <Actions actions={actions} />
            </LeftContainer>
            <Spacer pl={1} />
            <Calendar date={date} onDateChange={onChange} />
          </Card>
        </FloatingFocusManager>
      )}
    </Flex>
  );
};
