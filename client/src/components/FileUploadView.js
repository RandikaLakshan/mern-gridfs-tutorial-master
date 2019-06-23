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
            deadlinedate:"20/12/2018",
            deadlinetime:'23:20:11',
            name:'n2',
            subject:'sub2',
            lecturer:'l11',
            student:'stu1',
            filename:'',
            uploadeddate:'',
            uploadtime:'',
            late:'OK',
            info:[],
            sizealert:'',
            namealert:'',
            ofilename:''

        }

        this.loadFiles = this.loadFiles.bind(this);
    }

    componentDidMount() {


        this.loadFiles();

    }

    loadFiles() {



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
        let month = newDate.getMonth()+1;
        let year = newDate.getFullYear();

        var hours = new Date(). getHours(); //Current Hours.
        var min = new Date(). getMinutes(); //Current Minutes.
        var sec = new Date(). getSeconds(); //Current Seconds

        if(date<10){
            date='0'+date;
        }
        if(month<10){
            month='0'+month;
        }
        if(hours<10){
            hours='0'+hours;
        }
        if(min<10){
            min='0'+min;
        }

        let sud=+year+'/'+month+'/'+date
        let sut=+hours+':'+min+':'+sec

        alert(date+month+year)

       // console.log(this.state.deadlinedate.indexOf('/')+1);
       // console.log(this.state.deadlinedate.substring(0,this.state.deadlinedate.indexOf('/')));
        //console.log(this.state.deadlinedate.substring(0,this.state.deadlinedate.indexOf('/')));



        let ldd=(this.state.deadlinedate.replace("/","").replace("/",""))
        let ldt=(this.state.deadlinetime.replace(":","").replace(":",""))

        let lud=(sud.replace("/","").replace("/",""))
        let lut=(sut.replace(":","").replace(":",""))



        if(ldd>lud){

            this.setState({

                late:("Late Submission before  "+(ldd-lud)+" days")
            },()=>{

                alert("Late Submission before   "+(ldd-lud+" days"))
            })
        }

         else if(lud>ldd){

            this.setState({

                late:'Uploaded before   '+(lud-ldd)+"  days"
            },()=>{

                alert("OK!")
            })
        }






            axios.get('http://localhost:3001/api/checkview/' + this.state.file.name).then(
                res => {
                    console.log(res)
                    this.setState({

                        info: res.data
                    })

                    if (this.state.info == '') {

                        if ((this.state.file.size / 1024) < 10240) {
                            let data = new FormData();
                            data.append('file', this.state.file);

                            fetch('/api/files', {
                                method: 'POST',
                                body: data
                            }).then(res => res.json())
                                .then(data => {

                                    if (data.success) {
                                        axios.get("http://localhost:3001/api/getlast").then(res1=>{

                                console.log(res1.data.filename)
                                            this.setState({

                                                ofilename:res1.data.filename
                                            })
                                            console.log(res1.data.ofilename)
                                            if(date<10){
                                                date='0'+date;
                                            }
                                            if(month<10){
                                                month='0'+month;
                                            }
                                            if(hours<10){
                                                hours='0'+hours;
                                            }
                                            if(min<10){
                                                min='0'+min;
                                            }
                                            const obj = {


                                                name: this.state.name,
                                                subject: this.state.subject,
                                                lecturer: this.state.lecturer,
                                                student: this.state.student,
                                                uname: this.state.file.name,
                                                deadlinedate: this.state.deadlinedate,
                                                deadlinetime: this.state.deadlinetime,
                                                uploadedate: year + '/' + month + '/' + date,
                                                uploadtime: hours + ':' + min + ':' + sec,
                                                late: this.state.late,
                                                filename:this.state.ofilename
                                            }


                                            axios.post('http://localhost:3001/api/add', obj).then(
                                                res => {console.log(res.data)

                                                    this.setState({

                                                        status:"Uploaded Successfully",
                                                        namealert:'',
                                                        sizealert:''

                                                    })}
                                            ).catch(err => {
                                                    console.log(err)
                                                }
                                            )



                                        }).catch(err1=>{
                                                    console.log(err1)
                                                }
                                            )

                                        console.log(data)
                                    } else {
                                        alert('Upload failed');
                                    }
                                });

                            //let x=this.state.file.uploadDate
                            console.log(this.state.file.lastModifiedDate)

                            let newDate = new Date()
                            let date = newDate.getDate();
                            let month = newDate.getMonth() + 1;
                            let year = newDate.getFullYear();

                            var hours = new Date().getHours(); //Current Hours.
                            var min = new Date().getMinutes(); //Current Minutes.
                            var sec = new Date().getSeconds(); //Current Seconds

                        } else {

                            this.setState({
                               sizealert:'Select a File size < 10MB'
                            })

                            alert(this.state.sizealert);
                        }
                    } else {
                        this.setState({
                            namealert:'Already has a Same same!'
                        })

                        alert(this.state.namealert);
                    }

                }
            ).catch(err => {

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

                    <h2>{this.state.namealert}</h2>
                    <h2>{this.state.sizealert}</h2>
                    <h2>{this.state.status}</h2>


                </div>
            </div>
        );
    }
}

export default FileUploadView;
