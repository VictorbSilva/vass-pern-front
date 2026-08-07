export function embaralhar(lista) {
    const copia = [...lista];
    const aleatorios = new Uint32Array(copia.length);
    crypto.getRandomValues(aleatorios);

    for (let i = copia.length - 1; i > 0; i--) {
        const j = aleatorios[i] % (i + 1);
        [copia[i], copia[j]] = [copia[j], copia[i]];
    }

    return copia;
}
