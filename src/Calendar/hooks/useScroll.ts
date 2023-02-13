import { Dayjs } from "dayjs";
import { useEffect, useState } from "react";
import { MARGIN } from "../constants";

/**
 * This function internally creates a clone of the Dayjs object.
 * This means that the user of this function will not be aware
 * of the object's referent.
 */
const getNextMonthList = (date: Dayjs) =>
  Array.from(new Array(13)).map((_, i) => date.clone().add(i, "month"));

const getPrevMonthList = (date: Dayjs) =>
  Array.from(new Array(13)).map((_, i) =>
    date.clone().subtract(13 - i, "month")
  );

export const useScroll = (d: Dayjs, ref: React.RefObject<HTMLDivElement>) => {
  const [loaded, setLoaded] = useState<{
    prev: Dayjs;
    next: Dayjs;
  }>({
    prev: d.subtract(13, "month"),
    next: d.add(13, "month"),
  });
  const [monthList, setMonthList] = useState<Dayjs[]>([
    ...getPrevMonthList(d),
    ...getNextMonthList(d),
  ]);

  // for initial and change input value
  useEffect(() => {
    const targets = document.getElementsByClassName(d.format("YYYY-MM"));
    if (targets.length === 0) {
      setLoaded({
        prev: d.subtract(13, "month"),
        next: d.add(13, "month"),
      });
      setMonthList([...getPrevMonthList(d), ...getNextMonthList(d)]);
    }
    for (const target of targets) {
      target.scrollIntoView({ block: "center" });
    }
  }, [d]);

  // for next scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const next = loaded.next.add(13, "month");
            const prev = loaded.prev.add(13, "month");

            const prevYearMonthList = getPrevMonthList(loaded.next);
            const nextYearMonthList = getNextMonthList(loaded.next);

            setLoaded({ next, prev });
            setMonthList([...prevYearMonthList, ...nextYearMonthList]);
          }
        });
      },
      {
        root: ref.current,
        rootMargin: `${MARGIN}px`,
        threshold: 0.1,
      }
    );

    const targets = document.getElementsByClassName(
      loaded.next.subtract(1, "month").format("YYYY-MM")
    );

    for (const target of targets) {
      observer.observe(target);
    }

    return () => {
      for (const target of targets) {
        observer.unobserve(target);
      }
    };
  }, [loaded.next]);

  // for before scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const next = loaded.next.subtract(13, "month");
            const prev = loaded.prev.subtract(13, "month");

            const prevYearMonthList = getPrevMonthList(loaded.prev);
            const nextYearMonthList = getNextMonthList(loaded.prev);

            setLoaded({ next, prev });
            setMonthList([...prevYearMonthList, ...nextYearMonthList]);
          }
        });
      },
      {
        root: ref.current,
        rootMargin: `${MARGIN}px`,
        threshold: 0.1,
      }
    );

    const targets = document.getElementsByClassName(
      loaded.prev.add(1, "month").format("YYYY-MM")
    );

    for (const target of targets) {
      observer.observe(target);
    }

    return () => {
      for (const target of targets) {
        observer.unobserve(target);
      }
    };
  }, [loaded.prev]);

  return { monthList };
};
