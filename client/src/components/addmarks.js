import React, { Component } from 'react';
import logo from '../logo.svg';
import '../style/App.css';
import axios from 'axios'


class addmarks extends Component {
    constructor(props) {
        super(props);

        this.state = {
            files: [],
            file: '',
            lecturer:'sub1',
            info:[],
            filterValue:'',
            filterValue1:'',
            filterinfo:[],
            ainfo:[],
            finfo:[],
            marks:[],
            getmarks:[],
            mark:'',
            x:'',
            addedmarks:'',
            filterValue2:'',
            filterValue3:'',
            filterValue4:'',
            minfo:[],
            stuinfo:[],
            gmark:[]



        }

        this.loadFiles = this.loadFiles.bind(this);
        this.handleFilter = this.handleFilter.bind(this);
        this.handleFilter1 = this.handleFilter1.bind(this);
        this.filterclick = this.filterclick.bind(this);
        this.handlemarks=  this.handlemarks.bind(this);
        this.viewmarks=this.viewmarks.bind(this);
        this.addmark=this.addmark.bind(this);
        this.handleFilter2 = this.handleFilter2.bind(this);
        this.handleFilter3 = this.handleFilter3.bind(this);
        this.handlestu = this.handlestu.bind(this);
        this.deletemark=this.deletemark.bind(this);
        this.editmark=this.editmark.bind(this);

        //this.added = this.added.bind(this);




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

        axios.get('http://localhost:3001/api/lecassview/'+e.target.value+'/'+this.state.filterValue).then(res => {

            console.log(res.data)
            this.setState({

                stuinfo: res.data
            })

            console.log(this.state.finfo)

        }).catch(err => {

            console.log(err)
        })

    }

    handleFilter3(e){



        this.setState({
            filterValue3:e.target.value
        },()=>{
            console.log(this.state.filterValue3)

        })


    }


    handleFilter2(e){

        this.setState({
            filterValue2:e.target.value
        },()=>{

            axios.get("http://localhost:3001/api/assview/"+this.state.filterValue2).then(res=>{

                console.log(res.data)
                this.setState({

                    minfo:res.data
                })
            })

        })

    }

    filterclick(){

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




    handlemarks(e)
    {

        this.setState({


            mark:e.target.value
        })

    }

    viewmarks(){



        axios.get('http://localhost:3001/marks/get/'+this.state.filterValue2+'/'+this.state.filterValue3).then(res => {

            console.log(res)
            this.setState({

                marks: res.data
            })

            console.log(this.state.marks)

        }).catch(err => {

            console.log(err)
        })
    }

    handlestu(){

        axios.get('http://localhost:3001/api/lecassview/'+this.state.filterValue1+'/'+this.state.filterValue).then(res => {

            console.log(res)
            this.setState({

                stuinfo: res.data
            })

            console.log(this.state.finfo)

        }).catch(err => {

            console.log(err)
        })

    }
    deletemark(e){

        alert(e.target.id)

        axios.get('http://localhost:3001/marks/delete/'+e.target.id).then(res => {

        }).catch(err => {

            console.log(err)
        })

       this.viewmarks()

    }

    editmark(e){


        this.props.history.push('/editmarks/'+e.target.id)
    }


    addmark(e){


        let x=e.target.id
        this.setState({

            getmark:this.state.gmark.concat([e.target.value])
        })
        alert(e.target.id)

        const obj={

            mark:this.state.mark,
            subject:this.state.filterValue,
            name:this.state.filterValue1,
            student:e.target.id
        }


        axios.post("http://localhost:3001/marks/add",obj).then(res=>{

            console.log(res)
        }).catch(err=>{

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
                        <option>Select the Course</option>
                        <option>All</option>

                        {this.state.info.map((obj)=>{
                            return(
                                <option>{obj.subject}</option>
                            )
                        })}

                    </select>

                    <button onClick={this.filterclick}>Search Assignment</button>
                </div>
                <div>
                    <select value={this.state.student} onChange={this.handlestu}>
                        <option>Select the Student</option>
                        <option>All</option>

                        {this.state.stuinfo.map((obj)=>{
                            return(
                                <option>{obj.student}</option>
                            )
                        })}

                    </select>


                </div>
                <div className="Aapp-content">

                    <table  className="App-table">
                        <thead>


                            <th>Student</th>
                            <th>marks</th>


                        </thead>
                        <tbody>
S
                        {this.state.finfo.map((obj, index) => {

           return (

                                <tr key={index}>
                                    
                                    <td>{index}</td>
                                    <td>{obj.student}</td>
                                    <td><input type='text' onChange={this.handlemarks}  value={this.state.gmark[index]}></input></td>
                                    <td><button onClick={this.addmark} id={index}>Add</button></td>

                                </tr>
                            )

                        })}
                        </tbody>
                    </table>

                </div>

                <div>
                    <p>Marks View</p>
                    <div>
                        <select value={this.state.filterValue3} onChange={this.handleFilter3}>
                            <option>Select the Assignment</option>
                            <option>All</option>

                            {this.state.minfo.map((obj)=>{
                                return(
                                    <option>{obj.name}</option>
                                )
                            })}

                        </select>
                    </div>

                    <div>
                        <select value={this.state.filterValue2} onChange={this.handleFilter2}>
                            <option>Select the Course</option>
                            <option>All</option>

                            {this.state.info.map((obj)=>{
                                return(
                                    <option>{obj.subject}</option>
                                )
                            })}

                        </select>

                        <div className="Aapp-content">

                            <table  className="App-table">
                                <thead>


                                <th>Student</th>
                                <th>marks</th>


                                </thead>
                                <tbody>

                                {this.state.marks.map((obj, index) => {

                                    return (

                                        <tr key={index}>
                                            <td>{obj.student}</td>
                                            <td>{obj.mark}</td>
                                            <td><button onClick={this.deletemark} id={obj._id} >Delete</button></td>
                                            <td><button onClick={this.editmark} id={obj._id}  >Edit</button></td>

                                        </tr>
                                    )

                                })}
                                </tbody>
                            </table>
                            <td><button onClick={this.viewmarks} >Search</button></td>





                        </div>

                    </div>

                </div>
            </div>
        );


    }


}

export default addmarks;
