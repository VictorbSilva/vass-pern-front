const gerarLinkWhatsapp = (produto) => {
  const telefone = '5583996465052';
  let mensagem = '';
  if (produto) {
    mensagem = `Olá! Estou interessado no produto "${produto.nome}". Poderia me fornecer mais informações?`;
  } else {
    mensagem =
      'Olá! Gostaria de saber sobre os produtos da Vassouras Pernambucanas.';
  }
  return `https://wa.me/${telefone}?text=${encodeURIComponent(mensagem)}`;
};

export default gerarLinkWhatsapp;
