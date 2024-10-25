"use client";

import { cn } from "@/lib/utils";
import { useRef } from "react";
import {
	type AriaTimeFieldProps,
	type TimeValue,
	useLocale,
	useTimeField,
} from "react-aria";
import { useTimeFieldState } from "react-stately";
import { DateSegment } from "./date-segment";

function TimeField(props: AriaTimeFieldProps<TimeValue>) {
	const ref = useRef<HTMLInputElement | null>(null);
	const { locale } = useLocale();
	const state = useTimeFieldState({
		...props,
		locale,
	});

	const { fieldProps } = useTimeField(props, state, ref);
	return (
		<div {...fieldProps} ref={ref} className="flex">
			{state.segments.map((segment, i) => (
				<DateSegment key={segment.type} segment={segment} state={state} />
			))}
			{state.isInvalid &&
				<span aria-hidden="true">🚫</span>}
		</div>
	);
}

export { TimeField };
