
// default to error to let them know that something is up and maybe they 
// need to rethink what they were gonna do
export function disallowStatement(id, type, message = '', errorType = 'error') {

    return {
        id,
        nodeType: type,
        // test: (node) => node.type !== type,
        type: 'blacklist',
        message, 
        errorType
    };
}