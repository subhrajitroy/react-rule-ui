import React from "react";

class Products extends React.Component{
    
    constructor(props){
        super(props);
        this.state = {options:[]}
        this.handleProductSelection = this.handleProductSelection.bind(this);
    }

    componentDidMount(){
        fetch("http://localhost:8080/api/v1/products")
        .then(r => r.json())
        .then(r => {
            return r.map(x => {return <option key={x.Id} value={x.Id}>{x.name}</option> })
        })
        .then(list => {
            this.setState({options:list});
        });
    }

    handleProductSelection(e){
        this.props.callback(e.target.value);
    }
    
    render(){
        return (
        <div>
            <div><select onChange={this.handleProductSelection}>{this.state.options}</select></div>
            
        </div>)
    }
 }

 export default Products;