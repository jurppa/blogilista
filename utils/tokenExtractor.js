const getTokenFrom = async (req,res, next) =>  {

    const authorization = await req.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        req.token = authorization.substring(7)

       
         
    } 

    return next()
    
    

}
module.exports = {
    getTokenFrom
}