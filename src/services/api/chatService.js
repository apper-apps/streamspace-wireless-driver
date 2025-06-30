const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

let allMessages = []
let nextId = 1

export const chatService = {
  async sendMessage(meetingId, messageData) {
    await delay(200)
    
    const message = {
      Id: nextId++,
      meetingId: parseInt(meetingId),
      ...messageData,
      timestamp: new Date().toISOString()
    }
    
    allMessages.push(message)
    return { ...message }
  },
  
  async getMessages(meetingId) {
    await delay(200)
    
    // Return some mock messages for demo
    const mockMessages = [
      {
        Id: 1,
        meetingId: parseInt(meetingId),
        senderId: 'participant-1',
        senderName: 'John Smith',
        content: 'Hello everyone! Can you hear me clearly?',
        timestamp: new Date(Date.now() - 300000).toISOString(),
        type: 'text'
      },
      {
        Id: 2,
        meetingId: parseInt(meetingId),
        senderId: 'participant-2',
        senderName: 'Sarah Johnson',
        content: 'Yes, audio is perfect. Thanks for joining!',
        timestamp: new Date(Date.now() - 240000).toISOString(),
        type: 'text'
      },
      {
        Id: 3,
        meetingId: parseInt(meetingId),
        senderId: 'system',
        senderName: 'System',
        content: 'John Smith started screen sharing',
        timestamp: new Date(Date.now() - 180000).toISOString(),
        type: 'system'
      }
    ]
    
    const meetingMessages = allMessages
      .filter(m => m.meetingId === parseInt(meetingId))
      .concat(mockMessages)
      .sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp))
    
    return meetingMessages.map(m => ({ ...m }))
  },
  
  async deleteMessage(meetingId, messageId) {
    await delay(200)
    
    const index = allMessages.findIndex(m => 
      m.meetingId === parseInt(meetingId) && m.Id === parseInt(messageId)
    )
    
    if (index !== -1) {
      allMessages.splice(index, 1)
      return true
    }
    
    throw new Error('Message not found')
  }
}