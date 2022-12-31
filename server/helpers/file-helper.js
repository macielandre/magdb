const fs = require('fs')

class FileHelper {
    static saveToFile(collectionName, collection) {
        fs.writeFileSync(`./server/collections/${collectionName}.json`, JSON.stringify(collection))
    }
}

module.exports = FileHelper