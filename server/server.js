require('dotenv').config({ path: 'env/.env' })

const net = require('net')
const CollectionService = require('./services/collection-service')

const { PORT, HOST_NAME } = process.env

CollectionService.fulfillCollections()

const server = net.createServer()

const methodsRedirect = new Map([
    ['insertOne', CollectionService.insertOne],
    ['findOne', CollectionService.findOne]
])

server.listen(PORT, HOST_NAME, () => {
    console.log(`listening on port ${PORT}`)
})

server.on('connection', socket => {
    socket.on('data', data => {
        const jsonData = JSON.parse(String(data))
        const collection = CollectionService.getCollection(jsonData.collectionName)
        const params = {
            collection,
            jsonData
        }

        const response = methodsRedirect.get(jsonData.method)(params)

        socket.write(JSON.stringify(response))
    })
})
