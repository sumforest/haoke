class DataPacket {
    constructor(message) {
        if(typeof(message) === "string"){
            try {
                this._data = JSON.parse(message);
            } catch (error) {
                this._data = undefined;
            }
            
        } else if(typeof(message) === "object"){
            this._data = message;
        }
    }

    get data() {
        return this._data
    }

    get content() {
        return this._data["content"]
    }

    get type() {
        return this._data["type"];
    }
    
    set type(type) {
        this._data["type"] = type;
    }

    get rawMessage() {
        return JSON.stringify(this._data);
    }
}

export default DataPacket