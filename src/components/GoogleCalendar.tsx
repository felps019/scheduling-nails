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
    dataFim: string
}

interface GoogleCalendarProps {
  eventData: EventData;
}

interface TokenClient {
  requestAccessToken: () => void;
}

const GoogleCalendar = ({ eventData }: GoogleCalendarProps) => {
  const [gapiLoaded, setGapiLoaded] = useState(false);
  const [tokenClient, setTokenClient] = useState<TokenClient | null>(null);
  
  useEffect(() => {
    const initClient = () => {
      gapi.client.init({
        apiKey: API_KEY,
        discoveryDocs: [DISCOVERY_DOC],
      }).then(() => {
        setGapiLoaded(true);
      }).catch((error: Error) => {
        console.error("Error loading google api client", error);
      });
    };
    
    gapi.load('client', initClient);
    
    const client = google.accounts.oauth2.initTokenClient({
      client_id: CLIENT_ID,
      scope: SCOPES,
      callback: (response: gapi.auth2.AuthResponse) => {
        if (response.access_token) {
          createEvent(response.access_token);
        }
      }
    });
    setTokenClient(client);
  }, []);

  const createEvent = async (accessToken: string) => {
    if (!eventData || !eventData.data) {
      console.error("Data inválida no campo 'data' em eventData");
      return;
    }


    const event = {
      summary: eventData.nome,
      description: `${eventData.servico}${eventData.telefone ? ` - ${eventData.telefone}` : ''}`,
      start: {
        dateTime: eventData.data,
        timeZone: 'America/Sao_Paulo',
      },
      end: {
        dateTime: eventData.dataFim,
        timeZone: 'America/Sao_Paulo',
      },
    };

    try {
      const request = gapi.client.calendar.events.insert({
        calendarId: 'primary',
        resource: event,
      });
      request.execute((event) => {
        if (event?.htmlLink) {
          alert(`Evento criado: ${event.htmlLink}`);
        } else {
          console.error("Erro ao criar evento, resposta inválida", event);
        }
      });
    } catch (error) {
      console.error("Erro ao criar evento no Google Calendar", error);
    }
  };

  const handleAuthClick = () => {
    if (tokenClient) {
      tokenClient.requestAccessToken();
    }
  }

  return (
    <div className='flex justify-center items-center'>
      {gapiLoaded ? (
        <button type='button' onClick={handleAuthClick} className='font-playfairDisplaySC text-custom-title mx-auto w-56 h-11 mt-4 rounded-md bg-custom-name'>
          Autenticar com Google
        </button>
      ) : (
        <p>Carregando...</p>
      )}
    </div>
  );
};

export default GoogleCalendar;
