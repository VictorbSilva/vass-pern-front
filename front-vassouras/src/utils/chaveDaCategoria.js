// O cliente digita o nome da categoria no Admin, sem passar por deploy, entao
// nao da para exigir que ele acerte acento, caixa e plural. A chave normaliza os
// tres, e e por isso que "Acessórios", "acessorios" e "Acessório" caem todas em
// `acessorio`.
export const chaveDaCategoria = (nome) =>
  (nome ?? '')
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/s$/, '');
