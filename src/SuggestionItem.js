import React from "react";

class SuggestionItem extends React.Component{
    constructor(props){
        super(props)
        this.style = props.style;
        this.value = props.value;
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e){
        this.props.onSuggestionClick(this.props.value);
    }

    render(){
        return ( 
        <div style={this.style} onClick={this.handleClick} >
            <span>{this.value}</span>
        </div>)
    }
}

export default SuggestionItem
