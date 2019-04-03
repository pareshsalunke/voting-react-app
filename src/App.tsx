import React, {PureComponent} from 'react';
import { QuestionsList } from "./containers/QuestionsList";
import { QuestionDetails }  from "./containers/QuestionDetail";

import './App.css';

import { Container } from 'reactstrap';
import {
  BrowserRouter,
  Switch,
  Route,
} from 'react-router-dom';

interface AppProps {
  className?: string;
}

interface AppState {
  questions: [];
}

class App extends PureComponent<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props);
    this.state = {
      questions: []
    };
  }

  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Switch>
            <Route path="/questions/:question_id" component={QuestionDetails} />
            <Route path="/" component={QuestionsList} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
