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

export const ADICIONA_CLIENTE = gql`
  mutation adicionaCliente($nome: String!, $cpf: String!) {
    adicionaCliente(nome: $nome, cpf: $cpf) {
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
