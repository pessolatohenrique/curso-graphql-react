import gql from "graphql-tag";

export const LISTA_PETS = gql`
  query {
    pets {
      id
      nome
      tipo
      dono {
        id
        nome
      }
      observacoes
    }
  }
`;

export const CONSULTA_PET = gql`
  query Pet($id: ID!) {
    pet(id: $id) {
      id
      nome
      dono {
        id
      }
      tipo
      observacoes
    }
  }
`;

export const ADICIONA_PET = gql`
  mutation adicionaPet(
    $nome: String!
    $donoId: Int!
    $tipo: String
    $observacoes: String
  ) {
    adicionaPet(
      nome: $nome
      donoId: $donoId
      tipo: $tipo
      observacoes: $observacoes
    ) {
      nome
      tipo
      observacoes
    }
  }
`;

export const ATUALIZA_PET = gql`
  mutation atualizaPet(
    $id: ID!
    $nome: String!
    $donoId: Int!
    $tipo: String
    $observacoes: String
  ) {
    atualizaPet(
      id: $id
      nome: $nome
      donoId: $donoId
      tipo: $tipo
      observacoes: $observacoes
    ) {
      nome
      tipo
      observacoes
    }
  }
`;

export const DELETA_PET = gql`
  mutation deletaPet($id: ID!) {
    deletaPet(id: $id)
  }
`;
