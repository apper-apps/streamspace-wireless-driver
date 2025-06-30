const generateRoomCode = () => {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  const numbers = '0123456789'
  
  let code = ''
  for (let i = 0; i < 3; i++) {
    code += letters.charAt(Math.floor(Math.random() * letters.length))
  }
  code += '-'
  for (let i = 0; i < 3; i++) {
    code += numbers.charAt(Math.floor(Math.random() * numbers.length))
  }
  
  return code
}

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

let meetings = []
let nextId = 1

export const meetingService = {
  async createMeeting() {
    await delay(300)
    
    const meeting = {
      Id: nextId++,
      roomCode: generateRoomCode(),
      hostId: 'user-' + Date.now(),
      participants: [],
      startTime: new Date().toISOString(),
      isActive: true
    }
    
    meetings.push(meeting)
    return { ...meeting }
  },
  
  async getMeetingByCode(roomCode) {
    await delay(200)
    
    const meeting = meetings.find(m => m.roomCode === roomCode)
    if (!meeting) {
      // Create a mock meeting if not found (for demo purposes)
      const mockMeeting = {
        Id: nextId++,
        roomCode: roomCode,
        hostId: 'host-' + Date.now(),
        participants: [
          {
            id: 'participant-1',
            name: 'John Smith',
            videoEnabled: true,
            audioEnabled: true,
            isScreenSharing: false,
            connectionQuality: 'excellent'
          },
          {
            id: 'participant-2',
            name: 'Sarah Johnson',
            videoEnabled: false,
            audioEnabled: true,
            isScreenSharing: false,
            connectionQuality: 'good'
          }
        ],
        startTime: new Date().toISOString(),
        isActive: true
      }
      meetings.push(mockMeeting)
      return { ...mockMeeting }
    }
    
    return { ...meeting }
  },
  
  async getAllMeetings() {
    await delay(200)
    return meetings.map(meeting => ({ ...meeting }))
  },
  
  async getMeetingById(id) {
    await delay(200)
    const meeting = meetings.find(m => m.Id === parseInt(id))
    return meeting ? { ...meeting } : null
  },
  
  async updateMeeting(id, data) {
    await delay(300)
    const index = meetings.findIndex(m => m.Id === parseInt(id))
    if (index !== -1) {
      meetings[index] = { ...meetings[index], ...data }
      return { ...meetings[index] }
    }
    throw new Error('Meeting not found')
  },
  
  async deleteMeeting(id) {
    await delay(300)
    const index = meetings.findIndex(m => m.Id === parseInt(id))
    if (index !== -1) {
      meetings.splice(index, 1)
      return true
    }
    throw new Error('Meeting not found')
  }
}