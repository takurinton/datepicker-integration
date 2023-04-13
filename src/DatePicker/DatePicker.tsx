import { Divider, Flex, Spacer, useTheme } from "ingred-ui";
import { FC, ReactNode, memo, useRef, useState } from "react";
import { Input } from "../Input/Input";
import { Calendar } from "../Calendar/Calendar";
import { Dayjs } from "dayjs";
import { Card, Action, LeftContainer } from "./styled";
import {
  FloatingFocusManager,
  flip,
  offset,
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
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const { context, refs, strategy, x, y } = useFloating({
    placement: "right-start",
    open,
    onOpenChange: setOpen,
    middleware: [offset(10), flip()],
  });
  const ref = useRef<HTMLDivElement>(null);
  const dismiss = useDismiss(context);
  const role = useRole(context);

  const { getReferenceProps, getFloatingProps } = useInteractions([
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
              <Actions actions={actions} />
            </LeftContainer>
            <Spacer pl={1} />
            <Divider orientation="vertical" color={theme.palette.divider} />
            <Spacer pl={1} />
            <Calendar date={date} onDateChange={onChange} />
          </Card>
        </FloatingFocusManager>
      )}
    </Flex>
  );
};
