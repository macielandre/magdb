const ObjectHelper = require("../helpers/object")

class FindService {
    static findOne({ collection, jsonData }) {
        const query = jsonData.body
        const collectionEntries = Object.entries(collection)
    
        for(const [key, document] of collectionEntries) {
            if(ObjectHelper.isValuesInsideObject(document, query)) {
                return document
            }
        }
    
        return null
    }
}

module.exports = FindService
