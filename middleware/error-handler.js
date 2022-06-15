const {CustomAPIError} = require('../errors/custom-error')

const errorHandler = (err, request, response, next) => {
    if(err instanceof CustomAPIError) {
        return res.status(err.statusCode).json({ msg: err.message })
    }
    return response.status(500).json({ msg: 'Something went wrong, try again later...' })
}

module.exports = errorHandler