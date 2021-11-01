module.exports = function sortCategoriesForInsert (inputJson) {
    var result = [];
    var inputObject = {};
    //Create dict where key is category id for easier access
    for (key in inputJson) {
        inputObject[inputJson[key].id] = inputJson[key];
    }
    //Loop and find depth of each element using recursive function
    for (key in inputObject) {
        if (inputObject[key].depth == undefined) {
            inputObject[key].depth = findParentDepthRecursively(inputObject, inputObject[key].parent_id);
        }
    }

    //Sort based on depth, no depth 1 should be dependent on another depth 1. So if we insert one depth at a time we'll have no issues
    //Then map just to remove the depth from final object
    var result = Object.values(inputObject).sort((a,b) => {
        return a.depth - b.depth;
    }).map((a) => {
        return {
            id: a.id,
            parent_id: a.parent_id,
            name: a.name
        }
    });

    return result 
}

function findParentDepthRecursively(obj, parent_id) {
    if (parent_id == null) {
        return 0;
    } else if (obj[parent_id].depth != undefined) {
        return obj[parent_id].depth + 1;
    } else {
        return findParentDepthRecursively(obj, obj[parent_id].parent_id) + 1;
    }
}

