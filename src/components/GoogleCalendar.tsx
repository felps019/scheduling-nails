import { useState, useEffect } from 'react';
import { gapi } from 'gapi-script';

const CLIENT_ID = '92829381767-03900eohrndmc1dimc3sca6aq627mebf.apps.googleusercontent.com';
const API_KEY = 'AIzaSyANS__6Y5cNs-uBbe2XMZgNBLo958qcdZI';
const DISCOVERY_DOC = 'https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest';
const SCOPES = 'https://www.googleapis.com/auth/calendar.events';

interface EventData {
    nome: string;
    telefone: string;
    servico: string;
    data: string;
}

interface GoogleCalendarProps {
  eventData: EventData;
}

interface GoogleCalendarEvent {
  htmlLink: string;
  summary: string;
  description: string;
  start: {
    dateTime: string;
  };
  end: {
    dateTime: string;
  }
}

console.log('gapi', gapi);
const GoogleCalendar = ({ eventData } : GoogleCalendarProps)  => {
  const [gapiLoaded, setGapiLoaded] = useState(false);
  const [tokenClient, setTokenClient] = useState<gapi.auth2.TokenClient | null>(null);

  // Inicializa o cliente da API Google Calendar
  useEffect(() => {
    const initClient = () => {
      gapi.client.init({
        apiKey: API_KEY,
        discoveryDocs: [DISCOVERY_DOC],
      }).then(() => {
        console.log("Google API client");
        setGapiLoaded(true);
        console.log("gapiLoaded agora é: ", gapiLoaded);
      }).catch((error: Error) => {
        console.error("Error loading google api client", error);
      });
    };
    console.log("gapi load chamado");
  const client = google.accounts.oauth2.initTokenClient({
    client_id: CLIENT_ID,
    scope: SCOPES,
    callback: (response: gapi.auth2.AuthResponse) => {
      if(response.access_token){
        console.log("Authentication successful, token acquired:", response.access_token);
        createEvent(response.access_token);
      }
    }
  });
    setTokenClient(client);
},[gapiLoaded]);

  // Função para criar evento no Google Calendar
  const createEvent = async (accessToken: string) => {
      const event = {
        summary: eventData.nome,
        description: `${eventData.servico}${eventData.telefone ? ` - ${eventData.telefone}` : ''}`,
        start: {
          dateTime: eventData.data,
          timeZone: 'America/Sao_Paulo',
        },
        end: {
          dateTime: new Date(new Date(eventData.data).getTime() + 60 * 60 * 1000).toISOString(),
          timeZone: 'America/Sao_Paulo',
        },
      };
      try {
        const request = gapi.client.calendar.events.insert({
          calendarId: 'primary',
          resource: event,
        });
        request.execute((event: GoogleCalendarEvent) => {
          alert(`Evento criado: ${event.htmlLink}`);
        });
      } catch (error) {
        console.error('Erro ao criar evento no Google Calendar', error);
      }
  };

  const handleAuthClick = () => {
    if(tokenClient) {
      tokenClient.requestAccessToken();
    }
  }

  console.log('gapiLoaded', gapiLoaded);

  return (
    <div className='flex justify-center items-center'>
      {gapiLoaded ? (
        <button type='button' className='bg-black w-100 h-40 text-white' onClick={handleAuthClick}>Criar Evento no Google Calendar</button>
      ) : (
        <p>Carregando Google Calendar...</p>
      )}
    </div>
  );
};

export default GoogleCalendar;