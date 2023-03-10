require('dotenv').config({ path: 'env/.env' })

const net = require('net')

const { PORT, HOST_NAME } = process.env

const socket = new net.Socket()

socket.connect(PORT, HOST_NAME, () => {
    socket.write(JSON.stringify({
        collectionName: 'cats',
        method: 'deleteOne',
        body: {
            breed: 'Chartreux'
        },
        newData: {
            breed: 'Chartreux'
        }
    }))

    socket.on('data', data => {
        console.log(String(data))
    })
})