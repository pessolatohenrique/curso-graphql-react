import gql from "graphql-tag";

export const LISTA_ATENDIMENTOS = gql`
  query {
    atendimentos {
      id
      status
      observacoes
      cliente {
        nome
      }
      pet {
        nome
        tipo
      }
      servico {
        nome
      }
    }
  }
`;

export const CONSULTA_ATENDIMENTO = gql`
  query atendimento($id: ID!) {
    atendimento(id: $id) {
      id
      status
      observacoes
      cliente {
        id
        nome
      }
      pet {
        id
        nome
        tipo
      }
      servico {
        id
        nome
      }
    }
  }
`;

export const ADICIONA_ATENDIMENTO = gql`
  mutation adicionaAtendimento(
    $clienteId: Int!
    $petId: Int!
    $servicoId: Int!
    $status: String!
    $observacoes: String!
  ) {
    adicionaAtendimento(
      clienteId: $clienteId
      petId: $petId
      servicoId: $servicoId
      status: $status
      observacoes: $observacoes
    ) {
      id
      status
      observacoes
    }
  }
`;

export const ATUALIZA_ATENDIMENTO = gql`
  mutation atualizaAtendimento(
    $id: ID!
    $clienteId: Int!
    $petId: Int!
    $servicoId: Int!
    $status: String!
    $observacoes: String!
  ) {
    atualizaAtendimento(
      id: $id
      clienteId: $clienteId
      petId: $petId
      servicoId: $servicoId
      status: $status
      observacoes: $observacoes
    ) {
      id
      status
      observacoes
    }
  }
`;

export const DELETA_ATENDIMENTO = gql`
  mutation deletaAtendimento($id: ID!) {
    deletaAtendimento(id: $id)
  }
`;
