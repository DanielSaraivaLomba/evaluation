const Form = require('../../models/form')
const global = require('../../global')

module.exports = function (router) {
    router.get('/document/form/:id', function (req, res) {
        Form.find({ _id: req.params.id })
            .then(docs => res.status(200)
                .json(docs))
            .catch(err => res.status(500)
                .json({
                    message: 'error finding form',
                    error: err
                }))
    })

    router.get('/document/form/bydoc/:id', function (req, res) {
        Form.find({ docId: req.params.id })
            .then(docs => res.status(200)
                .json(docs))
            .catch(err => res.status(500)
                .json({
                    message: 'error finding form',
                    error: err
                }))
    })

    router.get('/document/form/bydoc/:id/activity/:activity', function (req, res) {
        Form.find({ docId: req.params.id, activity: req.params.activity })
            .then(docs => res.status(200)
                .json(docs))
            .catch(err => res.status(500)
                .json({
                    message: 'error finding form',
                    error: err
                }))
    })


    router.post('/document/form', function (req, res) {

        let form = new Form(req.body)
        form.save(function (err, form) {
            if (err) return console.log(err)
            res.status(200).json(form)
        })
    })

    router.put('/document/form/:id', function (req, res) {
        let qry = { _id: req.params.id }
        let doc = {
            answers: req.body.answers
        }
        console.log(doc)
        Form.findOneAndUpdate(qry, doc, function (err, respRaw) {
            if (err) return console.log(err)
            res.status(200).json(respRaw)
        })
    })

    router.get('/getall/form/', function (req, res) {
        Form.find({  })
            .then(docs => res.status(200)
                .json(docs))
            .catch(err => res.status(500)
                .json({
                    message: 'error finding doc',
                    error: err
                }))
    })

    router.delete('/document/form/:id', function (req, res) {
        Form.findOneAndDelete(req.params.id).exec()
            .then(docs => res.status(200)
                .json(docs))
            .catch(err => res.status(500)
                .json({
                    message: 'error finding form',
                    error: err
                }))
    })

    router.delete('/document/form/all/:id', function(req,res){
        Form.deleteMany({docId:req.params.id}).exec()
        .then(docs => res.status(200)
                .json(docs))
            .catch(err => res.status(500)
                .json({
                    message: 'error finding form',
                    error: err
                }))
    }),

    router.post('/upload', function(req, res) {
        if (Object.keys(req.files).length == 0) {
          return res.status(400).send('No files were uploaded.');
        }
        let sampleFile = req.files.file;
        
        // console.log(req.files.file);
        // console.log(req.body);
        //In the future, this needs to be configured on server


        var mkdirp = require('mkdirp');
    

        let docID = String(req.body.docID)
        let pathToFile = String(global.pathToFile)
        mkdirp(pathToFile + req.body.userId + '/' + docID, function (err) {
    if (err) console.error(err)
    else console.log(pathToFile + req.body.userId + '/' + docID + '/' + req.files.file.name)
});


        sampleFile.mv(pathToFile + req.body.userId + '/' + docID + '/' + req.files.file.name, function(err) {
          if (err)
            return res.status(500).send(err);
            else
          //res.send('File uploaded!');
          res.send({path: pathToFile + req.body.userId + '/' + docID + '/' + req.files.file.name, state: 'File Uploaded', pdf_name: req.files.file.name })
      });
    });



router.get('/download', function (req, res) {
   res.download(req.query.path, function (err) {
       if (err) {
           console.log("Error");
           console.log(err);
       } else {
           console.log("Success");
       }
   });
});
}