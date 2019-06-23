const router = require('express').Router();
const { mongo, connection } = require('mongoose');
let Marks = require('./marks.model');


router.route('/add').post(function (req, res) {
    let marks = new Marks(req.body);
    marks.save()
        .then(business => {
            res.status(200).json({'marks': 'marks in added successfully'});
        })
        .catch(err => {
            res.status(400).send("unable to save to database");
        });
});

router.route('/get/:cName/:aName/').post(function (req, res) {

    Marks.find({subject:req.params.cName,name:req.params.aName})
        .then(business => {
            res.status(200).json();
        })
        .catch(err => {
            res.status(400).send();
        });
})

router.route('/get/:cName/:aName/:stuId').get(function (req, res) {

    Marks.findOne({subject:req.params.cName,name:req.params.aName,student:req.params.stuId}, function (err, Assignment){
        res.json(Assignment);
    });

})

router.route('/get/:stu').post(function (req, res) {

    Marks.find({itnumber:req.params.stu})
        .then(business => {
            res.status(200).json({'marks': 'marks in added successfully'});
        })
        .catch(err => {
            res.status(400).send("unable to save to database");
        });
})

router.get('/delete/:id', (req, res) => {
    Marks.remove({_id:req.params.id}, (err) => {
        if (err) return res.status(500).json({ success: false })
        return res.json({ success: true });
    })

})
router.get('/findmarks/:id', (req, res) => {
    Marks.findOne( {_id:req.params.id}, function (err, mark){
        res.json(mark);
    });

    })

router.post('/updatemarks/:id/:mark', (req, res) => {
    Marks.updateMany({_id:req.params.id},{mark:req.params.mark},{multi:true}, function (err, Assignment){
        res.json(Assignment);
    });

})






module.exports = router;
