import React from "react";
import type { UseFormRegister, FieldError } from "react-hook-form";
import type { CreatedFormSchema } from "../App";

interface SelectProps {
	id: keyof CreatedFormSchema;
	register: UseFormRegister<CreatedFormSchema>;
	services: { value: string; label: string }[];
	icon: string;
	error?: FieldError;
}

const Select = ({ id, register, services, icon, error }: SelectProps) => {
	return (
		<div className="relative m-auto sm:w-72 sm:h-9 border-4 rounded-md text-custom-black border-custom-name focus-within:border-custom-name/70 mt-4">
			<img
				src={icon}
				alt="Trabalho"
				className="absolute left-2 w-4 h-4 mt-1.5"
			/>
			<select
				id={id}
				{...register("works")}
				className={`block appearance-auto font-medium focus:outline-none bg-transparent pl-8 mt-1 ${
					error && "input-error"
				}`}
			>
				<option value="0">Selecione o serviço</option>
				{services.map((service) => (
					<option value={service.value} key={service.value}>
						{service.label}
					</option>
				))}
			</select>
			{error && (
				<p className="text-red-500 mt-2">É obrigatório escolher um serviço</p>
			)}
		</div>
	);
};

export default Select;