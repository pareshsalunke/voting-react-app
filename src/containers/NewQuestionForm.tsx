import React, { Component } from 'react';
import { Col, Button, Form, FormGroup, Label, Input, Alert } from 'reactstrap';
import axios from "axios/index";
import { API_URL } from "../constants";
import { buildChoices } from '../utils';

import styled from "styled-components";

interface NewQuestionFormProps {
  
}

interface NewQuestionFormState {
  questionTitle: string;
  choices: string;
  isError: boolean;
  isSuccess:boolean;
}

class NewQuestionFormBase extends Component<NewQuestionFormProps, NewQuestionFormState> {
  constructor(props: NewQuestionFormProps) {
    super(props);
    this.state = {
      questionTitle: '',
      choices: '',
      isError: false,
      isSuccess: false,
    };

    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleChangeChoices = this.handleChangeChoices.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChangeName(event) {
    this.setState({questionTitle: event.target.value});
  }

  handleChangeChoices(event) {
    this.setState({choices: event.target.value});
  }


  handleSubmit(event: React.MouseEventHandler<HTMLButtonElement>) {
    const choices = buildChoices(this.state.choices);
    const choicesObject='{"question": "'+ this.state.questionTitle +'", "choices": '+ choices + '}';


    axios.post(`${API_URL}questions?page=1`,choicesObject)
        .then(response => {
          this.setState({
            isSuccess:true,
            isError:false
          });
          setTimeout(function() {
            window.location.href = "/";
          }, 3000);
        })
        .catch(error => {
          console.info(error);
          this.setState({
            isError:true,
            isSuccess:false,
          });
        });
    event.preventDefault();
  }

  public render() {
    return (
        <Form onSubmit={this.handleSubmit}  >
          { this.state.isSuccess && <Alert color="success">The new questions were created successfully!</Alert> }
          { this.state.isError && <Alert color="danger">There was an error! The new question was not created!</Alert> }

          <FormGroup row>
            <Label for="questionname" sm={2}>New Question</Label>
            <Col md={10}>
              <Input type="text" name="questionname" id="questionname" placeholder="Type your new question" value={this.state.questionTitle} onChange={this.handleChangeName} />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="choiceslist" sm={2}>Choices</Label>
            <Col md={10}>
              <Input type="textarea" name="text" id="choiceslist" placeholder="Please list the choices separated by coma. Eg: A, B, C, D" value={this.state.choices} onChange={this.handleChangeChoices}/>
            </Col>
          </FormGroup>
          <FormGroup check row>
            <Col md={{ size: 10, offset: 2 }}>
              <Button color="primary">Submit</Button>
            </Col>
          </FormGroup>
        </Form>
    );
  }
}

export const NewQuestionForm = styled(NewQuestionFormBase)`

`;