import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormGroup, ControlLabel, FormControl, Button, ButtonToolbar, Checkbox } from 'react-bootstrap';
import * as contactAction from './actions/contactAction';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCheckedRed = this.handleCheckedRed.bind(this);
    this.handleCheckedGreen = this.handleCheckedGreen.bind(this);
    this.handleCheckedBlue = this.handleCheckedBlue.bind(this);


    this.state = {
      name: '',
      Red: false,
      Green: false,
      Blue: false,
    

    }

  }

  handleChange(event) {
    const re = /^[A-Za-z0-9]+$/;
    if (event.target.value === '' || re.test(event.target.value)) {
      this.setState({ name: event.target.value.substr(0, 8) });
    }
  }

  handleCheckedRed() {
    this.setState({ 
      Red: !this.state.Red
     });
  }

  handleCheckedGreen() {
    this.setState({ 
      Green: !this.state.Green
     });
  }

  handleCheckedBlue() {
    this.setState({ 
      Blue: !this.state.Blue
     });
  }

  handleSubmit(e) {
    e.preventDefault();
    let contact = {
      name: this.state.name + this.checkBoxStyleCheck(),
    }
    this.setState({
      name: '',
      Red: false,
      Green: false,
      Blue: false


    });
    this.props.createContact(contact);
  }

  checkBoxStyleCheck() {
    let a;
    let b;
    let c;
       
    if (this.state.Red === true) {
      a = " Red Color Baby";
    } else a = "";

    if (this.state.Green === true) {
      b = " Green Color Baby";
    } else  b = "";
    if (this.state.Blue === true) {
      c = " Blue Color Baby";
    } else c = "";
    return a + b + c;
  }

  listView(data, index) {
    return (
      <div className="row">
        <div className="col-md-10">
          <li key={index} className="list-group-item clearfix">
            {data.name}
          </li>
        </div>
        <div className="col-md-2">
          <button onClick={(e) => this.deleteContact(e, index)} className="btn btn-danger">
            Remove
          </button>
        </div>
      </div>
    )
  }

  deleteContact(e, index) {
    e.preventDefault();
    this.props.deleteContact(index);
  }

  getValidationState() {
    const length = this.state.name.length;
    if (length > 3) return 'success';
    else if (length > 0) return 'error';
    return null;
  }

  render() {

    return (
      <div>
        <form
          onSubmit={this.handleSubmit}
          className='ef-position'>

          <FormGroup
            validationState={this.getValidationState()}
          >
            <ControlLabel>Name</ControlLabel>
            <FormControl
              className="fc-length"
              type="text"
              value={this.state.name}
              placeholder="Enter text"
              onChange={this.handleChange}
            />
            <FormControl.Feedback />
          </FormGroup>
          <FormGroup>
            <ControlLabel>Color</ControlLabel>
            <FormGroup>
              <Checkbox
                type="checkbox"
                checked={this.state.Red}
                onChange={this.handleCheckedRed}>
                {' RED'}
              </Checkbox>
              <Checkbox
                type="checkbox"
                checked={this.state.Green}
                onChange={this.handleCheckedGreen}>
                {' GREEN'}
              </Checkbox>
              <Checkbox
                type="checkbox"
                checked={this.state.Blue}
                onChange={this.handleCheckedBlue}>
                {' BLUE'}
              </Checkbox>
            </FormGroup>
            <ButtonToolbar>
              <Button
                bsStyle="primary"
                onClick={this.handleSubmit}>Add</Button>
            </ButtonToolbar>
          </FormGroup>
        </form>
        <hr />
        {<ul className="list-group">
          {this.props.contacts.map((contact, i) => this.listView(contact, i))}
        </ul>}
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    contacts: state.contacts
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    createContact: contact => dispatch(contactAction.createContact(contact)),
    deleteContact: index => dispatch(contactAction.deleteContact(index))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
