require('dotenv').config({ path: 'env/.env' })

const net = require('net')
const log4js = require('log4js')
const CollectionService = require('./services/collection-service')

const { PORT, HOST_NAME } = process.env

const logger = log4js.getLogger('server')

logger.level = 'info'

CollectionService.fulfillCollections()

const server = net.createServer()

const methodsRedirect = new Map([
    ['insertOne', CollectionService.insertOne],
    ['findOne', CollectionService.findOne]
])

server.listen(PORT, HOST_NAME, () => {
    logger.info(`listening on port ${PORT}`)
})

server.on('connection', socket => {
    socket.on('data', data => {
        const jsonData = JSON.parse(String(data))
        const collection = CollectionService.getCollection(jsonData.collectionName)

        const params = {
            collection,
            jsonData
        }
        
        const methodFn = methodsRedirect.get(jsonData.method)

        let response = null

        if(methodFn) {
            response = methodFn(params)
        } else {
            logger.error(`The method ${jsonData.method} doesnt exists`)
        }

        socket.write(JSON.stringify(response))
    })
})
