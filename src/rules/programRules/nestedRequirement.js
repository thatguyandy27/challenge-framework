export function nestedRequirement(id, type, subRequirements, message = '',  errorType = 'warn') {

    return {
        id,
        nodeType: type,
        subRequirements,
        type: 'nested',
        message,
        errorType
    };
}