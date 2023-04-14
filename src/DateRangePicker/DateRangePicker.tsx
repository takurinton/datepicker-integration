import { Divider, Flex, Spacer, useTheme } from "ingred-ui";
import { FC, ReactNode, memo, useCallback, useRef, useState } from "react";
import { InputRange } from "../Input/Input";
import { Card, Action, LeftContainer } from "./styled";
import { CalendarRange } from "../Calendar/CalendarRange";
import { DateRange } from "../Calendar/CalendarRange/types";
import {
  FloatingFocusManager,
  flip,
  offset,
  useDismiss,
  useFloating,
  useInteractions,
  useRole,
} from "@floating-ui/react";
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
 * @todo forwardRef
 */
export const DateRangePicker: FC<Props> = ({ date, actions, onChange }) => {
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
        <InputRange
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
            <CalendarRange date={date} onDateChange={handleDateChange} />
          </Card>
        </FloatingFocusManager>
      )}
    </Flex>
  );
};
