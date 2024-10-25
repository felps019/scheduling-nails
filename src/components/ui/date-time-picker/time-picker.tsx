"use client"

import React from "react";
import type { TimeValue } from "react-aria";
import type { TimeFieldStateOptions } from "react-stately";
import { TimeField } from "./time-field";
import { ForwardedRef } from "react";

const TimePicker = React.forwardRef<
  HTMLDivElement,
  Omit<TimeFieldStateOptions<TimeValue>, "locale">
>((props, ForwardedRef) => {
  return <TimeField {...props} />;
});

TimePicker.displayName = "TimePicker";

export { TimePicker };