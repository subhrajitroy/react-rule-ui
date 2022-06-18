import React from "react"
import Autocomplete from "./Autocomplete"

class Rule extends React.Component{
    
    constructor(props){
        super(props)
        this.handleDeleteRule = this.handleDeleteRule.bind(this)
        this.id = this.props.id;
    }

    handleDeleteRule(e){
        this.props.deleteRule(this);
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