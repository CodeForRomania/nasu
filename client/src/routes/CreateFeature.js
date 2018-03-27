import React from 'react'
import { Form, Message, Button, Input, Container, Header } from 'semantic-ui-react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

class CreateFeature extends React.Component {
  state = {
    name: ''
  }

  onSubmit = async () => {
    this.setState({
      nameError: ''
    })

    const { name } = this.state
    const response = await this.props.mutate({
      variables: { name }
    })

    const { ok, errors } = response.data.createFeature

    if (ok) {
      this.setState({
        nameError: '',
        name: ''
      })
    } else {
      const err = {}
      errors.forEach(({ path, message }) => {
        err[`${path}Error`] = message
      })

      this.setState(err)
    }
  }

  onChange = e => {
    const { name, value } = e.target
    this.setState({ [name]: value })
  }

  render() {
    const { name, nameError } = this.state

    const errorList = []

    if (nameError) {
      errorList.push(nameError)
    }

    return (
      <Container text>
        <Header as="h2">CreateFeature</Header>
        <Form>
          <Form.Field error={!!nameError}>
            <Input
              name="name"
              onChange={this.onChange}
              value={name}
              placeholder="Feature name"
              fluid
            />
          </Form.Field>
          <Button onClick={this.onSubmit}>Submit</Button>
        </Form>
        {errorList.length ? (
          <Message error header="There was some errors with your submission" list={errorList} />
        ) : null}
      </Container>
    )
  }
}

const registerMutation = gql`
  mutation($name: String!) {
    createFeature(name: $name) {
      ok
      feature {
        name
      }
      errors {
        path
        message
      }
    }
  }
`

export default graphql(registerMutation)(CreateFeature)
