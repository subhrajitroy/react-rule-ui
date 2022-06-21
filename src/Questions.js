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
        this.handleProductSelection = this.handleProductSelection.bind(this);
        this.state = {questions:[],selectedProduct:0};
    }

    componentDidMount(){
        this.createProductsList();
        this.createQuestionsList(this.state.selectedProduct);
        
    }

    createProductsList() {
        fetch("http://localhost:8080/api/v1/products")
            .then(r => r.json())
            .then(r => {
                let list = r.map(x => { return <option key={x.Id} value={x.Id}>{x.name}</option>; });
                list.push(<option key={0} value={0}>{"Select Product"}</option>);
                list = list.reverse();
                return list;
            })
            .then(list => {
                this.setState({ options: list });
            });
    }

    createQuestionsList(productId) {
        let url = "http://localhost:8080/api/v2/questions/" + productId;
        console.log("Selected product is " + this.state.selectedProduct);

        fetch(url).then(r => r.json())
            .then(r => {
                console.log("questions are " + JSON.stringify(r));
                let questionList = [];
                let qs = r.questions;
                console.log("Questions are " + JSON.stringify(r));
                for (let i in qs) {
                    let q = qs[i];
                    questionList.push(<Question key={q.id} callback={this.callback} question={q.questionText} questionType={q.type} path={q.path} />);
                }
                this.setState({ questions: questionList });
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
    handleProductSelection(e){
        let productId = e.target.value;
        this.setState({selectedProduct:e.target.value});
        this.createQuestionsList(productId);
        console.log("Selected " + productId)
    }

    render(){
        return (
            <div>
                <div><select onChange={this.handleProductSelection}>{this.state.options}</select></div>
                <div className="questions">
                    <div>{this.state.questions}</div>
                </div>
            </div>
        );
    }
}

export default Quesions;