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
            deadlinedate:'20/12/2017',
            deadlinetime:'23:20:11',
            name:'n',
            subject:'sub',
            lecturer:'l',
            student:'stu',
            filename:'',
            uploadeddate:'',
            uploadtime:'',
            late:'',

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

        let newDate = new Date()
        let date = newDate.getDate();

        console.log(this.state.deadlinedate.indexOf('/')+1);
        console.log(this.state.deadlinedate.substring(0,this.state.deadlinedate.indexOf('/')));

        let slate=this.state.deadlinedate.substring(0,this.state.deadlinedate.indexOf('/'))
        let stmeh=this.state.deadlinetime.substring(0,this.state.deadlinetime.indexOf(':'))
        let stmem=this.state.deadlinetime.substring(this.state.deadlinetime.indexOf(':'),this.state.deadlinetime.indexOf(':'))
        console.log(stmem)

        if((slate-date)>=0){

            //alert("Not a Late submission")
            this.setState({

                late:"Not a Late submission"

            })
        }
        else{

            alert(slate-date)
            this.setState({

                late:(slate-date)

            })
        }

        alert(this.state.late)





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

                        let newDate = new Date()
                        let date = newDate.getDate();
                        let month = newDate.getMonth()+1;
                        let year = newDate.getFullYear();

                        var hours = new Date(). getHours(); //Current Hours.
                        var min = new Date(). getMinutes(); //Current Minutes.
                        var sec = new Date(). getSeconds(); //Current Seconds
                        const obj = {


                            name: this.state.name,
                            subject: this.state.subject,
                            lecturer: this.state.subject,
                            student: this.state.student,
                            filename: this.state.file.name,
                            deadlinedate:this.state.deadlinedate,
                            deadlinetime:this.state.deadlinetime,

                            uploadedate:  date+'/'+ month+'/'+year,
                            uploadtime:  hours+'/'+ min+'/'+sec,
                            late:this.state.late
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
