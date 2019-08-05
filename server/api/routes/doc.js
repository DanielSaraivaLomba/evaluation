const Doc = require('../../models/doc')

module.exports = function (router) {
    //get by id

    router.get('/document/user/:id', function (req, res) {
        Doc.find({ userId: req.params.id })
            .then(docs => res.status(200)
                .json(docs))
            .catch(err => res.status(500)
                .json({
                    message: 'error finding doc',
                    error: err
                }))
    })

    router.get('/document/:id', function (req, res) {
        Doc.findById(req.params.id).exec()
            .then(docs => res.status(200)
                .json(docs))
            .catch(err => res.status(500)
                .json({
                    message: 'error finding doc',
                    error: err
                }))
    })

    router.get('/document/', function (req, res) {
        Doc.find({ }).limit(10)
            .then(docs => res.status(200)
                .json(docs))
            .catch(err => res.status(500)
                .json({
                    message: 'error finding doc',
                    error: err
                }))
    })

    router.get('/document/name/:name', function (req, res) {
        Doc.find( {userName: new RegExp(req.params.name, "i")})
            .then(docs => res.status(200)
                .json(docs))
            .catch(err => res.status(500)
                .json({
                    message: 'error finding doc',
                    error: err
                }))
    })

    router.delete('/document/:id', function (req, res) {
        Doc.findOneAndDelete({ _id: req.params.id }).exec()
            .then(docs => res.status(200)
                .json(docs))
            .catch(err => res.status(500)
                .json({
                    message: 'error finding document',
                    error: err
                }))
    })



    //new doc
    router.post('/document', function (req, res) {

        let doc = new Doc(req.body)
        doc.save(function (err, doc) {
            if (err) return console.log(err)
            res.status(200).json(doc)
        })
    })

    router.put('/document/:id', function (req, res) {
        console.log(req.body)
        let qry = { _id: req.params.id }
        let doc = {
            isCompleted: req.body.state
        }
        console.log(doc)
        Doc.update(qry, doc, function (err, respRaw) {
            if (err) return console.log(err)
            res.status(200).json(respRaw)
        })
    })
}