export function iniciarGtag() {
  const adsId = import.meta.env.VITE_GADS_ID;
  if (!adsId) return;

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${adsId}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  // Precisa ser a funcao de fila (e `function`, nao arrow, por causa do
  // `arguments`): sem ela, evento disparado antes de o script carregar some.
  window.gtag = function () {
    window.dataLayer.push(arguments);
  };
  window.gtag('js', new Date());
  window.gtag('config', adsId);
}

export function registrarConversaoWhatsapp() {
  const adsId = import.meta.env.VITE_GADS_ID;
  const label = import.meta.env.VITE_GADS_CONVERSION_LABEL;
  if (!adsId || !label) return;

  window.gtag('event', 'conversion', { send_to: `${adsId}/${label}` });
}
