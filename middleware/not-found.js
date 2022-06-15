const notFoud = (request, response) => {
    response.status(404). send('Route does not exist!')
}

module.exports = notFoud