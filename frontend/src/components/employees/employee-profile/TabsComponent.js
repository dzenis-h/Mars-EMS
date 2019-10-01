import React, {Component} from 'react';
import { Info } from 'react-feather';
import { ChevronRight } from "react-feather";
import TabContentComponent from "./TabContentComponent";
import PropTypes from "prop-types";
import profileTabItems from '../../../models/profileTabs';

class TabsComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tabs: profileTabItems,
            activeTab: {}
        }
    }

    setTabAsActive = (selectedTab) => {
        let tabs = Object.assign([], this.state.tabs);
        const updatedTabs = tabs.map(item => {
            if (item.id === selectedTab.id) {
                item.active = true;
                return item;
            }
            item.active = false;
            return item;
        });
        const activeTab = updatedTabs.filter(tab => tab.active);
        this.setState({
            tabs: updatedTabs,
            activeTab: Object.assign({}, activeTab[0])
        });
    }

    componentDidMount() {
        this.setState({
            activeTab: this.state.tabs[0]
        })
    }

    render() {
        const tabs = this.state.tabs.map(item => {
            return <a className={`list-group-item ${item.active && 'selectedTab'}`} key={item.id}
                      onClick={() => this.setTabAsActive(item)}>
                <Info size="18" /> &nbsp;&nbsp;
                {item.name}
                <ChevronRight size="18" />
            </a>
        });

        return (
            <div>
                <div className="col-md-4">
                    <div className="list-group">
                        {tabs}
                    </div>
                </div>
                <TabContentComponent activeTab={this.state.activeTab} employeeJMBG={this.props.employeeJMBG}/>
            </div>
        );
    }
}

TabsComponent.propTypes = {
    employeeJMBG: PropTypes.string.isRequired,
};

export default TabsComponent;
