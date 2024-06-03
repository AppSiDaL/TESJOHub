const postRouter = require('./posts')
const userRouter = require('./users')
const loginRouter = require('./login')
const commentRouter = require('./comments')
const likesRouter = require('./like')
const friendsRouter = require('./friend')
export {}
module.exports = {
  friendsRouter,
  likesRouter,
  postRouter,
  userRouter,
  loginRouter,
  commentRouter
}
