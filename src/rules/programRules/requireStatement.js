// default to error to let them know that something is up and maybe they 
// need to rethink what they were gonna do
export function requireStatement(id, type, message = '', errorType = 'warn') {

    return {
        id,
        nodeType: type,
        // test: (node) => node.type !== type,
        type: 'whitelist',
        message,
        errorType
    };
}