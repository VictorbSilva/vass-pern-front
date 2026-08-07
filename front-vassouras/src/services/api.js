const urlDoAmbiente = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000';

export const API_BASE_URL = urlDoAmbiente.replace(/\/$/, '');

export async function buscarJson(url, signal) {
    const response = await fetch(url, {signal});
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
}
