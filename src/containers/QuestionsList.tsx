import * as React from "react";
import styled from "styled-components";
import axios from "axios";
import { Link } from 'react-router-dom';
import CreateQuestion from "./CreateQuestion";

interface QuestionsListState {
  questions: QuestionDetail[];
}

interface QuestionsProps {
  className?: string;
}

interface QuestionDetail {
  question: string;
  published_at: string;
  choices: [];
  url: string;
}

class QuestionsListBase extends React.PureComponent<QuestionsProps, QuestionsListState> {

  constructor(props: QuestionsProps) {
    super(props);
    this.state = {
      questions: []
    };
  }
  fetchQuestions() {
    axios.get('http://polls.apiblueprint.org/questions')
        .then(response => {
          this.setState({
            questions: response.data
          });
          console.log(this.state.questions);
        });
  }

  componentDidMount() {
    this.fetchQuestions();
  }

  public render() {
    const { questions } = this.state;
    return (
      <div className="container">
        <h2 className="title">Questions</h2>
        <CreateQuestion />
        <ul className={this.props.className}>
          { questions &&
          questions.map((question, index) => (
              <li key={index} className="cards-item">
                <Link to={question.url}>
                  <div className="card">
                    <h4><strong>Question: {question.question}</strong></h4>
                    <div>Published At: {question.published_at}</div>
                    <div>No. of Choices: {question.choices.length}</div>
                  </div>
                </Link>
              </li>

          ))}
        </ul>
      </div>
    );
  }

};

export const QuestionsList = styled(QuestionsListBase)`
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  margin: 0;
  padding: 0;
  
  .cards-item {
    display: flex;
    padding: 1rem;
    
    @media(min-width: 40rem) {
      width: 50%;
    }
    @media(min-width: 56rem) {
      width: 33.3333%;
    }
    
    a {
      text-decoration: none;
      color: inherit;

    }
  }
  
  .card {
    background-color: white;
    border-radius: 0.25rem;
    box-shadow: 0 20px 40px -14px rgba(0,0,0,0.25);
    display: flex;
    flex-direction: column;
    overflow: hidden;
    align-items: flex-start;
    padding: 1rem;
    width: 100%;
    flex: 1 1 auto;
    
    div {
      font-size: 0.875rem;
      line-height: normal;
      margin-bottom: 1rem;
    }
  }
`;