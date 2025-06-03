import hockeyEvents from "@/data/events"

export default class EventGenerationService {
  // Fisher-Yates shuffle
  static shuffleArray(array) {
    const arr = [...array]; // create a shallow copy to avoid mutating the original
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1)); // random index from 0 to i
      [arr[i], arr[j]] = [arr[j], arr[i]]; // swap elements
    }
    return arr;
  }

  static generateEventsList() {
    const deck = [];
    hockeyEvents.forEach(event => {
      for (let i = 0; i < event.amountOfCards; i++) {
        deck.push({...event,type: "EventCard"})
      }
    })
    return this.shuffleArray(this.shuffleArray(deck))
  }
}
