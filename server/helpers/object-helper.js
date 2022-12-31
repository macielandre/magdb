class ObjectHelper {
    static isValuesInsideObject(document, values) {
        const entries = Object.entries(values)
    
        for(const [key, value] of entries) {
            if(document[key] !== value) {
                return false
            }
        }
    
        return true
    }
}

module.exports = ObjectHelper