import React, { Component } from 'react';
import logo from '../logo.svg';
import '../style/App.css';
import axios from 'axios'


class StudentView extends Component {
    constructor(props) {
        super(props);

        this.state = {
            files: [],
            file: '',
            lecturer:'l11',
            info:[],
            filterValue:'',
            filterValue1:'',
            filterinfo:[],
            ainfo:[],
            finfo:[]


        }

        this.loadFiles = this.loadFiles.bind(this);
        this.handleFilter = this.handleFilter.bind(this);
        this.handleFilter1 = this.handleFilter1.bind(this);
        this.filterclick = this.filterclick.bind(this);

    }

    componentDidMount() {


        this.loadFiles();


    }

    loadFiles() {

        axios.get('http://localhost:3001/api/lecview/'+this.state.lecturer)
            .then(response => {

                console.log(response.data)
                this.setState({
                    info:response.data
                })
                console.log(this.state.info)
            })
            .catch(function (error) {
                console.log(error);
            })

    }





    deleteFile(event) {
        event.preventDefault();
        const id = event.target.id;


        axios.delete('http://localhost:3001/api/delete/'+id).then(
            res=>{

                console.log()
               this.filterclick()




            }

        )


    }

    handleFilter(e){

        this.setState({
            filterValue:e.target.value
        },()=>{
            console.log(this.state.filterValue)
            console.log(this.state.filterValue1)
            axios.get("http://localhost:3001/api/assview/"+this.state.filterValue).then(res=>{

                console.log(res.data)
                this.setState({

                    ainfo:res.data
                })
            })

        })






}
    handleFilter1(e){

        this.setState({
            filterValue1:e.target.value
        },()=>{
            console.log(this.state.filterValue1)

        })

    }

    filterclick(e){


/*if(this.state.filterValue=='All'){

    this.loadFiles();
}*/
    console.log(this.state.filterValue)
    console.log(this.state.filterValue1)

    axios.get('http://localhost:3001/api/lecassview/'+this.state.filterValue1+'/'+this.state.filterValue).then(res => {

        console.log(res)
        this.setState({

            finfo: res.data
        })

        console.log(this.state.finfo)

    }).catch(err => {

        console.log(err)
    })

}
    render() {



        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h1 className="App-title">Welcome to React</h1>
                </header>

                <div>
                    <select value={this.state.filterValue1} onChange={this.handleFilter1}>
                        <option>Select the Assignment</option>
                        <option>All</option>

                        {this.state.ainfo.map((obj)=>{
                            return(
                                <option>{obj.name}</option>
                            )
                        })}


                    </select>


                </div>

                <div>
                    <select value={this.state.filterValue} onChange={this.handleFilter}>
                        <option>Select the Assignment</option>
                        <option>All</option>

                        {this.state.info.map((obj)=>{
                            return(
                                <option>{obj.subject}</option>
                            )
                        })}

                    </select>

                    <button onClick={this.filterclick}>Search Assignment</button>
                </div>
                <div className="Aapp-content">

                    <table className="App-table">
                        <thead>
                        <tr>
                            <th>File</th>
                            <th>Assignment</th>
                            <th>Subject</th>
                            <th>Student</th>
                            <th>Uploaded Date</th>
                            <th>Uploaded Time</th>
                            <th>Deadline  Date</th>
                            <th>Deadline Time</th>



                            <th>Action</th>

                            <th></th>
                        </tr>
                        </thead>
                        <tbody>

                        {this.state.finfo.map((obj, index) => {

                            return (

                                <tr key={index}>

                                    <td><a href={`http://localhost:3001/api/files/${obj.filename}`}>{obj.uname}</a></td>
                                    <td>{obj.name}</td>
                                    <td>{obj.subject}</td>
                                    <td>{obj.student}</td>
                                    <td>{obj.uploadedate}</td>
                                    <td>{obj.uploadtime}</td>
                                    <td>{obj.deadlinedate}</td>
                                    <td>{obj.deadlinetime}</td>
                                    <td><button onClick={this.deleteFile.bind(this)} id={obj.filename}>Delete</button></td>
                                </tr>
                            )
                        })}
                        </tbody>
                    </table>
                </div>
            </div>
        );


    }


}

export default StudentView;
