const getTokenFrom = (req,res, next) => {

    const authorization = req.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        console.log('bearer')
        req.token = authorization.substring(7)
        
        next()
        
    }
    console.log('error')
    next()
    

}
module.exports = {
    getTokenFrom
}