import React from "react";

class SuggestionItem extends React.Component{
    constructor(props){
        super(props)
        this.style = props.style;
        this.value = props.value;
        this.handleClick = props.handleClick;
    }

    render(){
        return ( 
        <div style={this.style} onClick={this.handleClick}>
            <span>{this.value}</span>
        </div>)
    }
}

export default SuggestionItem
