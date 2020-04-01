import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import DateTimePicker from "react-widgets/lib/DateTimePicker";
import moment from "moment";
import momentLocalizer from "react-widgets-moment";

moment.locale("en");
momentLocalizer();

class RaiseSalaryForm extends Component {
  reset = () => {
    setTimeout(() => {
      this.props.reset();
    }, 100);
  };

  render() {
    const renderDateTimePicker = ({ input: { onChange, value }, showTime }) => (
      <DateTimePicker
        onChange={onChange}
        format="DD MMM YYYY"
        time={showTime}
        value={!value ? null : new Date(value)}
      />
    );

    const { handleSubmit, addSalaryRaise } = this.props;
    return (
      <form onSubmit={handleSubmit(addSalaryRaise)}>
        <label className="form-title"> Salary Raise</label>
        <div className="form-group">
          <label htmlFor="date">Date</label>
          <Field
            name="date"
            component={renderDateTimePicker}
            type="text"
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="amount">Amount</label>
          <Field
            name="amount"
            component="input"
            type="number"
            parse={value => Number(value)}
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <Field
            name="description"
            component="input"
            type="text"
            className="form-control"
            required
          />
        </div>
        <button
          type="submit"
          className="btn btn-primary submit-button"
          onClick={this.reset}
        >
          Submit
        </button>
      </form>
    );
  }
}

RaiseSalaryForm = reduxForm({
  form: "raiseSalaryForm"
})(RaiseSalaryForm);

export default RaiseSalaryForm;
