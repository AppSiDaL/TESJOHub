const postRouter = require('./posts')
const userRouter = require('./users')
const loginRouter = require('./login')
const commentRouter = require('./comments')
const likesRouter = require('./like')
const followersRouter = require('./followers')
export {}
module.exports = {
  followersRouter,
  likesRouter,
  postRouter,
  userRouter,
  loginRouter,
  commentRouter
}
