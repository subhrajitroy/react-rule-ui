import React from "react"
import Autocomplete from "./Autocomplete"

class Rule extends React.Component{
    
    constructor(props){
        super(props)
        this.handleDeleteRule = this.handleDeleteRule.bind(this)
        this.cKey = this.props.cKey;
        this.id = this.props.cKey;
    }

    handleDeleteRule(e){
        console.log("$ key is " + this.key)
        console.log("$ key is " + this.props.cKey)
        this.props.deleteRule(this.props.cKey);
    }
    
    render(){
        return (
            <div className='rule'>
                <div>
                    <Autocomplete value="Type here" />
                    </div>
                        <div>
                            <select name='operators' id='operators'>
                                <option>=</option>
                            </select>
                        </div>
                    <div>
                    <Autocomplete value="Type here" />
                </div>
                <div>
                    <button name='remove' onClick={this.handleDeleteRule}>Remove</button>
                </div>
            </div>
        )
    }
}

export default Rule