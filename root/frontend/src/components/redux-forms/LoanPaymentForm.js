import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import DateTimePicker from 'react-widgets/lib/DateTimePicker';
import moment from 'moment';
import momentLocalizer from 'react-widgets-moment';

moment.locale('en')
momentLocalizer()

class LoanPaymentForm extends Component {
    reset = () => {
        setTimeout(() => {
            this.props.reset();
        }, 100)
    }
    render() {
        const renderDateTimePicker = ({ input: { onChange, value }, showTime }) =>
            <DateTimePicker
                onChange={onChange}
                format="DD MMM YYYY"
                time={showTime}
                value={!value ? null : new Date(value)}
            />

        const { handleSubmit, addLoanExtraPayment } = this.props;
        return (
            <form onSubmit={handleSubmit(addLoanExtraPayment)}>
                <label className="form-title">Loan Payment</label>
                <div className="form-group">
                    <label htmlFor="date">Date</label>
                    <Field name="date" component={renderDateTimePicker} type="text" className="form-control"/>
                </div>
                <div className="form-group">
                    <label htmlFor="amount">Amount</label>
                    <Field name="amount" component="input" type="number" className="form-control"/>
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <Field name="description" component="input" type="text" className="form-control"/>
                </div>
                <button type="submit" className="btn btn-primary submit-button" onClick={this.reset}>Submit</button>
            </form>
        );
    }
}

LoanPaymentForm = reduxForm({
    form: 'loanPaymentForm'
})(LoanPaymentForm);

export default LoanPaymentForm;