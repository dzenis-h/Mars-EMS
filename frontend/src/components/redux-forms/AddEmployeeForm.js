import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import DateTimePicker from "react-widgets/lib/DateTimePicker";
import moment from "moment";
import momentLocalizer from "react-widgets-moment";

moment.locale("en");
momentLocalizer();

class AddEmployeeForm extends Component {
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

    const { addEmployee, handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit(addEmployee)}>
        <div className="form-group form__small">
          <label htmlFor="name">Name</label>
          <Field
            name="name"
            component="input"
            type="text"
            className="form-control"
            required
          />
        </div>

        <div className="form-group form__small form__small--right">
          <label htmlFor="surname">Surname</label>
          <Field
            name="surname"
            component="input"
            type="text"
            className="form-control"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="jmbg">JMBG</label>
          <Field
            name="jmbg"
            component="input"
            type="text"
            className="form-control"
            required
          />
        </div>

        <div className="form-group form__small">
          <label htmlFor="birthdate">Date Of Birth</label>
          <Field
            name="birthdate"
            component={renderDateTimePicker}
            type="text"
            className="form-control"
            required
          />
        </div>

        <div className="form-group form__small form__small--right">
          <label htmlFor="gender">Gender</label>
          <Field
            name="gender"
            component="select"
            className="form-control"
            required
          >
            <option></option>
            <option value="M">Male</option>
            <option value="F">Female</option>
          </Field>
        </div>

        <hr></hr>

        <div className="form-group">
          <label htmlFor="position">Position</label>
          <Field
            name="position"
            component="input"
            type="text"
            className="form-control"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="startdate">Start Date</label>
          <Field
            name="startdate"
            component={renderDateTimePicker}
            type="text"
            className="form-control"
            required
          />
        </div>

        <div className="form-group">
          <Field
            name="isPayoneer"
            className="form__small--check"
            component="input"
            type="checkbox"
            required
          />
          <label htmlFor="isPayoneer" className="form__small--check__label">
            Is Payoneer
          </label>
        </div>

        <button
          type="submit"
          className="btn btn-primary submit-button"
          //   onClick={this.reset}
        >
          Submit
        </button>
      </form>
    );
  }
}

AddEmployeeForm = reduxForm({
  form: "addEmployeeForm"
})(AddEmployeeForm);

export default AddEmployeeForm;
