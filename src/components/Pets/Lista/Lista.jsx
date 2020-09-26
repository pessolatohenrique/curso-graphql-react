import React from "react";
import { Link } from "react-router-dom";
import { Query } from "react-apollo";
import { LISTA_PETS } from "../../../graphql/pets";

class Pets extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  render() {
    return (
      <div>
        <div className="header">
          <h1>Pets</h1>
          <Link to="/pets/novo">Novo Pet </Link>
        </div>

        <table>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Tipo</th>
              <th>Dono ID</th>
              <th>Dono Nome</th>
              <th>Observações</th>
              <th>Ações</th>
            </tr>
          </thead>

          <tbody>
            <Query query={LISTA_PETS} fetchPolicy="no-cache">
              {({ data }) => {
                if (!data) return null;
                return data.pets.map((pet) => {
                  return (
                    <tr key={pet.id}>
                      <td>{pet.nome}</td>
                      <td>{pet.tipo}</td>
                      <td>{pet.dono.id}</td>
                      <td>{pet.dono.nome}</td>
                      <td>{pet.observacoes}</td>
                      <td>
                        <Link to={`pets/${pet.id}`}>visualizar</Link>
                        <Link to={`pets/alterar/${pet.id}`}>alterar</Link>
                        <button onClick={() => true}>remover</button>
                      </td>
                    </tr>
                  );
                });
              }}
            </Query>
          </tbody>
        </table>
      </div>
    );
  }
}

export default Pets;
