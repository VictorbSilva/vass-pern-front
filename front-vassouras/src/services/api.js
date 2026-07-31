// Endereço base da API (backend Django no Railway).
//
// Contrato do VITE_API_URL: apenas a ORIGEM, sem barra no final e sem /api.
//   certo:  https://vass-pern-back-production.up.railway.app
//   errado: https://vass-pern-back-production.up.railway.app/api
//
// Quem chama a API é que monta o resto do caminho, sempre começando com /api/.
// Ex.: fetch(`${API_BASE_URL}/api/produtos/`)
//
// Em produção o valor vem da variável de ambiente configurada na Vercel.
// Em desenvolvimento, cai no fallback do Django local.
const urlDoAmbiente = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000';

// Remove a barra do final caso alguém configure a variável com ela,
// evitando gerar URLs com barra dupla (ex.: ".../api//produtos/").
export const API_BASE_URL = urlDoAmbiente.replace(/\/$/, '');
