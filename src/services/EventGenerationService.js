import hockeyEvents from "@/data/events"

export default class EventGenerationService {
  // Fisher-Yates shuffle
  static shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[array[i], array[j]] = [array[j], array[i]]
    }
    return array
  }

  static generateEventsList() {
    const deck = [];
    hockeyEvents.forEach(event => {
      for (let i = 0; i < event.amountOfCards; i++) {
        deck.push({ ...event })
      }
    })
    return this.shuffle(deck)
  }
}
