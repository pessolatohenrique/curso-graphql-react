import React from "react";
import petsApi from "../../../api/pets";
import { Mutation } from "react-apollo";
import { ADICIONA_PET } from "../../../graphql/pets";

class Novo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      nome: "",
      donoId: "",
      tipo: "",
      observacoes: "",
    };

    this.gerenciarMudancas = this.gerenciarMudancas.bind(this);
    this.gerenciarEnvio = this.gerenciarEnvio.bind(this);
  }

  gerenciarMudancas(evento) {
    const chave = evento.target.name;
    const valor = evento.target.value;
    this.setState({ [chave]: valor });
  }

  async gerenciarEnvio(evento, adicionaPet) {
    evento.preventDefault();

    const variables = {
      ...this.state,
      donoId: parseInt(this.state.donoId),
    };

    await adicionaPet({
      variables,
    });

    this.props.history.push("/pets");
  }

  render() {
    return (
      <div>
        <h1>Novo Pet</h1>

        <Mutation mutation={ADICIONA_PET}>
          {(adicionaPet, response) => {
            if (response.error) {
              return <span>{response.error.message}</span>;
            }

            return (
              <form
                onSubmit={(event) => this.gerenciarEnvio(event, adicionaPet)}
              >
                <div>
                  <label htmlFor="nome">Nome</label>
                  <input
                    type="text"
                    name="nome"
                    id="nome"
                    value={this.state.nome}
                    onChange={this.gerenciarMudancas}
                  />
                </div>
                <div>
                  <label htmlFor="donoId">dono</label>
                  <input
                    type="text"
                    name="donoId"
                    id="donoId"
                    value={this.state.donoId}
                    onChange={this.gerenciarMudancas}
                  />
                </div>
                <div>
                  <label htmlFor="tipo">tipo</label>
                  <input
                    type="text"
                    name="tipo"
                    id="tipo"
                    value={this.state.tipo}
                    onChange={this.gerenciarMudancas}
                  />
                </div>
                <div>
                  <label htmlFor="observacoes">observacoes</label>
                  <input
                    type="text"
                    name="observacoes"
                    id="observacoes"
                    value={this.state.observacoes}
                    onChange={this.gerenciarMudancas}
                  />
                </div>

                <button type="submit">Enviar</button>
              </form>
            );
          }}
        </Mutation>
      </div>
    );
  }
}

export default Novo;
