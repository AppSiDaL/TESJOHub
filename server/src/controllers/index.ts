const postRouter = require('./posts')
const userRouter = require('./users')
const loginRouter = require('./login')
const commentRouter = require('./comments')
const likesRouter = require('./like')
const followersRouter = require('./followers')
const chatsRouter = require('./chats')
export {}
module.exports = {
  followersRouter,
  chatsRouter,
  likesRouter,
  postRouter,
  userRouter,
  loginRouter,
  commentRouter
}
