const postRouter = require('./posts')
const userRouter = require('./users')
const loginRouter = require('./login')
const commentRouter = require('./comments')
const likesRouter = require('./like')
export {}
module.exports = {
  likesRouter,
  postRouter,
  userRouter,
  loginRouter,
  commentRouter
}
