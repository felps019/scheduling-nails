"use client"
import  { type CalendarDate, isToday as _isToday, createCalendar, getLocalTimeZone, getWeeksInMonth } from "@internationalized/date";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import React, { useMemo } from "react";
import  { type CalendarProps, type DateValue, useButton, useCalendar, useCalendarCell, useCalendarGrid, useLocale } from "react-aria";
import  { type CalendarState, useCalendarState } from "react-stately";
import { cn } from "@/lib/utils";
import { Button } from "../buttonCalendar";

const getPortugueseMonthTitle = (date: CalendarDate) => {
	const monthNames = [
		"Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
		"Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
	];
	const monthIndex = date.month - 1;
	return monthNames[monthIndex];
};

const weekDaysInPortuguese = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

function Calendar(props: CalendarProps<DateValue>) {
	const prevButtonRef = React.useRef<HTMLButtonElement | null>(null);
	const nextButtonRef = React.useRef<HTMLButtonElement | null>(null);

	const { locale } = useLocale();
	const state = useCalendarState({
		...props,
		locale,
		createCalendar,
	});
	const { calendarProps, prevButtonProps: _prevButtonProps, nextButtonProps: _nextButtonProps } = useCalendar(props, state);
	const { buttonProps: prevButtonProps } = useButton(_prevButtonProps, prevButtonRef);
	const { buttonProps: nextButtonProps } = useButton(_nextButtonProps, nextButtonRef);

	return (
		<div {...calendarProps} className="space-y-4">
			<div className="relative flex items-center justify-center p-1">
				<Button
					{...prevButtonProps}
					ref={prevButtonRef}
					variant={"outline"}
					className={cn("absolute left-1 h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100")}
				>
					<ChevronLeftIcon className="w-4 h-4" />
				</Button>
				<div className="text-sm font-medium">{getPortugueseMonthTitle(state.visibleRange.start)}</div>
				<Button
					{...nextButtonProps}
					ref={nextButtonRef}
					variant={"outline"}
					className={cn("absolute right-1 h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100")}
				>
					<ChevronRightIcon className="w-4 h-4" />
				</Button>
			</div>
			<CalendarGrid state={state} />
		</div>
	);
}

interface CalendarGridProps {
	state: CalendarState;
}

function CalendarGrid({ state, ...props }: CalendarGridProps) {
	const { locale } = useLocale();
	const { gridProps, headerProps } = useCalendarGrid(props, state);

	const weeksInMonth = getWeeksInMonth(state.visibleRange.start, locale);

	return (
		<table {...gridProps} className={cn(gridProps.className, "w-full border-collapse space-y-1")}>
			<thead {...headerProps}>
				<tr className="flex">
					{weekDaysInPortuguese.map((day, index) => (
						<th className="w-9 rounded-md text-[0.8rem] font-normal text-black" key={day}>
							{day}
						</th>
					))}
				</tr>
			</thead>
			<tbody>
				{[...new Array(weeksInMonth).keys()].map((weekIndex) => (
					<tr className="flex w-full mt-2" key={weekIndex}>
						{state.getDatesInWeek(weekIndex).map((date, i) => (date ? <CalendarCell key={date.day} state={state} date={date} /> : <td key={i}/>))}
					</tr>
				))}
			</tbody>
		</table>
	);
}

interface CalendarCellProps {
	state: CalendarState;
	date: CalendarDate;
}

function CalendarCell({ state, date }: CalendarCellProps) {
	const ref = React.useRef<HTMLButtonElement | null>(null);
	const { cellProps, buttonProps, isSelected, isOutsideVisibleRange, isDisabled, formattedDate } = useCalendarCell({ date }, state, ref);

	const isToday = useMemo(() => {
		const timezone = getLocalTimeZone();
		return _isToday(date, timezone);
	}, [date]);

	return (
		<td
			{...cellProps}
			className={cn(
				cellProps.className,
				"relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md",
			)}
		>
			<Button
				{...buttonProps}
				type="button"
				variant={"ghost"}
				ref={ref}
				className={cn(
					buttonProps.className,
					"h-9 w-9",
					isToday ? "bg-custom-name/50 text-black-800" : "",
					isSelected
						? "bg-custom-bg text-black hover:bg-custom-name/50 hover:text-custom-title focus:bg-custom-name focus:text-custom-title"
						: "",
					isOutsideVisibleRange ? "text-custom-black opacity-50" : "",
					isDisabled ? "text-custom-black opacity-50" : "",
				)}
			>
				{formattedDate}
			</Button>
		</td>
	);
}

export { Calendar };