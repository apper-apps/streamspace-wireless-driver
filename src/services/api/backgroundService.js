import mockBackgrounds from '@/services/mockData/backgrounds'

const backgroundService = {
  // Get all available backgrounds
  getAll: async () => {
    await new Promise(resolve => setTimeout(resolve, 300))
    return [...mockBackgrounds]
  },

  // Get background by ID
  getById: async (id) => {
    await new Promise(resolve => setTimeout(resolve, 200))
    const background = mockBackgrounds.find(bg => bg.Id === parseInt(id))
    if (!background) {
      throw new Error('Background not found')
    }
    return { ...background }
  },

  // Upload custom background
  uploadCustom: async (formData) => {
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Simulate file upload and create new background entry
    const file = formData.get('background')
    const newId = Math.max(...mockBackgrounds.map(bg => bg.Id)) + 1
    
    const newBackground = {
      Id: newId,
      name: file.name.replace(/\.[^/.]+$/, ""),
      type: 'image',
      url: URL.createObjectURL(file), // In real app, this would be the uploaded URL
      category: 'custom',
      createdAt: new Date().toISOString()
    }
    
    mockBackgrounds.push(newBackground)
    return { ...newBackground }
  },

  // Delete custom background
  delete: async (id) => {
    await new Promise(resolve => setTimeout(resolve, 300))
    const index = mockBackgrounds.findIndex(bg => bg.Id === parseInt(id))
    if (index === -1) {
      throw new Error('Background not found')
    }
    
    const background = mockBackgrounds[index]
    if (background.category !== 'custom') {
      throw new Error('Cannot delete preset background')
    }
    
    mockBackgrounds.splice(index, 1)
    return true
  },

  // Get user's selected background preference
  getUserBackground: async (userId) => {
    await new Promise(resolve => setTimeout(resolve, 200))
    // Simulate getting user preference from storage/API
    return localStorage.getItem(`user_background_${userId}`) || 'none'
  },

  // Save user's background preference
  setUserBackground: async (userId, backgroundId) => {
    await new Promise(resolve => setTimeout(resolve, 200))
    localStorage.setItem(`user_background_${userId}`, backgroundId)
    return true
  }
}

export default backgroundService