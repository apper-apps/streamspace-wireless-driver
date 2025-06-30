const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

// This would normally be stored per meeting, but for simplicity using a single array
let allParticipants = []
let nextId = 1

export const participantService = {
  async addParticipant(meetingId, participantData) {
    await delay(200)
    
    const participant = {
      Id: nextId++,
      meetingId: parseInt(meetingId),
      ...participantData,
      joinedAt: new Date().toISOString()
    }
    
    allParticipants.push(participant)
    
    // Return all participants for this meeting
    const meetingParticipants = allParticipants
      .filter(p => p.meetingId === parseInt(meetingId))
      .map(p => ({ ...p }))
    
    return meetingParticipants
  },
  
  async removeParticipant(meetingId, participantId) {
    await delay(200)
    
    const index = allParticipants.findIndex(p => 
      p.meetingId === parseInt(meetingId) && p.id === participantId
    )
    
    if (index !== -1) {
      allParticipants.splice(index, 1)
    }
    
    // Return remaining participants for this meeting
    const meetingParticipants = allParticipants
      .filter(p => p.meetingId === parseInt(meetingId))
      .map(p => ({ ...p }))
    
    return meetingParticipants
  },
  
  async getParticipants(meetingId) {
    await delay(200)
    
    const meetingParticipants = allParticipants
      .filter(p => p.meetingId === parseInt(meetingId))
      .map(p => ({ ...p }))
    
    return meetingParticipants
  },
  
  async updateParticipant(meetingId, participantId, data) {
    await delay(200)
    
    const index = allParticipants.findIndex(p => 
      p.meetingId === parseInt(meetingId) && p.id === participantId
    )
    
    if (index !== -1) {
      allParticipants[index] = { ...allParticipants[index], ...data }
      return { ...allParticipants[index] }
    }
    
    throw new Error('Participant not found')
  }
}