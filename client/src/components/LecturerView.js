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
            lecturer:'sub',
            info:[]
        }

        this.loadFiles = this.loadFiles.bind(this);
    }

    componentDidMount() {
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

    loadFiles() {



    }



    deleteFile(event) {
        event.preventDefault();
        const id = event.target.id;

        fetch('/api/files/'+id, {
            method: 'DELETE'
        }).then(res => res.json())
            .then(response => {
                console.log(response);
                if (response.success) this.loadFiles()
                else alert('Delete Failed');
            })

        axios.delete('http://localhost:3001/api/delete/'+id).then(
            res=>{

                console.log()
            }
        )
    }



    render() {
        const { files } = this.state;
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h1 className="App-title">Welcome to React</h1>
                </header>
                <div className="App-content">

                    <table className="App-table">
                        <thead>
                        <tr>
                            <th>File</th>

                            <th>Action</th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.state.info.map((obj, index) => {

                            return (
                                <tr key={index}>
                                    <td><a href={`http://localhost:3001/api/files/${obj.filename}`}>{obj.filename}</a></td>

                                    <td><button onClick={this.deleteFile.bind(this)} id={obj.filename}>Remove</button></td>
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
