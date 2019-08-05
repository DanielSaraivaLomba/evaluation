const Table3 = require('../../models/table3')

module.exports = function (router) {
    router.get('/document/table3/:id', function (req, res) {
        Table3.find({ docId: req.params.id })
            .then(docs => res.status(200)
                .json(docs))
            .catch(err => res.status(500)
                .json({
                    message: 'error finding table3',
                    error: err
                }))
    })

    router.post('/document/table3', function (req, res) {

        let table3 = new Table3(req.body)
        table3.save(function (err, table3) {
            if (err) return console.log(err)
            res.status(200).json(table3)
        })
    })

    router.put('/document/table3/:id', function (req, res) {
        console.log(req.body)
        let qry = { _id: req.params.id }
        let doc = {
            curso: req.body.curso,
            unidadecurricular: req.body.unidadecurricular,
            regime: req.body.regime,
            avaliacao: req.body.avaliacao,
        }
        console.log(doc)
        Table3.update(qry, doc, function (err, respRaw) {
            if (err) return console.log(err)
            res.status(200).json(respRaw)
        })
    })

    router.delete('/document/table3/:id', function (req, res) {
        Table3.findOneAndDelete(req.params.id).exec()
            .then(docs => res.status(200)
                .json(docs))
            .catch(err => res.status(500)
                .json({
                    message: 'error finding table3',
                    error: err
                }))
    })


router.delete('/document/table3/all/:id', function(req,res){
    Table3.deleteMany({docId:req.params.id}).exec()
    .then(docs => res.status(200)
            .json(docs))
        .catch(err => res.status(500)
            .json({
                message: 'error deleting table3',
                error: err
            }))
})
}