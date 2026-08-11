import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { iniciarGtag, registrarConversaoWhatsapp } from './ads';

const scriptsDoGtag = () =>
  document.head.querySelectorAll('script[src*="googletagmanager"]');

describe('ads', () => {
  beforeEach(() => {
    document.head.innerHTML = '';
    delete window.gtag;
    delete window.dataLayer;
  });

  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it('nao deve injetar o script sem VITE_GADS_ID', () => {
    vi.stubEnv('VITE_GADS_ID', '');

    iniciarGtag();

    expect(scriptsDoGtag()).toHaveLength(0);
    expect(window.gtag).toBeUndefined();
  });

  it('deve injetar o script quando ha id', () => {
    vi.stubEnv('VITE_GADS_ID', 'AW-123');

    iniciarGtag();

    const scripts = scriptsDoGtag();
    expect(scripts).toHaveLength(1);
    expect(scripts[0].src).toContain('AW-123');
  });

  it('deve enfileirar js e config no dataLayer', () => {
    vi.stubEnv('VITE_GADS_ID', 'AW-123');

    iniciarGtag();

    expect(window.dataLayer).toHaveLength(2);
    expect(Array.from(window.dataLayer[1])).toEqual(['config', 'AW-123']);
  });

  it('nao deve disparar conversao sem id', () => {
    vi.stubEnv('VITE_GADS_ID', '');
    vi.stubEnv('VITE_GADS_CONVERSION_LABEL', 'abc123');
    window.gtag = vi.fn();

    registrarConversaoWhatsapp();

    expect(window.gtag).not.toHaveBeenCalled();
  });

  it('nao deve disparar conversao sem label', () => {
    vi.stubEnv('VITE_GADS_ID', 'AW-123');
    vi.stubEnv('VITE_GADS_CONVERSION_LABEL', '');
    window.gtag = vi.fn();

    registrarConversaoWhatsapp();

    expect(window.gtag).not.toHaveBeenCalled();
  });

  it('deve disparar conversao com send_to correto', () => {
    vi.stubEnv('VITE_GADS_ID', 'AW-123');
    vi.stubEnv('VITE_GADS_CONVERSION_LABEL', 'abc123');
    window.gtag = vi.fn();

    registrarConversaoWhatsapp();

    expect(window.gtag).toHaveBeenCalledWith('event', 'conversion', {
      send_to: 'AW-123/abc123',
    });
  });
});
