import React from 'react';
import './index.css';
import { date, z } from 'zod';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { DateTimePicker } from './components/ui/date-time-picker/date-time-picker';
import { today } from "@internationalized/date";
import GoogleCalendar from './components/GoogleCalendar';

const services = [
  { value: 'Alongamento em Fibra', label: 'Alongamento em Fibra' },
  { value: 'Manutenção (fibra)', label: 'Manutenção (fibra)' },
  { value: 'Banho de gel', label: 'Banho de gel' },
  { value: 'Esmaltação em gel', label: 'Esmaltação em gel' },
  { value: 'Manutenção (gel)', label: 'Manutenção (gel)' },
  { value: 'Mão', label: 'Mão' },
  { value: 'Reposição de unha', label: 'Reposição de unha' },
  { value: 'Plástica dos pés', label: 'Plástica dos pés' },
];

const createdFormSchema = z.object({
  name: z.string().min(1, 'O nome é obrigatório').regex(/^[A-Za-z\s]+$/i, "O nome não pode conter números ou caracteres especiais").transform(name => {
    return name.trim().split(' ').map(word => {
      return word[0].toLocaleUpperCase().concat(word.substring(1));
    }).join(' ')
  }),
  phone: z.string()
    .min(11, 'O número deve ter pelo menos 11 dígitos')
    .regex(/^\(\d{2}\) \d{4,5}-\d{4}$/, 'O número é inválido'),
  //O superRefine retorna os dados de todos os campos
  //O refine é uma forma de validar algo em especifico atraves de uma logica que nao exista no zod
  //O refine espera ser um valor que retorne true ou false
  works: z.string().min(1, 'Selecione pelo menos um serviço').refine(value => value !== '0', {
    message: 'Selecione um serviço válido',
  }),
  date: z.date({ message: 'A data é inválida' }).min(new Date(), 'A data e hora devem ser no futuro'),
});

type CreatedFormSchema = z.infer<typeof createdFormSchema>;

export function App() {
  const [output, setOutput] = React.useState('');
  const [eventData, setEventData] = React.useState<{
    summary: string;
    description: string;
    start: {
      dateTime: string;
    };
    end: {
      dateTime: string;
    };
  } | null>(null);  
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<CreatedFormSchema>({
    resolver: zodResolver(createdFormSchema),
  });

  console.log(errors);

  const formSubmit = (data: CreatedFormSchema) => {
    setOutput(JSON.stringify(data, null, 2));

    const eventCalendar = {
      summary: data.name,
      description: `Serviço agendado: ${data.works} - Telefone de contato: ${data.phone}`,
      start: {
        dateTime: data.date.toISOString(),
      },
      end: {
        dateTime: new Date(data.date.getTime() + 60 * 60 * 1000).toISOString(), //Duracao de 1h
      }
    };
    //Nesse setEventData ele vai atualizar os dados do evento conforme preenchido
    setEventData(eventCalendar);
  };

  return (
    <>
      <header className="flex items-start justify-start sm:m-6 sm:w-54 sm:h-10 drop-shadow-lg">
        <h1 className="font-poppins text-custom-name sm:text-3xl tracking-wider drop-shadow-lg">
          Amandita Nails
        </h1>
      </header>
      <main className="flex justify-center items-center sm:w-54 sm:h-8 sm:m-4">
        <h2 className="font-playfairDisplaySC sm:text-lg text-custom-name tracking-wider font-black flex justify-center items-center sm:w-54 sm:h-8 sm:m-4">
          AGENDA DE CLIENTES
        </h2>
      </main>

      <form onSubmit={handleSubmit(formSubmit)} className="flex flex-col gap-4 p-4 sm:w-full sm:max-w-4xl mx-auto">
        <div className="relative m-auto sm:w-72 sm:h-9 border-4 rounded-md text-custom-black border-custom-name focus-within:border-custom-name/70">
          <img
            src="../public/contact.png"
            alt="Trabalho"
            className="absolute left-2 w-4 h-4 mt-1.5"
          />
          {/* Campo de nome */}
          <input
            type="text"
            id="name"
            placeholder=" "
            {...register('name', { required: true })}
            className={`block appearance-none text-custom-black focus:outline-none bg-transparent pl-10 ${errors.name && 'input-error'
              }`}
          />
          {errors.name && (
            <p className="text-red-500 mt-1.5">{errors.name.message}</p>
          )}
          <label
            htmlFor="nome"
            className="absolute text-base font-medium text-custom-black top-0 -z-1 duration-300 origin-0 pl-9 mt-0.5"
          >
            Nome
          </label>
        </div>

        {/* Campo de telefone */}
        <div className="relative m-auto sm:w-72 sm:h-9 border-4 rounded-md text-custom-black border-custom-name focus-within:border-custom-name/70 mt-4">
          <img
            src="../public/phone.png"
            alt="Trabalho"
            className="absolute left-2 w-4 h-4 mt-1.5"
          />
          <input type="tel" id='phone' placeholder=" " {...register("phone")} className={'block appearance-none focus:outline-none bg-transparent pl-10'} />
          <label
            htmlFor="phone"
            className="absolute text-base font-medium text-custom-black top-0 -z-1 duration-300 origin-0 pl-9 mt-0.5">
            Telefone
          </label>
          {errors.phone && (
            <p className="text-red-500 mt-2">{errors.phone.message}</p>
          )}
        </div>

        <div className="relative m-auto sm:w-72 sm:h-9 border-4 rounded-md text-custom-black border-custom-name focus-within:border-custom-name/70 mt-4">
          <img
            src="../public/briefcase-business.png"
            alt="Trabalho"
            className="absolute left-2 w-4 h-4 mt-1.5"
          />
          <select
            {...register('works')}
            className={`block appearance-auto font-medium focus:outline-none bg-transparent pl-8 mt-1 ${errors.works && 'input-error'
              }`}
          >
            <option value="0">Selecione o serviço</option>
            {services.map((service) => (
              <option value={service.value} key={service.value}>
                {service.label}
              </option>
            ))}
          </select>
          {errors.works && (
            <p className="text-red-500 mt-2">
              É obrigatório escolher um serviço
            </p>
          )}
        </div>

        <main className='mt-2'>
          {/* O controller é utilizado para registrar as entradas de uma lib externa e a integração entre as libs */}
          <Controller
            name="date"
            control={control}
            rules={{ required: 'É obrigatório escolher uma data e hora' }}
            render={({ field: { onChange, onBlur } }) => (
              <DateTimePicker
                granularity={"minute"}
                //O instaceof é um operador para verificar se um objeto pertece a uma instancia de tal classe ou construtor
                //Se for true retorna o objeto, caso contrário retorna null
                onChange={(date) => date instanceof Date ? onChange(date) : onChange(new Date())}
                onBlur={onBlur}
                minValue={today('America/Sao_Paulo')}
              />
            )}
          />
          {errors.date && (
            <p className="text-red-500 w-20 m-auto">{errors.date.message}</p>
          )}
        </main>


        <div className="flex justify-center items-center">
          <button
            type='submit'
            onClick={() => handleSubmit(formSubmit)()}
            className="font-playfairDisplaySC text-custom-title mx-auto w-32 h-7 mt-4 rounded-md bg-custom-name"
          >
            Enviar
          </button>
        </div>
      </form>
      <pre>{output}</pre>

      {eventData && <GoogleCalendar eventData={{
        nome: eventData.summary,
        telefone: eventData.description.includes('Telefone de contato: ') ? eventData.description.split('Telefone de contato: ')[1] : '',
        servico: eventData.description.split(': ')[1].split(' - ')[0],
        data: eventData.start.dateTime,
      }} />}
    </>
  );
};
export default App;