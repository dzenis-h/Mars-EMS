import React, {Component} from 'react';
import RaiseSalaryForm from "../../redux-forms/SalaryRaiseForm";
import PenaltyForm from "../../redux-forms/PenaltyForm";
import BonusForm from "../../redux-forms/BonusForm";
import LoanForm from "../../redux-forms/LoanForm";
import LoanNoteForm from "../../redux-forms/LoanNoteForm";
import LoanPaymentForm from "../../redux-forms/LoanPaymentForm";
import Rodal from 'rodal';
import noDataIl from '../../../img/no-data-illustration.png';
import ContentApi from "../../../api/contentApi";
import moment from "moment/moment";
import PropTypes from "prop-types";
import profileTabItems from '../../../models/profileTabs';
import {confirmAlert} from 'react-confirm-alert';

class TabContentComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visibleModal: false,
            displayData: []
        }
    }

    show = () => {
        this.setState({visibleModal: true});
    }

    hide = () => {
        this.setState({visibleModal: false});
    }

    getForm() {
        let form;

        switch (this.props.activeTab.id) {
            case profileTabItems[0].id:
                form = <RaiseSalaryForm addSalaryRaise={this.addTabContent}/>
                break;
            case profileTabItems[1].id:
                form = <BonusForm addBonus={this.addTabContent}/>
                break;
            case profileTabItems[2].id:
                form = <PenaltyForm addPenalty={this.addTabContent}/>
                break;
            case profileTabItems[3].id:
                form = <LoanForm addLoan={this.addTabContent}/>
                break;
            case profileTabItems[4].id:
                form = <LoanNoteForm addLoanNote={this.addTabContent}/>
                break;
            case profileTabItems[5].id:
                form = <LoanPaymentForm addLoanExtraPayment={this.addTabContent}/>
                break;
            default:
                form = <RaiseSalaryForm addSalaryRaise={this.addTabContent}/>
        }
        return form;
    }

    addTabContent = (values) => {
        let data = Object.assign({}, values);
        data.employeeJMBG = this.props.employeeJMBG;
        ContentApi.post(data, this.props.activeTab.url).then(response => {
            this.getByIdActiveTabContent(this.props.activeTab);
            this.hide();
        }).catch(error => {
            console.log('error while adding raise salary', error);
            throw(error);
        })
    }

    deleteTabContent = (id) => {
        ContentApi.delete(id, this.props.activeTab.url).then(response => {
            this.getByIdActiveTabContent(this.props.activeTab);
        }).catch(error => {
            console.log('error while adding raise salary', error);
            throw(error);
        })
    }

    openDeleteConfirmModal = (id) => {
        confirmAlert({
            title: 'Confirm',
            message: 'Are you sure you want to delete an item?',
            confirmLabel: 'Confirm',
            cancelLabel: 'Cancel',
            onConfirm: () => this.deleteTabContent(id)
        })
    }

    getByIdActiveTabContent = (value) => {
        ContentApi.getById(this.props.employeeJMBG, value.url).then(response => {
            this.setState({
                displayData: Object.assign([], response.data)
            });
        }).catch(error => {
            console.log('error while adding raise salary', error);
            throw(error);
        })
    }

    componentWillReceiveProps(nextProps) {
        this.getByIdActiveTabContent(nextProps.activeTab);
    }

    render() {
        const displayTabContent = this.state.displayData.map(item => {
            return <tr key={item.date.toString()}>
                <td className="col-md-3">{moment(item.date).format('MM-DD-YYYY')}</td>
                <td className="col-md-3">{item.amount} {item.unit}</td>
                <td className="col-md-5">{item.description}</td>
                <td className="col-md-1">
                    <a onClick={this.openDeleteConfirmModal.bind(this, item.id)}><span
                        className="fa fa-times icon-pointer"></span></a>
                </td>
            </tr>
        });

        return (
            <div>
                <div className="col-md-8">
                    <div className="form-content">
                    <div className="portlet portlet-boxed">
                        <div className="portlet-header tab-content-portlet-header">
                            <h4 className="portlet-title">{this.props.activeTab.name}</h4>
                            <button className="btn btn-primary submit-button" onClick={this.show}> Add new</button>
                        </div>
                        {this.state.displayData.length > 0 &&
                        <div>
                            <div className="portlet-body">
                                <table className="table table-striped">
                                    <thead>
                                    <tr>
                                        <th>Date</th>
                                        <th>Amount</th>
                                        <th>Description</th>
                                        <th></th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {displayTabContent}
                                 </tbody>
                                </table>
                            </div>
                        </div>
                        }

                    {this.state.displayData.length === 0 &&
                    <div className="portlet-body no-data__wrapper">
                        <img src={noDataIl} alt="Missing data illustration" className="no-data__image"/>
                        <p className="no-data">Oops there is no data for this employee detail item! <br/>
                        Please add some!</p>
                    </div>
                    }
                    </div>
                </div>
                </div>

                <Rodal visible={this.state.visibleModal} onClose={this.hide} closeOnEsc={true} customStyles={{ height: 'auto', bottom: 'auto', top: '50%', transform: 'translateY(-50%)' }}>
                       {this.getForm()}
                </Rodal>
            </div>
        );
    }
}

TabContentComponent.propTypes = {
    activeTab: PropTypes.object.isRequired,
    employeeJMBG: PropTypes.string.isRequired,
};

export default TabContentComponent;
