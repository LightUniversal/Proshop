const asyncHandler = ah => (req, res, next) => {
    Promise.resolve(ah(req, res, next)).catch(next)
}

export default asyncHandler;

