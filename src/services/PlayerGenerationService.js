import firstNames from "@/data/names"
import lastNames from "@/data/lastNames"
import Player from "@/models/Player"

function getRandomStat() {
  const roll = Math.random()
  if (roll < 0.1) return 1
  if (roll < 0.3) return 2
  if (roll < 0.7) return 3
  if (roll < 0.9) return 4
  return 5
}
function shuffleArray(array) {
  const arr = [...array]; // create a shallow copy to avoid mutating the original
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1)); // random index from 0 to i
    [arr[i], arr[j]] = [arr[j], arr[i]]; // swap elements
  }
  return arr;
}
function getRandomPersonality() {
  const shapes = ['square', 'circle', 'triangle']
  const colors = ['red', 'green', 'blue']

  return {
    shape: shapes[Math.floor(Math.random() * shapes.length)],
    color: colors[Math.floor(Math.random() * colors.length)]
  }
}
function getRandomAttributes() {
  const attributeKeys = ['married', 'kids', 'drunk', 'nogym', 'nightshift']
  const shuffled = shuffleArray(attributeKeys)
  const maxTrue = Math.floor(Math.random() * 4) // 0 to 3

  const temp = {}
  shuffled.forEach((key, index) => {
    temp[key] = index < maxTrue
  })

  // Rebuild object in original attributeKeys order
  const result = {}
  attributeKeys.forEach(key => {
    result[key] = temp[key] || false
  })

  return result
}

function getRandomDuoStat() {
  let result = 0
  for(let i = 0; i < 2 ; i++) {
    const roll = Math.random()
    if (roll < 0.1) result += 1
    else if (roll < 0.3) result += 2
    else if (roll < 0.7) result += 3
    else if (roll < 0.9) result += 4
    else result += 5
  }
  return result
}

function getRandomBigStat() {
  // Bias towards middle of 1–50
  return Math.floor(Math.random() * 50)
}

function calculateAcquireCost(avgStat) {
  const scale = avgStat - 1
  return {
    beer: Math.round(scale * (Math.random() * 2 + 1)),
    charm: Math.round(scale * (Math.random() * 1 + 1)),
    money: Math.round(scale * (Math.random() * 4 + 1))
  }
}

export default class PlayerGenerationService {
  static generatePlayersList(count = 300) {
    const availableFirstNames = [...firstNames]
    const availableLastNames = [...lastNames]
    const players = []

    // Calculate counts for each position
    const defenseCount = Math.floor(count * 0.33)
    const forwardCount = count - defenseCount

    // Helper function to create a player with position
    function createPlayer(id, position) {
      const firstName = availableFirstNames.splice(Math.floor(Math.random() * availableFirstNames.length), 1)[0]
      const lastName = availableLastNames.splice(Math.floor(Math.random() * availableLastNames.length), 1)[0]

      const stats = {
        INT: position !== 'G' ? getRandomStat() : 0,
        SKL: position !== 'G' ? getRandomStat() : 0,
        SPD: position !== 'G' ? getRandomStat() : 0,

        SHT: position !== 'G' ? getRandomStat() : 0,
        PAS: position !== 'G' ? getRandomStat() : 0,
        DEX: position !== 'G' ? getRandomStat() : 0,

        FO: position === 'D' || position === 'G' ? 0 : getRandomBigStat(),
        AGG: position === 'G' ? 0 : getRandomBigStat()
      }
      const goalieStats = {
        ANT: position === 'G' ? getRandomStat() : 0,
        REF: position === 'G' ? getRandomDuoStat() : 0,
        ANG: position === 'G' ? getRandomStat() : 0,
      }
      const coreStats = ['INT', 'SKL', 'SPD', 'SHT', 'PAS', 'DEX']
      const coreGoalieStats = ['ANG', 'REF', 'ANT']
      const avgStat = coreStats.reduce((sum, key) => sum + stats[key], 0) / coreStats.length
      const avgGoalieStats = coreGoalieStats.reduce((sum, key) => sum + goalieStats[key], 0) / coreGoalieStats.length

      const acquire = calculateAcquireCost(position === "G" ? avgGoalieStats : avgStat)
      const attributes = getRandomAttributes()
      const personnality = getRandomPersonality()
      return new Player({
        id,
        info: {
          name: `${firstName} ${lastName}`,
          position,
          personnality,
        },
        stats,
        goalieStats,
        acquire,
        attributes,
      })
    }

    // Generate Defense players
    for (let i = 0; i < defenseCount; i++) {
      players.push(createPlayer(i, 'D'))
    }

    // Generate Forward players
    for (let i = 0; i < forwardCount; i++) {
      players.push(createPlayer(defenseCount + i, 'F'))
    }
    // Generate Forward players
    for (let i = 0; i < 40; i++) {
      players.push(createPlayer(defenseCount + forwardCount + i, 'G'))
    }



    return players
  }
  static rebuildPlayer(data) {
    return new Player(data)
  }
}
