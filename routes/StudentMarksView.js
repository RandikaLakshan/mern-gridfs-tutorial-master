import React, { Component } from 'react';
import axios from 'axios'


class MarksEdit extends Component {
    constructor(props) {
        super(props);

        this.state={

            subject1:"",
            assignment1:'',
            studen1t:"",
            mark1:''
        }

        this.updateClick=this.updateClick.bind(this)
        this.changeMark=this.changeMark.bind(this)
        //this.added = this.added.bind(this);




    }

    componentDidMount() {

        axios.get( "http://localhost:3001/marks/get/"+this.props.match.params.id).then(res=>{

            this.setState({

                subject1:res.data.subject,
                assignment1:res.data.name,
                student1:res.data.student,
                mark1:res.data.mark

            })





        })



    }


    updateClick(){


        axios.post('http://localhost:3001/marks/updatemarks/'+this.props.match.params.id+'/'+this.state.mark1).then(res => {

            console.log(res.data)
        }).catch(err => {

            console.log(err)
        })
    }

    changeMark(e){

        this.setState({

            mark1:e.target.value
        })
    }



    render() {

        return (
            <div>



                <p> Name: </p>
                <p>{this.state.assignment1}</p>

                <p> Student  :</p>
                <p>{this.state.student1}</p>
                <input type='text' onChange={this.changeMark}value={this.state.mark1}></input>
                <button onClick={this.updateClick}>Edit $ Save</button>


            </div>
        )
    }


}

export default MarksEdit;
