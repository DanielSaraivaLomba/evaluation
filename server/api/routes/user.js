const User = require('../../models/user')

module.exports = function (router) {
    router.get('/user/:id', function (req, res) {
        User.findById(req.params.id).exec()
            .then(docs => res.status(200)
                .json(docs))
            .catch(err => res.status(500)
                .json({
                    message: 'error finding user',
                    error: err
                }))
    })

    router.post('/user', function (req, res) {

        let user = new User(req.body)
        user.save(function (err, user) {
            if (err) return console.log(err)
            res.status(200).json(user)
        })
    })

    router.put('/user/:id', function (req, res) {
        console.log(req.body)
        let qry = { _id: req.params.id }
        let doc = {
            name: req.body.name,
            lastname: req.body.lastname,
            //
            //
            //isActive: req.body.isActive
        }
        console.log(doc)
        User.update(qry, doc, function (err, respRaw) {
            if (err) return console.log(err)
            res.status(200).json(respRaw)
        })
    })
}