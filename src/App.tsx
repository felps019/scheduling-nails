import React from 'react';
import './index.css';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import GoogleCalendar from './components/GoogleCalendar';
import Header from './components/Header';
import Input from './components/Input';
import Select from './components/Select';
import DateTime from './components/DateTime';

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
  date: z.date({ message: 'A data é inválida' }),
});

export type CreatedFormSchema = z.infer<typeof createdFormSchema>;

export function App() {
  const [buttonSubmit, setButtonSubmit] = React.useState(false);
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

  const formSubmit = (data: CreatedFormSchema) => {
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
    setButtonSubmit(true);
  };

  return (
    <>
      <Header />
      <form onSubmit={handleSubmit(formSubmit)} className="flex flex-col gap-4 p-4 sm:w-full sm:max-w-4xl mx-auto">
        {/* Campo de nome */}
          <Input id='name' type='text' label='Nome' placeholder='' register={register} icon='../public/contact.png' error={errors.name} />

        {/* Campo de telefone */}
         <Input id='phone' type='tel' label='Telefone' placeholder='' register={register} icon='../public/phone.png' error={errors.phone}/>

        {/* Campo de Serviços */}
        <Select id='works' services={services} register={register} icon='../public/work.png' error={errors.works}/>

        <DateTime control={control} error={errors.date}/>

        {buttonSubmit ? (
          eventData && (
            <GoogleCalendar eventData={eventData} handleSubmit={handleSubmit} formSubmit={formSubmit} />
          )
        ) : (
          <button type='submit' className='font-playfairDisplaySC text-custom-title text-lg mx-auto w-40 h-10 mt-4 rounded-md bg-custom-name'>
            Enviar
          </button>
        )}
      </form>    </>
  );
};
export default App;