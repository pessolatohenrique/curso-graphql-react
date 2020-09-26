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
