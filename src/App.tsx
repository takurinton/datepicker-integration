import { createTheme, Spacer, Tabs, ThemeProvider } from "ingred-ui";
import dayjs, { Dayjs } from "dayjs";
import { useMemo, useState } from "react";
import { DatePicker } from "./DatePicker";
import { DateRangePicker } from "./DateRangePicker";

const DatePickerSample = () => {
  const [date, setDate] = useState<Dayjs>(dayjs());
  const actions = useMemo(
    () => [
      {
        text: "今日",
        onClick: () => {
          setDate(dayjs());
        },
      },
      {
        text: "来週",
        onClick: () => {
          setDate(dayjs().add(1, "week"));
        },
      },
    ],
    []
  );

  return <DatePicker date={date} onChange={setDate} actions={actions} />;
};

const DateRangePickerSample = () => {
  const [date, setDate] = useState<{
    startDate: Dayjs;
    endDate: Dayjs;
  }>({ startDate: dayjs(), endDate: dayjs().add(1, "week") });
  const actions = useMemo(
    () => [
      {
        text: "今日",
        onClick: () => {
          setDate({
            startDate: dayjs(),
            endDate: dayjs(),
          });
        },
      },
      {
        text: "来週",
        onClick: () => {
          setDate({
            startDate: dayjs(),
            endDate: dayjs().add(1, "week"),
          });
        },
      },
      {
        text: "先月",
        onClick: () => {
          setDate({
            startDate: dayjs().subtract(1, "month"),
            endDate: dayjs(),
          });
        },
      },
    ],
    []
  );

  return <DateRangePicker date={date} onChange={setDate} actions={actions} />;
};

function App() {
  const theme = createTheme();
  const [view, setView] = useState<"date" | "dateRange">("date");
  const options = {
    data: [
      {
        text: "DatePicker",
        value: "date",
      },
      {
        text: "DateRangePicker",
        value: "dateRange",
      },
    ],
  };

  return (
    <ThemeProvider theme={theme}>
      <Tabs
        {...options}
        value={view}
        onChange={(value) => setView(value as "date" | "dateRange")}
      />
      <Spacer pt={1} />
      {view === "date" ? <DatePickerSample /> : <DateRangePickerSample />}
    </ThemeProvider>
  );
}

export default App;
