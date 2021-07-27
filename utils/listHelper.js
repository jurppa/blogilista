var _ = require('lodash')
const dummy = () => {
    return 1
}
const totalLikes = (blogs) => {

    let sum = 0
    if(blogs.length === 0) {return 0}
    if(blogs.length === 1) {return blogs[0].likes}
    else {blogs.forEach(blog => sum += blog.likes ); return sum}
} 
const favouriteBlog = (blogs) => {
    
    const returnFavouriteBlog =(favouriteBlog) => {
        const favourite = {title: favouriteBlog.title, author: favouriteBlog.author, likes: favouriteBlog.likes}
        return favourite
    }
    if(blogs.length === 0) {return 'No blogs'}
    if(blogs.length === 1) {console.log('blogs length = 1', blogs[0]);return returnFavouriteBlog(blogs[0])}
    else {const topBlog = blogs.reduce((a, b) => a.likes > b.likes ? returnFavouriteBlog(a) : returnFavouriteBlog(b)); return topBlog}

}
const mostBlogs = (blogs) => {

    //Sort function from here => https://stackoverflow.com/questions/37656597/group-an-array-by-occurrences-and-sort-it-with-lodash 

    const personWithMostBlogs=[]
    _.forIn(_.countBy(blogs, 'author'), (value, key) => {
        personWithMostBlogs.push({ 'author': key, 'count': value })
    })
    const topBlogger = {author:personWithMostBlogs[personWithMostBlogs.length -1].author, blogs: personWithMostBlogs[personWithMostBlogs.length -1].count }
    return topBlogger
}
const mostLikes = (blogs) => {
    const personWithMostLikes = _(blogs).groupBy('author').map((blogger,author ) => ({
        author:author,
        likes: _.sumBy(blogger, 'likes')
    })
    ).value()
    return _.maxBy(personWithMostLikes,'likes')  
}
module.exports = {
    dummy,
    totalLikes,
    favouriteBlog,
    mostBlogs,
    mostLikes

    
}