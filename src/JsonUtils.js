import merge from 'deepmerge-json';

class JsonUtils {
    get(jsonObj,path, delimiter = '.') {
        if(!jsonObj){
            return
        }
        let steps = path.split(delimiter);
        console.log(JSON.stringify(steps))
        let obj = jsonObj;
        for(let s in steps){
            obj = (obj)[steps[s]]
        }
        return obj;
   }

   set(jsonObj,path,value, delimiter = '.'){
    if(!jsonObj){
        jsonObj = {}
    }
    let steps = path.split(delimiter).reverse();
    
    let valueToSet = value;
    for(let idx in steps){
        let obj = {}
        obj[steps[idx]] = valueToSet;
        valueToSet = obj;
    }

    return merge(jsonObj,valueToSet);
   }
}

export const _ = new JsonUtils()