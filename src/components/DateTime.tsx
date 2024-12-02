import { Controller, type Control, type FieldError } from "react-hook-form";
import type { CreatedFormSchema } from "../App";
import { DateTimePicker } from "./ui/date-time-picker/date-time-picker";
import { today } from "@internationalized/date";

interface DateTimeFieldProps {
	control: Control<CreatedFormSchema>;
	error?: FieldError;
}

const DateTime = ({ control, error }: DateTimeFieldProps) => {
	return (
		<>
			<main className="mt-2">
				{/* O controller é utilizado para registrar as entradas de uma lib externa e a integração entre as libs */}
				<Controller
					name="date"
					control={control}
					rules={{ required: "É obrigatório escolher uma data e hora" }}
					render={({ field: { onChange, onBlur } }) => (
						<DateTimePicker
							granularity={"minute"}
							control={control}
							onChange={(date) => {
								onChange(date.toDate("America/Sao_Paulo"));
							}}
							onBlur={onBlur}
							minValue={today("America/Sao_Paulo")}
						/>
					)}
				/>
				{error && <p className="text-red-500 w-20 m-auto">{error.message}</p>}
			</main>
		</>
	);
};

export default DateTime;
