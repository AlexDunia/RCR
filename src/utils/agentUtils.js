/**
 * Utility functions for working with agent data
 */

/**
 * Converts an agent from the store format to the client view format
 * @param {Object} agent - Agent object from the agentStore
 * @returns {Object} Agent formatted for display in client views
 */
export function convertAgentForClientView(agent) {
  if (!agent) return null;

  return {
    id: agent.id,
    name: agent.name,
    title: getAgentTitle(agent),
    photo: agent.profilePicture || agent.avatar,
    location: agent.location,
    rating: agent.averageRating,
    reviewCount: agent.reviews?.length || 0,
    experience: agent.yearsOfExperience,
    closedDeals: Math.floor(Math.random() * 200) + 50, // Mock data
    volumeSold: (Math.floor(Math.random() * 40) + 10) * 1000000, // Mock data
    specialties: agent.specialties || [],
    status: agent.status === 'active' ? (Math.random() > 0.5 ? 'online' : 'away') : 'offline'
  };
}

/**
 * Gets an appropriate title for an agent based on their specialties
 * @param {Object} agent - Agent object
 * @returns {string} Agent title
 */
export function getAgentTitle(agent) {
  if (!agent || !agent.specialties) return 'Real Estate Agent';

  if (agent.specialties.includes('Luxury Homes') || agent.specialties.includes('Luxury Estates')) {
    return 'Luxury Property Specialist';
  } else if (agent.specialties.includes('Investment Properties')) {
    return 'Investment Property Advisor';
  } else if (agent.specialties.includes('First-Time Buyers') || agent.specialties.includes('First-Time Homebuyers')) {
    return 'First-Time Homebuyer Specialist';
  }

  return 'Senior Real Estate Agent';
}

/**
 * Formats a price value for display (e.g., 1000000 -> "1M")
 * @param {number} price - Price value
 * @returns {string} Formatted price string
 */
export function formatPrice(price) {
  if (price >= 1000000) {
    return (price / 1000000).toFixed(1) + 'M';
  } else if (price >= 1000) {
    return (price / 1000).toFixed(0) + 'K';
  }
  return price.toString();
}
