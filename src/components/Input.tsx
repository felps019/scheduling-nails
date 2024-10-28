import React from "react";
import type { UseFormRegister, FieldError } from "react-hook-form";
import type { CreatedFormSchema } from "../App";

interface InputProps {
	id: keyof CreatedFormSchema;
	label: string;
	placeholder: string;
	type: string;
	register: UseFormRegister<CreatedFormSchema>;
	error?: FieldError;
	icon: string;
}

const Input = ({
	id,
	label,
	placeholder,
	type,
	register,
	icon,
	error,
}: InputProps) => {
	return (
		<>
			<div className="relative m-auto sm:w-72 sm:h-9 border-4 rounded-md text-custom-black border-custom-name focus-within:border-custom-name/70">
				<img
					src={icon}
					alt={label}
					className="absolute left-2 w-4 h-4 mt-1.5"
				/>
				<input
					type={type}
					id={id}
					placeholder={placeholder}
					{...register(id)}
					className={`block appearance-none text-custom-black focus:outline-none bg-transparent pl-10 ${
						error && "input-error"
					}`}
				/>
				{error && <p className="text-red-500 mt-1.5">{error.message}</p>}
				<label
					htmlFor={label}
					className="absolute text-base font-medium text-custom-black top-0 -z-1 duration-300 origin-0 pl-9 mt-0.5"
				>
					{label}
				</label>
			</div>
		</>
	);
};

export default Input;
