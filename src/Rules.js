import React from "react";
import Rule from "./Rule";
import { v4 as uuidv4 } from 'uuid';
import {_} from "./JsonUtils";


class Rules extends React.Component{
    constructor(props){
        super(props)
        this.handleRuleAdd = this.handleRuleAdd.bind(this);
        this.handleRuleDelete = this.handleRuleDelete.bind(this);
        this.handleSaveRule = this.handleSaveRule.bind(this);
        this.applyRule = this.applyRule.bind(this);
        this.rulesList = [];
        let key = uuidv4();
        this.state = {rules:[<Rule key={key} id={key} saveRule={this.handleSaveRule} 
            deleteRule={this.handleRuleDelete}/>],savedRules:[],rightPaneValue:"Hello World",leftPaneValue:"Add json to test"};
    }

    handleRuleAdd(e){
        let key = uuidv4();
        this.setState({
            rules: [...this.state.rules, <Rule key={key} id={key} saveRule={this.handleSaveRule} deleteRule={this.handleRuleDelete}/>],
          });
    }

    handleSaveRule(rule){
        console.log("Saving rule " + JSON.stringify(rule));
        this.setState({
            savedRules: [...this.state.savedRules,rule],
          });
        this.rulesList.push(rule)
        
        console.log(JSON.stringify(this.rulesList));
    }

    handleLeftPaneValueChange(e){
        this.setState({leftPaneValue:e.target.value})
    }

    applyRule(){
        
        let jsonValue = JSON.parse(document.getElementById("jsonInput").value);
        let mappedValue = {};
        for(let i in this.rulesList){
            let rule = this.rulesList[i];
            let valToSet = _.get(jsonValue,rule.left);
            console.log("Old value " + JSON.stringify(mappedValue))
            mappedValue = _.set(mappedValue,rule.right,valToSet);
            console.log("New value " + JSON.stringify(mappedValue))
        }
        
        console.log(mappedValue);
        this.setState({rightPaneValue:JSON.stringify(mappedValue)});
    }

    
/**
 * 
 * @param {*} ruleToDelete 
 * Not sure why we can access id of rule passed (but not its key) but not of those in the list.
 */
    handleRuleDelete(ruleToDelete){
        console.log(ruleToDelete.id);
        this.state.rules.forEach(r => console.log(r.key));
        let remaining = this.state.rules.filter(r =>  r.key !== ruleToDelete.id);
        this.setState({
            rules: remaining,
          });
    }

    render(){
        return (
            <div>
                <button name='add' className='add_button' onClick={this.handleRuleAdd}>Add</button>
                <div className='rule_row'>
                    {this.state.rules}
                </div>
                <div className="test">
                    <div className="left_pane">
                        <textarea id="jsonInput"></textarea>
                        <button onClick={this.applyRule}>Apply</button>
                    </div>
                    <div className="right_pane">
                        <textarea value={this.state.rightPaneValue} readOnly></textarea>
                    </div>
                </div>
            </div>
            
        );
    }
}

export default Rules