import React from "react";
import {_} from './JsonUtils'

class Question extends React.Component{
    constructor(props){
        super(props);
        this.questionSelected = this.questionSelected.bind(this);
    }

    questionSelected(e){
        this.props.callback(e.target.value,e.target.checked);
    }

    render(){
        return (<div>
            <input type={"text"} value={this.props.question} readOnly/>
            <input type={"text"} value={this.props.questionType} readOnly/>
            <input value={this.props.path} type={"checkbox"} onChange={this.questionSelected}/>
        </div>)

    }
}

class Quesions extends React.Component{
    constructor(props){
        super(props);
        this.callback = this.callback.bind(this);
        this.paths = [];
        this.schema = {}
        this.state = {questions:[
        <Question key={1} callback={this.callback} question={"Name ?"} questionType={"text"} path="root.name"/>,
        <Question key={10} callback={this.callback} question={"Email ?"} questionType={"text"} path="root.contact.email"/>,
        <Question key={2} callback={this.callback} question={"Age ?"} questionType={"text"} path="root.age"/>,
        <Question key={3} callback={this.callback} question={"Phone ?"} questionType={"text"} path="root.contact.phone"/>]}
    }

    callback(path,seleted){
        if(seleted){
           this.paths.push(path);
        }
        else{
            this.paths = this.paths.filter(p => p !== path);
        }
        this.schema = {};
        this.paths.forEach(p => this.schema = _.set(this.schema,p,""));
        console.log("<>" + JSON.stringify(this.schema));
        this.props.callback(this.schema);
    }

    render(){
        return (<div className="questions">
                <div>{this.state.questions}</div>
                
            </div>);
    }
}

export default Quesions;