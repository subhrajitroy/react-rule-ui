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
            <input size={50} type={"text"} value={this.props.question} readOnly/>
            <input size={50} type={"text"} value={this.props.questionType} readOnly/>
            <input size={50} value={this.props.path} type={"checkbox"} onChange={this.questionSelected}/>
        </div>)

    }
    
}

class Quesions extends React.Component{
    constructor(props){
        super(props);
        this.callback = this.callback.bind(this);
        this.paths = [];
        this.schema = {};
        this.state = {questions:[],selectedProduct:this.props.selectedProduct};
    }

    componentDidMount(){
        let url = "http://localhost:8080/api/v2/questions/" +  this.state.selectedProduct;
        console.log("Selected product is " + this.state.selectedProduct);

        fetch(url).then(r => r.json())
        .then(r => {
             console.log("questions are " + JSON.stringify(r));
             let questionList = [];
             let qs = r.questions;
             console.log("Questions are " + JSON.stringify(r));
             for(let i in qs){
                 let q = qs[i];
                 questionList.push(<Question key={q.id} callback={this.callback} question={q.questionText} questionType={q.type} path={q.path}/>);
             }
             this.setState({questions:questionList});
         });
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
        this.props.callback(this.schema);
    }

    render(){
        return (
            <div>
                <div className="questions">
                    <div>{this.state.questions}</div>
                </div>
            </div>
        );
    }
}

export default Quesions;