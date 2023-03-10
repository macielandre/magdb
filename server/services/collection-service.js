const fs = require('fs')
const ObjectHelper = require("../helpers/object-helper")
const FileHelper = require('../helpers/file-helper')

const collections = {}

class CollectionService {
    static fulfillCollections() {
        const collectionFolderPath = 'collections'
        const fileNames = fs.readdirSync(`./server/${collectionFolderPath}`)

        for(const fileName of fileNames) {
            const collectionName = fileName.split('.')[0]
            const collection = fs.readFileSync(`./server/${collectionFolderPath}/${fileName}`)

            if(collection) {
                collections[collectionName] = JSON.parse(collection)
            }
        }  
    }

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

    static updateOne({ collection, jsonData }) {
        const data = jsonData.newData
        const foundDoc = CollectionService.findOne({ collection, jsonData })

        if(foundDoc) {
            collections[foundDoc._id] = Object.assign(foundDoc, data)

            FileHelper.saveToFile(jsonData.collectionName, collection)

            return collections[foundDoc._id]
        }

        return null 
    }

    static insertOne({ collection, jsonData }) {
        const _id = new Date().getTime();

        collection[_id] = {
          ...jsonData.body,
          _id
        }

        FileHelper.saveToFile(jsonData.collectionName, collection)

        return { insertedId: _id }
    }

    static deleteOne({ collection, jsonData }) {
        const foundDoc = CollectionService.findOne({ collection, jsonData })

        if(foundDoc) {
            const temporaryDoc = collection[foundDoc._id]

            delete collection[foundDoc._id]

            FileHelper.saveToFile(jsonData.collectionName, collection)

            return temporaryDoc
        }

        return null
    }

    static getCollection(collectionName) {
        if (!collections[collectionName]) {
            collections[collectionName] = {}
        }
    
        return collections[collectionName]
    }
}

module.exports = CollectionService