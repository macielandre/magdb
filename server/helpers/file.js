class FileHelper {
    static saveToFile(collectionName) {
        fs.writeFileSync(`${collectionName}.json`, JSON.stringify(getCollection(collectionName)))
    }
}

module.exports = FileHelper