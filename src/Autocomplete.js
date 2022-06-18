import React from "react";
import SuggestionItem  from "./SuggestionItem"

class Autocomplete extends React.Component{
    constructor(props){
        super(props);
        this.firstInput = true;
        this.autoCompleteStyle = {
            "padding": "2px",
            "cursor": "pointer",
            "backgroundColor": "#fff",
            "borderBottom": "1px solid #d4d4d4"
            };
       this.state ={suggestionList:[],value:props.value};
       this.handleChange = this.handleChange.bind(this);
       this.handleFocus = this.handleFocus.bind(this);
       this.handleSuggestionClick = this.handleSuggestionClick.bind(this);
    }
    handleChange(e){
        let value = e.target.value;
        this.setState({value:e.target.value})
        console.log(value);
        let newelement = <SuggestionItem style={this.autoCompleteStyle} 
                                onClick={this.handleSuggestionClick}
                                value={value} key={value}/>
        this.setState(prevState=>({suggestionList:[...prevState.suggestionList,newelement]}))
    }

    handleFocus(e){
        console.log(this.firstInput);
        console.log(e.target.value);
        if(this.firstInput){
            this.setState({value:""});
            this.firstInput = false;
        }
    }

    handleSuggestionClick(e){
        console.log(e.target)
        this.setState({value:e.target.value});
    }

    
    render(){
        return (
            <div className="container">
                <div className="left">
                    <input type='text' 
                    onChange={this.handleChange} 
                    onFocus={this.handleFocus}
                    value={this.state.value}/>
                    <div id='list'>
                        {this.state.suggestionList}
                    </div>
                </div>
            </div>
        )
    }
}
  
  export default Autocomplete