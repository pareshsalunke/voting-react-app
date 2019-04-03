import React, { PureComponent } from 'react';
import { Button, ListGroup, Alert, Progress }  from 'reactstrap';
import axios from 'axios';
import { calculatePercent, totalVotes, choiceNumber } from '../utils';

import { API_URL } from '../constants';
import styled from "styled-components";

interface QuestionDetailProps {
  className?: string;
}

interface QuestionDetailState {
  questionName: string;
  choiceSelected: number;
  choicesList: Choice[];
  totalVotes: number;
  isError: boolean;
  isSuccess: boolean;
}

export interface Choice {
  choice: string;
  url: string;
  votes: number;
}

class QuestionDetailsBase extends PureComponent<QuestionDetailProps, QuestionDetailState> {

  constructor (props: any) {
    super(props);

    this.state = {
      questionName:'',
      choiceSelected: 0,
      choicesList:[],
      totalVotes:0,
      isError:false,
      isSuccess:false,
    };

  }

  onRadioBtnClick(choiceId: number) {
    this.setState({ choiceSelected: choiceId });
  }

  saveChoice() {
    let choiceId= this.state.choiceSelected;
    if (choiceId && this.props){
      console.info(choiceId);
      // @ts-ignore
      axios.post(`${API_URL}questions/${this.props.match.params.question_id}/choices/${choiceId}`)
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
    } else {
      console.info('you have to set a choice!');
      this.setState({
        isError:true,
        isSuccess:false,
      });
    }

  }

  componentDidMount() {
    axios.get(`${API_URL}questions/${this.props.match.params.question_id}`)
        .then(response => {
          this.setState({
            questionName:response.data.question,
            choicesList: response.data.choices,
            totalVotes:totalVotes(response.data.choices),
          })
        })
        .catch(error => {
          console.info(error);
        });
  }

  public render() {
    return (
      <div  className="question-detail-section">
        <h2 className="question-detail--title">Question Detail</h2>
        { this.state.isSuccess && <Alert color="success">Your vote has been registered!</Alert> }
        { this.state.isError && <Alert color="danger">Your vote has NOT been registered!</Alert> }

        <div className="detail-container">
          <h4><strong>Question: { this.state.questionName }</strong></h4>
          <ListGroup>
            {
              this.state.choicesList.map(data => {
                  let numberId = choiceNumber(data.url);
                  let percentVote = calculatePercent(data.votes, this.state.totalVotes);

                  return (
                    <Button key={data.url} color="primary"
                            onClick={() => this.onRadioBtnClick(numberId)}
                            active={this.state.rSelected === numberId}>
                      <div className="choice-detail--container">
                        <span>{data.choice}</span>
                        <span>{data.votes}</span>
                        <span>
                          <div className="text-center">{percentVote} %</div>
                          <Progress color="info" value={Math.round(percentVote)} />
                        </span>
                      </div>
                    </Button>
                  )
                }
              )
            }
          </ListGroup>
          <Button color="primary" onClick={() => this.saveChoice()}>Save Choice</Button>
        </div>
      </div>
    )
  }
}

export const QuestionDetails = styled(QuestionDetailsBase)`
  display: inline-flex;
      flex-direction: column;
  .question-detail-section span {
    width: 30%;
    position: relative;
    float: left;
    text-align: center;
  }
    
  .question-detail-section button {
    margin: 1px;
  }
  
  .detail-container {
    display: flex;
    flex-direction: column;
    width: 50%;
    background: white;
   }
`;
