"use client"

import { DateSegment } from "./date-segment";
import { useRef } from "react";
import { AriaTimeFieldProps, TimeValue, useLocale, useTimeField } from "react-aria";
import { useTimeFieldState } from "react-stately";
import { cn } from "@/lib/utils";

function TimeField(props: AriaTimeFieldProps<TimeValue>) {
	const ref = useRef<HTMLInputElement | null>(null);
	const { locale } = useLocale();
	const state = useTimeFieldState({
		...props,
		locale,
	});
	const {
		fieldProps: { ...fieldProps },
	} = useTimeField(props, state, ref);

	return (
		<input type="time" id="timetable" name="timetable" required aria-label="Selecionar hora" {...fieldProps} ref={ref} className={cn("sm:w-32 sm:h-9 rounded-md border-custom-name bg-transparent px-4 py-1 text-sm focus-within:border-custom-name/70 focus-within:ring-0 focus-visible:outline-none focus-visible:ring-custom-name")}
			{...state.validationState === "invalid" && (
				<span aria-hidden="true" aria-label="invalid">🚫</span>
			)}
			{...state.segments.map((segment, i) => (
				<DateSegment key={i} segment={segment} state={state} />
			))}
		/>
	);
}

export { TimeField };
