const Table2 = require('../../models/table2')

module.exports = function (router) {
    router.get('/document/table2/:id', function (req, res) {
        Table2.find({ docId: req.params.id })
            .then(docs => res.status(200)
                .json(docs))
            .catch(err => res.status(500)
                .json({
                    message: 'error finding table2',
                    error: err
                }))
    })

    router.post('/document/table2', function (req, res) {

        let table2 = new Table2(req.body)
        table2.save(function (err, table2) {
            if (err) return console.log(err)
            res.status(200).json(table2)
        })
    })

    router.put('/document/table2/:id', function (req, res) {
        console.log(req.body)
        let qry = { _id: req.params.id }
        let doc = {
            ano: req.body.ano,
            instituicao: req.body.instituicao,
            regime: req.body.regime
        }
        console.log(doc)
        Table2.update(qry, doc, function (err, respRaw) {
            if (err) return console.log(err)
            res.status(200).json(respRaw)
        })
    })

    router.delete('/document/table2/:id', function (req, res) {
        Table2.findOneAndDelete(req.params.id).exec()
            .then(docs => res.status(200)
                .json(docs))
            .catch(err => res.status(500)
                .json({
                    message: 'error finding table2',
                    error: err
                }))
    })


router.delete('/document/table2/all/:id', function(req,res){
    Table2.deleteMany({docId:req.params.id}).exec()
    .then(docs => res.status(200)
            .json(docs))
        .catch(err => res.status(500)
            .json({
                message: 'error deleting table2',
                error: err
            }))
})
}