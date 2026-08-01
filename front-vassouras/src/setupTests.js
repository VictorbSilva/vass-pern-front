import { afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';

// O projeto nao usa `globals: true`, entao a limpeza automatica da Testing
// Library nao se registra sozinha (ela procura um `afterEach` global). Sem
// isto, o DOM de um teste sobra para o proximo.
afterEach(cleanup);
