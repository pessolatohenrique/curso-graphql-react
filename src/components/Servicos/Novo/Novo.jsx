import React from "react";
import {
  REQUIRED_MESSAGE,
  TOO_SHORT_MESSAGE,
  TOO_LONG_MESSAGE,
} from "../../../constants";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import {
  Typography,
  Container,
  Card,
  CardContent,
  TextField,
  Button,
} from "@material-ui/core";
import { CurrencyMaskCustom, unmask } from "../../../helpers/MaskInput";
import { Mutation } from "react-apollo";
import { ADICIONA_SERVICO } from "../../../graphql/servicos";

const ValidationSchema = Yup.object().shape({
  nome: Yup.string()
    .min(2, TOO_SHORT_MESSAGE)
    .max(50, TOO_LONG_MESSAGE)
    .required(REQUIRED_MESSAGE),
  preco: Yup.string().required(REQUIRED_MESSAGE),
});

const INITIAL_VALUES = { nome: "", preco: "", descricao: "" };

const FormComponent = (props) => {
  return (
    <Container>
      <Card>
        <CardContent>
          <Typography variant="h5" component="h2" color="primary">
            Novo Serviço
          </Typography>
          <br />
          <Mutation mutation={ADICIONA_SERVICO}>
            {(adicionaServico, response) => (
              <Formik
                initialValues={INITIAL_VALUES}
                validationSchema={ValidationSchema}
                onSubmit={(values, actions) => {
                  values.preco = parseFloat(unmask(values.preco));
                  adicionaServico({ variables: values });
                  props.history.push("/servicos");
                }}
                render={({
                  errors,
                  touched,
                  values,
                  isSubmitting,
                  handleChange,
                }) => {
                  return (
                    <Form>
                      <TextField
                        name="nome"
                        id="nome"
                        placeholder="Preencha aqui"
                        label="Nome"
                        fullWidth
                        InputLabelProps={{
                          shrink: true,
                        }}
                        error={errors.nome && touched.nome}
                        helperText={
                          errors.nome && touched.nome ? (
                            <div>{errors.nome}</div>
                          ) : null
                        }
                        onChange={handleChange}
                        value={values.nome}
                      />
                      <br />
                      <br />
                      <TextField
                        name="preco"
                        id="preco"
                        placeholder="Preencha aqui"
                        label="Preço"
                        fullWidth
                        InputLabelProps={{
                          shrink: true,
                        }}
                        InputProps={{
                          inputComponent: CurrencyMaskCustom,
                        }}
                        error={errors.preco && touched.preco}
                        helperText={
                          errors.preco && touched.preco ? (
                            <div>{errors.preco}</div>
                          ) : null
                        }
                        onChange={handleChange}
                        value={values.preco}
                      />
                      <br />
                      <br />
                      <TextField
                        name="descricao"
                        id="descricao"
                        placeholder="Preencha aqui"
                        label="Descrição"
                        fullWidth
                        InputLabelProps={{
                          shrink: true,
                        }}
                        error={errors.descricao && touched.descricao}
                        helperText={
                          errors.descricao && touched.descricao ? (
                            <div>{errors.descricao}</div>
                          ) : null
                        }
                        onChange={handleChange}
                        value={values.descricao}
                      />
                      <br />
                      <br />
                      <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        disabled={isSubmitting}
                      >
                        Adicionar
                      </Button>
                    </Form>
                  );
                }}
              ></Formik>
            )}
          </Mutation>
        </CardContent>
      </Card>
    </Container>
  );
};

export default FormComponent;
