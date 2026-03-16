const gerarLinkWhatsapp = (produto) => {
  const telefone = '5583996465052';
  const mensagem = `Olá! Estou interessado no produto "${produto.nome}". Poderia me fornecer mais informações?`;
  return `https://wa.me/${telefone}?text=${encodeURIComponent(mensagem)}`;
};

export default gerarLinkWhatsapp;
