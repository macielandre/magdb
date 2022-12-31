require('dotenv').config({ path: 'env/.env' })

const net = require('net')
const fs = require('fs')
const FindService = require('./services/find-service')
const InsertService = require('./services/insert-service')

const { PORT, HOST_NAME } = process.env

let collections = {
    cats: JSON.parse(String(fs.readFileSync('./server/collections/cats.json')))
}

const server = net.createServer()

const methodsRedirect = new Map([
    ['insertOne', InsertService.insertOne],
    ['findOne', FindService.findOne]
])

server.listen(PORT, HOST_NAME, () => {
    console.log(`listening on port ${PORT}`)
})

server.on('connection', socket => {
    socket.on('data', data => {
        const jsonData = JSON.parse(String(data))
        const collection = getCollection(jsonData.collectionName)
        const params = {
            collection,
            jsonData
        }

        const response = methodsRedirect.get(jsonData.method)(params)

        socket.write(JSON.stringify(response))
    })
})

function getCollection(collectionName) {
    if (!collections[collectionName]) {
        collections[collectionName] = {}
    }

    return collections[collectionName]
}
