import { Router, type Request, type Response } from 'express'

module.exports = function (io: any) {
  const chatRouter = Router()

  const generateID = (): any => Math.random().toString(36).substring(2, 10)
  const chatRooms: any[] = []

  io.on('connection', (socket: any) => {
    console.log(`⚡: ${socket.id} user just connected!`)

    socket.on('createRoom', (name: any) => {
      socket.join(name)
      chatRooms.unshift({ id: generateID(), name, messages: [] })
      socket.emit('roomsList', chatRooms)
    })

    socket.on('findRoom', (id: any) => {
      const result = chatRooms.filter((room) => room.id === id)
      // console.log(chatRooms);
      socket.emit('foundRoom', result[0].messages)
      // console.log("Messages Form", result[0].messages);
    })

    socket.on('newMessage', (data: any) => {
      const { room_id, message, user, timestamp } = data
      const result = chatRooms.filter((room) => room.id === room_id)
      const newMessage = {
        id: generateID(),
        text: message,
        user,
        time: `${timestamp.hour}:${timestamp.mins}`
      }
      console.log('New Message', newMessage)
      socket.to(result[0].name).emit('roomMessage', newMessage)
      result[0].messages.push(newMessage)
      socket.emit('roomsList', chatRooms)
      socket.emit('foundRoom', result[0].messages)
    })
    socket.on('disconnect', () => {
      socket.disconnect()
      console.log('🔥: A user disconnected')
    })
  })
  chatRouter.get('/api', (_req: Request, res: Response) => {
    res.json(chatRooms)
  })

  return chatRouter
}
