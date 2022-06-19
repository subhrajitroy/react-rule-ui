import React from "react";
import SuggestionItem  from "./SuggestionItem";
import { flatten } from 'flatten-anything';


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

    componentDidMount(){
        fetch("http://localhost:8080/api/v1/address/a1")
        .then(r => r.json())
        .then(r => flatten(r))
        .then(r => {
            this.setState({"suggestions":Object.keys(r)})    
            console.log(r)
        }
        )
    }

    handleChange(e){
        let value = e.target.value;
        this.setState({value:e.target.value})
        console.log(value);
        let keys = this.state.suggestions;
        let filteredKeys = keys.filter(k => k.startsWith(value));
        console.log(filteredKeys);
        let newSuggestions = [];
        for(let idx in filteredKeys){
            let newelement = <SuggestionItem style={this.autoCompleteStyle} 
                                onSuggestionClick={this.handleSuggestionClick}
                                value={filteredKeys[idx]} key={filteredKeys[idx]}/>
            newSuggestions.push(newelement);
        }
        
        this.setState({suggestionList:newSuggestions})
    }

    handleFocus(e){
        console.log(this.firstInput);
        console.log(e.target.value);
        if(this.firstInput){
            this.setState({value:""});
            this.firstInput = false;
        }
    }

    handleSuggestionClick(suggestedValue){
        this.setState({value:suggestedValue,suggestionList:[]});
        this.props.callback(this.props.position,suggestedValue);
    }

    
    render(){
        return (
            <div className="container">
                <div className="left">
                    <input type='text' 
                    size={50}
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