import { Dayjs } from "dayjs";
import { useEffect, useState } from "react";
import { MARGIN } from "../constants";

/**
 * This function internally creates a clone of the Dayjs object.
 * This means that the user of this function will not be aware
 * of the object's referent.
 */
const getNextYearMonthList = (date: Dayjs) =>
  Array.from(new Array(24)).map((_, i) => date.clone().add(i, "month"));

const getPrevYearMonthList = (date: Dayjs) =>
  Array.from(new Array(24)).map((_, i) =>
    date.clone().subtract(24 - i, "month")
  );

export const useScroll = (d: Dayjs, ref: React.RefObject<HTMLDivElement>) => {
  const [loaded, setLoaded] = useState<{
    prev: Dayjs;
    next: Dayjs;
  }>({
    prev: d.subtract(24, "month"),
    next: d.add(2, "year"),
  });
  const [monthList, setMonthList] = useState<Dayjs[]>([
    ...getPrevYearMonthList(d),
    ...getNextYearMonthList(d),
  ]);

  // for initial and change input value
  useEffect(() => {
    const targets = document.getElementsByClassName(d.format("YYYY-MM"));
    for (const target of targets) {
      target.scrollIntoView({ block: "center" });
    }
  }, [d]);

  useEffect(() => {
    setLoaded({
      prev: d.subtract(2, "year"),
      next: d.add(2, "year"),
    });
    setMonthList([...getPrevYearMonthList(d), ...getNextYearMonthList(d)]);
  }, [d]);

  // for next scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const next = loaded.next.add(2, "year");
            const prev = loaded.prev.add(2, "year");

            const prevYearMonthList = getPrevYearMonthList(loaded.next);
            const nextYearMonthList = getNextYearMonthList(loaded.next);

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
            const next = loaded.next.subtract(2, "year");
            const prev = loaded.prev.subtract(2, "year");

            const prevYearMonthList = getPrevYearMonthList(loaded.prev);
            const nextYearMonthList = getNextYearMonthList(loaded.prev);

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
