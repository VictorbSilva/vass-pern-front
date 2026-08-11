const urlDoAmbiente = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000';

export const API_BASE_URL = urlDoAmbiente.replace(/\/$/, '');

export async function buscarJson(url, signal) {
    const response = await fetch(url, {signal});
    if (!response.ok) {
        // O status vai no erro porque quem chama precisa separar 404 de falha de rede.
        const erro = new Error(`HTTP error! status: ${response.status}`);
        erro.status = response.status;
        throw erro;
    }
    return response.json();
}
