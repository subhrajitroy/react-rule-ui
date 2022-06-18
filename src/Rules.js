import React from "react";
import Rule from "./Rule";
import { v4 as uuidv4 } from 'uuid';

class Rules extends React.Component{
    constructor(props){
        super(props)
        this.handleRuleAdd = this.handleRuleAdd.bind(this);
        this.handleRuleDelete = this.handleRuleDelete.bind(this);

        let key = uuidv4();
        this.state = {rules:[<Rule key={key} id={key} deleteRule={this.handleRuleDelete}/>],count:1};
    }

    handleRuleAdd(e){
        let key = uuidv4();
        this.setState({
            rules: [...this.state.rules, <Rule key={key} id={key} deleteRule={this.handleRuleDelete}/>],
          });
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
            </div>
            
        );
    }
}

export default Rules