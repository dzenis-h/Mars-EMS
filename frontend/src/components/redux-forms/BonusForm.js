import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import DateTimePicker from "react-widgets/lib/DateTimePicker";
import moment from "moment";
import momentLocalizer from "react-widgets-moment";

moment.locale("en");
momentLocalizer();

class BonusForm extends Component {
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

    const { handleSubmit, addBonus } = this.props;
    return (
      <form onSubmit={handleSubmit(addBonus)}>
        <label className="form-title">Bonus</label>
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
          <label htmlFor="description">Description</label>
          <Field
            name="description"
            component="input"
            type="text"
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <Field
            name="isRepeating"
            className="form__small--check"
            component="input"
            type="checkbox"
            value="isRepeating"
            required
          />
          <label htmlFor="isRepeating" className="form__small--check__label">
            Is repeating
          </label>
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

BonusForm = reduxForm({
  form: "bonusForm"
})(BonusForm);

export default BonusForm;
