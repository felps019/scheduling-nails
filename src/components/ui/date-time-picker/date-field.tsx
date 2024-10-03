"use client";

import { DateSegment } from "./date-segment";
import { createCalendar } from "@internationalized/date";
import { useRef } from "react";
import {
  AriaDatePickerProps,
  DateValue,
  useDateField,
  useLocale,
} from "react-aria";
import { useDateFieldState } from "react-stately";
import { cn } from "@/lib/utils";

function DateField(props: AriaDatePickerProps<DateValue>) {
  const ref = useRef<HTMLDivElement | null>(null);

  const { locale } = useLocale();
  const state = useDateFieldState({
    ...props,
    locale: 'pt-BR',
    createCalendar,
  });
  const { fieldProps } = useDateField(props, state, ref);
  //state.segments contem os diferentes componentes da data
  //find é utilizado para localizar o segmento correto de cada data e o text pega o valor do segmento

  const formatBrazilianDate = () => {
    const year = state.segments.find(segment => segment.type === "year")?.text;
    const month = state.segments.find(segment => segment.type === "month")?.text;
    const day = state.segments.find(segment => segment.type === "day")?.text;

    return day && month && year ? `${day}/${month}/${year}` : "dd/mm/yyyy";
  }
  return (
    <div
      {...fieldProps}
      ref={ref}
      aria-label="Selecione a data"
      className={cn(
        "inline-flex w-36 h-7 items-center justify-center ml-6 rounded-md bg-transparent py-2 pl-1 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        props.isDisabled ? "cursor-not-allowed opacity-50" : ""
      )}
    >
      <span>{formatBrazilianDate()}</span>
      {state.validationState === "invalid" && (
        <span aria-hidden="true" aria-label="invalid">🚫</span>
      )}

    </div>
  );
}

export { DateField };