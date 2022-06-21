import React from "react"
import Autocomplete from "./Autocomplete"

class Rule extends React.Component{
    
    constructor(props){
        super(props)
        this.handleDeleteRule = this.handleDeleteRule.bind(this)
        this.handleSaveRule = this.handleSaveRule.bind(this)
        this.handleSuggestionSelected = this.handleSuggestionSelected.bind(this)
        this.id = this.props.id;
        this.rule = {"id":this.id};
        console.log("Schema is " + JSON.stringify(this.props.schema));
    }

    handleDeleteRule(e){
        this.props.deleteRule(this);
    }

    handleSaveRule(e){
        this.rule.operator = "=";
        console.log(JSON.stringify(this.rule));
        this.props.saveRule(this.rule);
    }

    handleSuggestionSelected(position,value){
        console.log("saved " + position + " " + value);
        this.rule[position] = value;
        // this.handleSaveRule();
    }
    
    render(){
        return (
            <div className='rule'>
                <div>
                    <Autocomplete schema={this.props.schema} value="Type here" position={"left"} callback={this.handleSuggestionSelected}/>
                    </div>
                        <div>
                            <select name='operators' id='operators'>
                                <option>=</option>
                            </select>
                        </div>
                    <div>
                    <Autocomplete value="Type here" position={"right"} callback={this.handleSuggestionSelected}/>
                </div>
                <div>
                    <button name='save' onClick={this.handleSaveRule}>Save</button>
                </div>
                <div>
                    <button name='remove' onClick={this.handleDeleteRule}>Remove</button>
                </div>
            </div>
        )
    }
}

export default Rule