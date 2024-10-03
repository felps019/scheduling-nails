// import React from 'react';
// import { z } from 'zod';
// import { Controller, useForm } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
// import PhoneInput from 'react-phone-number-input/input';

// const createdPhoneSchema = z.object({
//   phone: z.coerce.number()
//     .min(11, 'O número de telefone deve ter pelo menos 11 dígitos')
// })

// type CreatedPhoneSchema = z.infer<typeof createdPhoneSchema>;

// export function InputPhone() {
//   const {
//     control,
//     register,
//   } = useForm({
//     resolver: zodResolver(createdPhoneSchema),
//   });

//   return (
//     <>
//       <div className="relative m-auto sm:w-72 sm:h-9 border-4 rounded-md text-custom-black border-custom-name focus-within:border-custom-name/70 mt-2">
//         <img
//           src="../public/phone.png"
//           alt="Trabalho"
//           className="absolute left-2 w-4 h-4 mt-1.5"
//         />
//         {/* Controller garante a integraçao entre as libs e controla o valor e o onChange do input */}
//         {/* O rules são as regras de validacao passadas atraves do controler, por exemplo o minimo de caracteres do numero de telefone */}
//         <Controller
//           control={control}
//           {...register('phone', {
//             validate: (phone) => {
//               if (!phone) return true;
//               return phone.length <= 11 || 'O número de telefone deve ter pelo menos 11 dígitos'
//             },
//           })}
//           render={({ field }) => (
//             <PhoneInput
//               {...field}
//               country="BR"
//               label="Telefone"
//               id="phone"
//               type="text"
//               placeholder=" "
//               className={`block appearance-none focus:outline-none bg-transparent pl-10 ${errors?.phone ? 'input-error' : ''
//                 }`}
//             />
//           )}
//         />
//         {errors?.phone && (
//           <p className="text-red-500 mt-1.5">
//             {errors.phone.message}
//           </p>
//         )}
//         <label
//           htmlFor="phone"
//           className="absolute text-base font-medium text-custom-black top-0 -z-1 duration-300 origin-0 pl-9 mt-0.5"
//         >
//           Telefone
//         </label>
//       </div>
//     </>
//   );
// };

// import { isPossiblePhoneNumber } from 'libphonenumber-js';

// const [phone, setPhone] = React.useState('');

// const handlePhoneChange = (value) => {
//   setPhone(value);
//   if (value && isPossiblePhoneNumber(value)) {
//     console.log('Numero esta correto: ', value);
//   } else {
//     console.log('Numero de telefone invalido ou incompleto: ');
//   }
// };

// value={phone}
// onChange={handlePhoneChange}
