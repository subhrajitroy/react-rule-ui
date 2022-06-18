import React from "react";
import Rule from "./Rule";

class Rules extends React.Component{
    constructor(props){
        super(props)
        this.handleRuleAdd = this.handleRuleAdd.bind(this);
        this.handleRuleDelete = this.handleRuleDelete.bind(this);
        this.state = {rules:[<Rule cKey={1} deleteRule={this.handleRuleDelete}/>],count:1};
    }

    handleRuleAdd(e){
        let currentCount = this.state.cKey + 1;
        this.setState({
            rules: [...this.state.rules, <Rule cKey={currentCount} deleteRule={this.handleRuleDelete}/>],
            count:currentCount
          });
    }

    handleRuleDelete(key){
        console.log("key is" + key);

        console.log( this.state.rules.length);
        this.state.rules.forEach(r => console.log(r.id))
        let remaining = this.state.rules.filter(r => r.id !== key);
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