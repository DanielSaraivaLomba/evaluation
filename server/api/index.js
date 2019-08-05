const express = require('express')
const router = express.Router()

require('./routes/user')(router)
require('./routes/doc')(router)
require('./routes/table2')(router)
require('./routes/table1')(router)
require('./routes/table3')(router)
require('./routes/form')(router)


module.exports = router