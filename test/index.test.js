const chai = require('chai');
const chaiHttp = require('chai-http');
const fs = require('fs');
const path = require('path');

let server = require('../index');
let should = chai.should();
let expect = chai.expect();
chai.use(chaiHttp);
let newFile;

describe('Files', () => {
  describe('GET /api/files', () => {
    it('should get all the files', (done) => {
      chai.request(server)
        .get('/api/files')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          done();
        });
    })
  })

  describe('POST /api/files', () => {
    it('should create a new file', (done) => {
      chai.request(server)
        .post('/api/files')
        .attach('file', fs.readFileSync(path.join(__dirname, '/testing.txt')), "testing.txt")
        .end((err, res) => {
          if (err) done(err);
          res.should.have.status(200);
          res.should.be.json;
          newFile = res.body.file;
          done();
        });
    })
  })

  describe('GET /api/file/:filename', () => {
    it('should find file', (done) => {
      chai.request(server)
        .get('/api/files/'+newFile.filename)
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    })
  })

  describe('DELETE /api/file/:filename', () => {
    it('should remove file', (done) => {
      chai.request(server)
        .delete('/api/files/'+newFile._id)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('success').equal(true);
          done();
        });
    })
  })
});
