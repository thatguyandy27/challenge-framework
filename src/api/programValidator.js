import esprima from 'esprima';

function validateTree(node, requirements, failedRequirements){

    var i = 0;

    if (!node){
        return;
    }

    // test all the things that are required and not yet met
    while (i < requirements.length) {
        // if it passes the missing requirements test then remove it from the list
        requirements[i].test(node, requirements[i]);

        // if completed then remove it
        if(requirements[i].isComplete){

            // if not invalid then put it as a failed requirement 
            if(!requirements[i].isValid){
                failedRequirements.push(requirements[i]);
            }

            requirements.splice(i, 1);

        }
        else {
            // not done so we are gonna keep the requirement
            i++;
        }
    }

    // all requirements met or failed... completo 
    if(requirements.length === 0 ) {
        return;
    }

    // traverse each property on the node to see if it is an array.  
    // pass the children in for each array
    for (var key in node) {
        if (Object.prototype.hasOwnProperty.call(node, key)) {
            if(typeof node[key] === 'object'){
                validateTree(node[key], requirements, failedRequirements);
            }
            
            if(Array.isArray(node[key])){
                var l = node[key];
                for(var j = 0; j < l.length; j++){
                    validateTree(l[j], requirements, failedRequirements);
                }
            }
        }
    }
}

// if match then we are done, and this is invalid
function blacklistTest(node, requirement){
    var isInvalid = node.type === requirement.nodeType;

    requirement.isComplete = isInvalid;
    requirement.isValid = !isInvalid;
}

// if match then we are done and this is valid
function whitelistTest(node, requirement){
     var isValid = node.type === requirement.nodeType;

    requirement.isComplete = isValid;
    requirement.isValid = isValid;
}

// if match check all subRequirements 
// isValid == valid and all sub requirments are met.  
function nestedNodeTest(node, requirement){
    if (node.type === requirement.nodeType){
        var invalidReqs = [],
            subRequirements = requirement.subRequirements.slice(0);

        // check the tree from here with all subrequiremnts
        validateTree(node, subRequirements, invalidReqs);

        // if any invalid reqs then fail
        if(invalidReqs.length > 0){
            requirement.isValid = false;
            requirement.isComplete = true;
        }

        // if all subrequirements met then we are done 
        else if(subRequirements.length === 0){
            requirement.isValid = true;
            requirement.isComplete = true;
        }

        // else set it isn't complete, check to see if any children are invalid
        else {
            // if any are invalid then this is invalid. 
            requirement.isValid = !subRequirements.some(function(subReq) {
                return !subReq.isValid;
            });
            requirement.isComplete = false;
        }
    }
}

// This should set up the appropriate functions
// functions will determine if the req has passed/failed
// and if it is done processing
function mapRequirement(req){
    switch(req.type){
        case 'whitelist':
            req.test = whitelistTest;
            req.isValid = false; 
            break
        case 'blacklist':
            req.test = blacklistTest;
            req.isValid = true; 
            break
        case 'nested':
            req.test = nestedNodeTest;
            req.isValid = false;
            req.subRequirements.forEach(function(subReq){
                mapRequirement(subReq);
            });
            break;
    }
}

function validateProgram(program, requirements = []){
    var programTree;

    try{
        programTree = esprima.parse(program);
    }
    catch(e){
        return {
            isError: true,
            error: e
        };
    }
        
    var failedRequirements = [];

    if(!requirements.length){
        return [];
    }

    requirements.forEach(function(r) {
        mapRequirement(r);
    });
    
    // requirements should be removed from the list when they are valid 
    // failed ones are immediately put on the failedRequirements list
    // any remaining requirements should be considered failed
    validateTree(programTree, requirements, failedRequirements);

    // for any remaining requirments and grab any failed ones
    // concat with all the failed ones
    // return the ids
    return {
        feedback: requirements.filter(function(r){
                    return !r.isValid;
                }).concat(failedRequirements).map( function(r) { return r.id; }),
        isError: false
    };
}


onmessage = function(msg){
    var result = validateProgram(msg.data.program, msg.data.requirements);

    if (result.isError){
        postMessage({
            id: msg.data.id,
            isError: true,
            message: result.error.message,
        });    
    }
    else {
         postMessage({
            id: msg.data.id,
            isError: false,
            feedback: result.feedback
        });    
    }
    
}


