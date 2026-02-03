export const isNew = (createdAt, days = 14 ) => {

    if (!createdAt) return false;
    const createdDate = new Date(createdAt)
    const now = new Date()
    const diffInDays = (now - createdDate) / (1000 * 60 * 60 * 24)
    
    return diffInDays <= days
}