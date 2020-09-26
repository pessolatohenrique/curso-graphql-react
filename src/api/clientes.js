import { api, opcoesFetch } from "./config";

const listarClientes = async () => {
  return fetch(
    "http://localhost:4000/",
    opcoesFetch("{clientes { id nome cpf }}")
  )
    .then((resposta) => resposta.json())
    .then((dados) => dados.data.clientes);
};

const buscarClientePorId = (id) => {
  return fetch(
    "http://localhost:4000",
    opcoesFetch(`{
    cliente(id: ${id}) {
      nome
      cpf
    }
  }`)
  )
    .then((resposta) => resposta.json())
    .then((dados) => dados.data.cliente);
};

const adicionarCliente = (cliente) => {
  return fetch(
    "http://localhost:4000/",
    opcoesFetch(`
    mutation {
      adicionaCliente(nome: "${cliente.nome}", cpf: "${cliente.cpf}") {
        id
        nome
      }
    }
  `)
  )
    .then((resposta) => resposta.json())
    .then((dados) => dados.data.cliente);
};

const alterarCliente = (id, cliente) => {
  return fetch(
    "http://localhost:4000",
    opcoesFetch(`
  mutation {
    atualizaCliente(id: ${id}, nome: "${cliente.nome}", cpf: "${cliente.cpf}") {
      cpf
      nome
    }
  }
`)
  )
    .then((resposta) => resposta.json())
    .then((dados) => dados.data);
};

const removerCliente = (id) => {
  return fetch(
    "http://localhost:4000",
    opcoesFetch(`mutation { deletaCliente (id: ${id})}`)
  );
};

export default {
  listarClientes,
  buscarClientePorId,
  adicionarCliente,
  alterarCliente,
  removerCliente,
};
