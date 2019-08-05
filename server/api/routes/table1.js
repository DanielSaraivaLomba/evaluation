const Table1 = require('../../models/table1')

module.exports = function (router) {
    router.get('/document/table1/:id', function (req, res) {
        Table1.find({ docId: req.params.id })
            .then(docs => res.status(200)
                .json(docs))
            .catch(err => res.status(500)
                .json({
                    message: 'error finding table1',
                    error: err
                }))
    })

    router.post('/document/table1', function (req, res) {

        let table1 = new Table1(req.body)
        table1.save(function (err, table1) {
            if (err) return console.log(err)
            res.status(200).json(table1)
        })
    })

    router.put('/document/table1/:id', function (req, res) {
        console.log(req.body)
        let qry = { _id: req.params.id }
        let doc = {
            unidadecurricular: req.body.unidadecurricular,
            ano: req.body.ano,
            curso: req.body.curso,
            semestre: req.body.semestre,
            regime: req.body.regime,
            horastotal: req.body.horastotal,
            horassemana: req.body.horassemana,
            horaslecionadas: req.body.horaslecionadas,
            nestudantes: req.body.nestudantes
        }
        console.log(doc)
        Table1.update(qry, doc, function (err, respRaw) {
            if (err) return console.log(err)
            res.status(200).json(respRaw)
        })
    })

    router.delete('/document/table1/:id', function (req, res) {
        Table1.findOneAndDelete(req.params.id).exec()
            .then(docs => res.status(200)
                .json(docs))
            .catch(err => res.status(500)
                .json({
                    message: 'error finding table1',
                    error: err
                }))
    })


router.delete('/document/table1/all/:id', function(req,res){
    Table1.deleteMany({docId:req.params.id}).exec()
    .then(docs => res.status(200)
            .json(docs))
        .catch(err => res.status(500)
            .json({
                message: 'error finding form',
                error: err
            }))
})

}