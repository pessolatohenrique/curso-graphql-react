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
import { LISTA_PETS, DELETA_PET } from "../../../graphql/pets";

class Pets extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  render() {
    return (
      <div>
        <Container>
          <Card>
            <CardContent>
              <CustomBreadcrumb childrenLabel="Listar" />
              <Typography variant="h5" component="h2" color="primary">
                Pets
              </Typography>
              <br />
              <TableContainer component={Paper}>
                <Table aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Nome</TableCell>
                      <TableCell>Tipo</TableCell>
                      <TableCell>Dono</TableCell>
                      <TableCell>Observações</TableCell>
                      <TableCell>Ações</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <Query query={LISTA_PETS} fetchPolicy="no-cache">
                      {({ data, refetch }) => {
                        if (!data) return null;

                        return data.pets.map((pet) => (
                          <TableRow key={pet.id}>
                            <TableCell component="th" scope="row">
                              {pet.nome}
                            </TableCell>
                            <TableCell>{pet.tipo}</TableCell>
                            <TableCell>{pet.dono.nome}</TableCell>
                            <TableCell>
                              {pet.observacoes || "(não definido)"}
                            </TableCell>
                            <TableCell>
                              <Button
                                color="primary"
                                href={`pets/alterar/${pet.id}`}
                              >
                                <Create />
                              </Button>
                              <Mutation mutation={DELETA_PET}>
                                {(deletaPet, response) => {
                                  return (
                                    <Button
                                      color="secondary"
                                      onClick={() => {
                                        deletaPet({
                                          variables: { id: pet.id },
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
              <Button size="small" color="primary" href="/pets/novo">
                Adicionar Pet
              </Button>
            </CardActions>
          </Card>
        </Container>
      </div>
    );
  }
}

export default Pets;
