import React, { Component } from 'react';
import logo from '../logo.svg';
import '../style/App.css';
import axios from 'axios'

class FileUploadView extends Component {
    constructor(props) {
        super(props);

        this.state = {
            files: [],
            file: '',
            deadline:'111',
            name:'n',
            subject:'sub',
            lecturer:'l',
            student:'stu',
            filename:'',
            uploadeddate:'',
            info:[]
        }

        this.loadFiles = this.loadFiles.bind(this);
    }

    componentDidMount() {
        this.loadFiles();
    }

    loadFiles() {
        fetch('/api/files')
            .then(res => res.json())
            .then(files => {
                if (files.message) {
                    console.log('No Files');
                    this.setState({ files: [] })
                } else {
                    this.setState({ files })
                }
            });
    }

    fileChanged(event) {
        const f = event.target.files[0];
        this.setState({
            file: f
        });
    }


    uploadFile(event) {
        event.preventDefault();

        axios.get('http://localhost:3001/api/checkview/'+this.state.file.name).then(
            res=>{
                console.log(res)
                this.setState({

                    info:res.data
                })

                if(this.state.info==''){

                    if((this.state.file.size/1024)<10240) {
                        let data = new FormData();
                        data.append('file', this.state.file);

                        fetch('/api/files', {
                            method: 'POST',
                            body: data
                        }).then(res => res.json())
                            .then(data => {
                                if (data.success) {
                                    this.loadFiles();
                                } else {
                                    alert('Upload failed');
                                }
                            });

                        //let x=this.state.file.uploadDate
                        console.log(this.state.file.lastModifiedDate)
                        const obj = {


                            name: this.state.name,
                            subject: this.state.subject,
                            lecturer: this.state.subject,
                            student: this.state.student,
                            filename: this.state.file.name,
                            uploadedate: this.state.file.lastModifiedDate.toLocaleDateString() + "    " + this.state.file.lastModifiedDate.toLocaleTimeString()
                        }

                        axios.post('http://localhost:3001/api/add', obj).then(
                            res => console.log(res.data)
                        ).catch(err => {
                                console.log(err)
                            }
                        )
                    }

                    else{

                        alert("Select >10MB file please! ");
                    }
                }

                else{

                    alert("Same file exists!")
                }

            }
        ).catch(err=>{

            console.log(err);
        })






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
                    <input type="file" onChange={this.fileChanged.bind(this)}/>
                    <button onClick={this.uploadFile.bind(this)}>Upload</button>

                </div>
            </div>
        );
    }
}

export default FileUploadView;
