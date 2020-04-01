import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import DateTimePicker from "react-widgets/lib/DateTimePicker";
import moment from "moment";
import momentLocalizer from "react-widgets-moment";

moment.locale("en");
momentLocalizer();

class LoanForm extends Component {
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

    const { handleSubmit, addLoan } = this.props;
    return (
      <form onSubmit={handleSubmit(addLoan)}>
        <label className="form-title">Loan</label>
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
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="installment">Installment</label>
          <Field
            name="installment"
            component="input"
            type="number"
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="unit">Unit</label>
          <Field
            name="unit"
            component="select"
            className="form-control"
            required
          >
            <option></option>
            <option value="BAM">BAM</option>
            <option value="$">$</option>
          </Field>
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

LoanForm = reduxForm({
  form: "loanForm"
})(LoanForm);

export default LoanForm;
