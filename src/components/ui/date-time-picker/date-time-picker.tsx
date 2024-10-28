"use client";

import { useForwardedRef } from "@/lib/useForwardedRef";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import React, { useRef, useState } from "react";
import {
  type DateValue,
  useButton,
  useDatePicker,
  useInteractOutside,
} from "react-aria";
import { type DatePickerStateOptions, useDatePickerState } from "react-stately";
import { Popover, PopoverContent, PopoverTrigger } from "../Popover";
import { Button } from "../buttonCalendar";
import { Calendar } from "./calendar";
import { DateField } from "./date-field";
import { TimeField } from "./time-field";

const DateTimePicker = React.forwardRef<
  HTMLDivElement,
  DatePickerStateOptions<DateValue>
>((props, forwardedRef) => {
  const ref = useForwardedRef(forwardedRef);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);

  const [open, setOpen] = useState(false);
  const state = useDatePickerState(props);
  const {
    groupProps,
    fieldProps,
    buttonProps: _buttonProps,
    dialogProps,
    calendarProps,
  } = useDatePicker(props, state, ref);
  const { buttonProps } = useButton(_buttonProps, buttonRef);

  useInteractOutside({
    ref: contentRef,
    onInteractOutside: () => setOpen(false),
  });

  return (
    <div
      {...groupProps}
      ref={ref}
      aria-label="Horário"
      className={cn(
        groupProps.className,
        "flex items-center divide-x-2 m-auto sm:w-72 sm:h-9 border-4 rounded-md text-custom-black border-custom-name focus-within:border-custom-name/70 mt-2"
      )}
    >
      <DateField id="date-field" {...fieldProps} />
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            {...buttonProps}
            variant="outline"
            aria-label="Selecionar data"
            className="border-none sm:ml-1"
            disabled={props.isDisabled}
            onClick={() => setOpen(true)}
          >
            <CalendarIcon className="w-4 h-4" />
          </Button>
        </PopoverTrigger>
        {state.hasTime && (
          <TimeField 
            id="time-field"
            aria-label="Selecionar hora"
            value={state.timeValue}
            onChange={state.setTimeValue}
            hourCycle={24}
          />
        )}
        <PopoverContent ref={contentRef} className="w-full">
          <div {...dialogProps} className="space-y-3">
            <Calendar {...calendarProps} />
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
});

DateTimePicker.displayName = "DateTimePicker";

export { DateTimePicker };
