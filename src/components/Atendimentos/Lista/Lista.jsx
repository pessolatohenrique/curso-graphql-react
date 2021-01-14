import React from "react";
import Container from "@material-ui/core/Container";
import Card from "@material-ui/core/Card";
import { Create, Delete } from "@material-ui/icons";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import CustomBreadcrumb from "../../Utilitarios/CustomBreadcrumb";
import { Query, Mutation } from "react-apollo";
import {
  LISTA_ATENDIMENTOS,
  DELETA_ATENDIMENTO,
} from "../../../graphql/atendimentos";

class Atendimentos extends React.Component {
  componentDidMount() {}

  render() {
    return (
      <div>
        <Container>
          <Card>
            <CardContent>
              <CustomBreadcrumb childrenLabel="Listar" />

              <Typography variant="h5" component="h2" color="primary">
                Atendimentos
              </Typography>
              <br />
              <TableContainer component={Paper}>
                <Table aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Cliente</TableCell>
                      <TableCell>Pet</TableCell>
                      <TableCell>Serviço</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Ações</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <Query query={LISTA_ATENDIMENTOS} fetchPolicy="no-cache">
                      {({ data, refetch }) => {
                        if (!data) return null;

                        return data.atendimentos.map((atendimento) => (
                          <TableRow key={atendimento.id}>
                            <TableCell component="th" scope="row">
                              {atendimento.cliente.nome}
                            </TableCell>
                            <TableCell component="th" scope="row">
                              {atendimento.pet.nome}
                            </TableCell>
                            <TableCell component="th" scope="row">
                              {atendimento.servico.nome}
                            </TableCell>
                            <TableCell>{atendimento.status}</TableCell>
                            <TableCell>
                              <Button
                                color="primary"
                                href={`atendimentos/alterar/${atendimento.id}`}
                              >
                                <Create />
                              </Button>
                              <Mutation mutation={DELETA_ATENDIMENTO}>
                                {(deletaAtendimento, response) => {
                                  return (
                                    <Button
                                      color="secondary"
                                      onClick={() => {
                                        deletaAtendimento({
                                          variables: { id: atendimento.id },
                                        });
                                        refetch();
                                      }}
                                    >
                                      <Delete />
                                    </Button>
                                  );
                                }}
                              </Mutation>
                            </TableCell>
                          </TableRow>
                        ));
                      }}
                    </Query>
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
            <CardActions>
              <Button size="small" color="primary" href="/atendimentos/novo">
                Adicionar Atendimento
              </Button>
            </CardActions>
          </Card>
        </Container>
      </div>
    );
  }
}

export default Atendimentos;
