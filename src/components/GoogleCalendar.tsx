import { useState } from "react";

export const CLIENT_ID = import.meta.env.VITE_CLIENT_ID;
export const SCOPES = import.meta.env.VITE_SCOPES;

interface EventData {
	nome: string;
	telefone: string;
	servico: string;
	data: string;
	dataFim: string;
}

interface GoogleCalendarProps {
	eventData: EventData;
}

const GoogleCalendar = ({ eventData }: GoogleCalendarProps) => {
	const [accessToken, setAccessToken] = useState<string | null>(null);

	const handleAuthClick = () => {
		if (
			typeof google === "undefined" ||
			!google.accounts ||
			!google.accounts.oauth2
		) {
			console.error("Google Identity Services SDK não está carregado.");
			return;
		}

		const client = google.accounts.oauth2.initTokenClient({
			client_id: CLIENT_ID,
			scope: SCOPES,
			callback: (response) => {
				if (response.access_token) {
					setAccessToken(response.access_token);
					createEvent(response.access_token);
				} else {
					console.error("Falha ao obter o token de acesso", response);
				}
			},
		});

		client.requestAccessToken();
	};

	const createEvent = async (token: string) => {
		if (!eventData || !eventData.data) {
			console.error("Data inválida no campo 'data' em eventData");
			return;
		}

		const event = {
			summary: eventData.nome,
			description: `${eventData.servico}${eventData.telefone ? ` - ${eventData.telefone}` : ""}`,
			start: {
				dateTime: eventData.data,
				timeZone: "America/Sao_Paulo",
			},
			end: {
				dateTime: eventData.dataFim,
				timeZone: "America/Sao_Paulo",
			},
		};

		try {
			const response = await fetch(
				"https://www.googleapis.com/calendar/v3/calendars/primary/events",
				{
					method: "POST",
					headers: {
						Authorization: `Bearer ${token}`,
						"Content-Type": "application/json",
					},
					body: JSON.stringify(event),
				},
			);

			const result = await response.json();
			if (result.htmlLink) {
				alert(`Evento criado: ${result.htmlLink}`);
			} else {
				console.error("Erro ao criar evento, resposta inválida", result);
			}
		} catch (error) {
			console.error("Erro ao criar evento no Google Calendar", error);
		}
	};

	return (
		<div className="flex justify-center items-center">
			<button
				type="button"
				onClick={handleAuthClick}
				className="font-playfairDisplaySC text-custom-title mx-auto w-56 h-11 mt-4 rounded-md bg-custom-name"
			>
				Autenticar com Google
			</button>
		</div>
	);
};

export default GoogleCalendar;
