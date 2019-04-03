import React, {PureComponent} from 'react';
import { Collapse, Button, CardBody, Card } from 'reactstrap';
import { NewQuestionForm } from "./NewQuestionForm";

interface CreateQuestionProps {

}

interface CreateQuestionState {
  collapse: boolean;
}
class CreateQuestion extends PureComponent<CreateQuestionProps, CreateQuestionState> {
  constructor(props: CreateQuestionProps) {
    super(props);
    this.state = {
      collapse: false
    };
  }

  toggle() {
    this.setState({ collapse: !this.state.collapse });
  }

  public render() {
    return (
        <div>
          <Button onClick={() => this.toggle()}
                  className="btn-add"
                  style={{ marginBottom: '1rem' }}>
            Add Question
          </Button>
          {this.state.collapse &&
	        <Collapse isOpen={this.state.collapse}>
		        <Card>
			        <CardBody>
				        <NewQuestionForm/>
			        </CardBody>
		        </Card>
	        </Collapse>
          }
        </div>
    );
  }
}

export default CreateQuestion;