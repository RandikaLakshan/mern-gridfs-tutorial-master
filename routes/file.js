const router = require('express').Router();
const multer  = require('multer');
const { mongo, connection } = require('mongoose');
const Grid = require('gridfs-stream');
Grid.mongo = mongo;
const gfs = Grid(connection.db);
let Assignment = require('./assignment.model');


// set up connection to db for file storage
const storage = require('multer-gridfs-storage')({
   db: connection.db,
   file: (req, file) => {
      return {
         filename: +Date.now()+file.originalname,

      }
   }
});
// sets file input to single file
const singleUpload = multer({ storage: storage }).single('file');


router.route('/add').post(function (req, res) {
   let assignment = new Assignment(req.body);
   assignment.save()
       .then(business => {
          res.status(200).json({'business': 'business in added successfully'});
       })
       .catch(err => {
          res.status(400).send("unable to save to database");
       });
});

router.route('/stuview/:stid').get(function (req, res) {

      let stid = req.params.stid;
      //let fname = req.params.fname;

      Assignment.find({student:stid}, function (err, Assignment){
         res.json(Assignment);
      });
   });

router.route('/lecview/:lecid').get(function (req, res) {

   let lecid = req.params.lecid;
   //let fname = req.params.fname;

   Assignment.find({lecturer:lecid}, function (err, Assignment){
      res.json(Assignment);
   });
});




router.get('/files/:filename', (req, res) => {
   gfs.files.find({ filename: req.params.filename }).toArray((err, files) => {
      if(!files || files.length === 0){
         return res.status(404).json({
            message: "Could not find file"
         });
      }

      var readstream = gfs.createReadStream({
         filename: files[0].filename
      })
      res.set('Content-Type', files[0].contentType);
      return readstream.pipe(res);
   });
});

router.route('/checkview/:assid').get(function (req, res) {

   let assid = req.params.assid;


   Assignment.find({filename:assid}, function (err, Assignment){
      res.json(Assignment);
   });
});

router.route('/lecassview/:aid/:subid').get(function (req, res) {

   let aid = req.params.aid;
   let subid = req.params.subid;


   Assignment.find({name:aid,subject:subid}, function (err, Assignment){
      res.json(Assignment);
   }).catch(err=>{
      console.log(err)
   });
});

router.route('/assview/:subid').get(function (req, res) {

   let subid1 = req.params.subid;


   Assignment.find({subject:subid1}, function (err, Assignment){
      res.json(Assignment);
   });
});

router.route('/updatecourse/').post(function (req, res) {

   //let subid1 = req.params.subid;


   Assignment.updateMany({subject:"bbbb"},{subject:"abcd"},{multi:true}, function (err, Assignment){
      res.json(Assignment);
   });
});



router.get('/files', (req, res) => {
   gfs.files.find().toArray((err, files) => {
      if(!files || files.length === 0){
         return res.status(404).json({
            message: "Could not find files"
         });
      }
      return res.json(files);
   });
});

router.post('/files', singleUpload, (req, res) => {
   if (req.file) {
      return res.json({
         success: true,
         file: req.file,
         x:"hj"

      });
   }
    res.send({ success: false });
});

router.route('/getlast').get(function (req, res) {


  gfs.files.findOne({}, {}, { sort: { '_id' : -1 } }, function (err, resp){
      res.json(resp);
   });
});


router.delete('/files/:filename', (req, res) => {
   gfs.remove({ filename: req.params.filename }, (err) => {
      if (err) return res.status(500).json({ success: false })
      return res.json({ success: true });
   })
})

router.delete('/delete/:stu', (req, res) => {
   Assignment.remove({filename:req.params.stu}, (err) => {
      if (err) return res.status(500).json({ success: false })
      return res.json({ success: true });
   })
})



module.exports = router;
