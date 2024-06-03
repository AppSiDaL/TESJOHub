const postRouter = require('./posts')
const userRouter = require('./users')
const loginRouter = require('./login')
const commentRouter = require('./comments')
const likesRouter = require('./like')
const frindsRouter = require('./friend')
export {}
module.exports = {
  frindsRouter,
  likesRouter,
  postRouter,
  userRouter,
  loginRouter,
  commentRouter
}
