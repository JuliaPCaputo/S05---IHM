// objeto do usuário
const usuario = { nome: "Júlia", matricula: "687", pendencia: false, acessibilidade: true };

// lista objetos de armários
const armarios = [
  { id: 1, formato: "padrao", status: true, acessivel: false },
  { id: 2, formato: "padrao", status: true, acessivel: false },
  { id: 3, formato: "padrao", status: true, acessivel: false },
  { id: 4, formato: "padrao", status: false, acessivel: true },
  { id: 5, formato: "padrao", status: false, acessivel: true },
  { id: 6, formato: "duplo", status: true, acessivel: true },
  { id: 7, formato: "duplo", status: false, acessivel: true },
  { id: 8, formato: "duplo", status: false, acessivel: true },  
];

// função para reserva do armário, incluindo as regras.
function reservarArmario() {
  
  // obter tipo de armário selecionado pelo usuário no html.
  const tipoSelecionado = document.getElementById("tipoArmario").value;
  
  // na lista, filtrar apenas os armários que estão disponíveis e que são acessiveis ao usuário.
  const armariosDisponiveis = armarios.filter(armario => armario.formato === tipoSelecionado && armario.status && usuario.acessibilidade === armario.acessivel);
  
  // caso não exista armário disponível, retorna para o usuário mensagem.
  if (armariosDisponiveis.length === 0) {
    document.getElementById("resultado").innerText = `Olá, ${usuario.nome}! Nenhum armário disponível para o tipo selecionado.`;
    return;
  }
  
  // Caso exista armário(s) disponíveil, seguimos sorteando uma opção. 
  const armarioSorteado = armariosDisponiveis[Math.floor(Math.random() * armariosDisponiveis.length)];
  
  // Depois localizamos o armário emprestado na lista de armarios e mudamos o status do armário.
  const armarioEmprestado = armarios.find(armario => armario.id === armarioSorteado.id);
  armarioEmprestado.status = false;

  // Salva no objeto a hora da reserva
  const horaReserva = new Date();
  armarioEmprestado["horaReserva"] = horaReserva;

  // Salva no objeto a hora de devolução após 24h do horário reserva
  const horaDevolucao = new Date(horaReserva);
  horaDevolucao.setHours(horaReserva.getHours() + 24);
  armarioEmprestado["horaDevolucao"] = horaDevolucao
  
  // Finalmente, mudamos a pendencia do usuário para verdadeira.
  usuario.pendencia = true;
  
  // Impmimimos uma mensagem de reserva para o usuário.
  document.getElementById("resultado").innerText = `Olá, ${usuario.nome}! O armário ${armarioEmprestado.id} foi reservado com sucesso em ${formatarHora(armarioEmprestado.horaReserva)}!\nFavor devolver até ${formatarHora(armarioEmprestado.horaDevolucao)}`;

  console.log(usuario);
  console.log(armarios);

}

function formatarHora(data) {
  // Utilizando formatador do JavaScript
  const formatador = new Intl.DateTimeFormat('pt-BR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hourCycle: 'h23', // Garante formato 24h
  });

  // Formata a data e hora
  return formatador.format(data)
}