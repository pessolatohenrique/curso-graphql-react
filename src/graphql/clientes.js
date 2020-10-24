import gql from "graphql-tag";

export const LISTA_CLIENTES = gql`
  query {
    clientes {
      id
      nome
      cpf
    }
  }
`;

export const CONSULTA_CLIENTE = gql`
  query Cliente($id: ID!) {
    cliente(id: $id) {
      id
      nome
      cpf
    }
  }
`;

export const ADICIONA_CLIENTE = gql`
  mutation adicionaCliente($nome: String!, $cpf: String!) {
    adicionaCliente(nome: $nome, cpf: $cpf) {
      id
      nome
      cpf
    }
  }
`;

export const ATUALIZA_CLIENTE = gql`
  mutation atualizaCliente($id: ID!, $nome: String!, $cpf: String!) {
    atualizaCliente(id: $id, nome: $nome, cpf: $cpf) {
      id
      nome
      cpf
    }
  }
`;

export const DELETA_CLIENTE = gql`
  mutation deletaCliente($id: ID!) {
    deletaCliente(id: $id)
  }
`;
