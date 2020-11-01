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

export const DELETA_PET = gql`
  mutation deletaPet($id: ID!) {
    deletaPet(id: $id)
  }
`;
