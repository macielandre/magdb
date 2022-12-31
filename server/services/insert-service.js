class InsertService {
    static findOne({ collection, jsonData }) {
        const query = jsonData.body
        const collectionEntries = Object.entries(collection)
    
        for(const [key, document] of collectionEntries) {
            if(isValuesInsideDocument(document, query)) {
                return document
            }
        }
    
        return null
    }
}

module.exports = InsertService
