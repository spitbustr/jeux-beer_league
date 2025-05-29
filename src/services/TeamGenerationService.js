import cities from "@/data/cities"
import colors from "@/data/colors"
import altNames from "@/data/altNames"

import lastNames from "@/data/lastNames"
import Player from "@/models/Player"
import Jersey from "@/models/Jersey"
import Team from "@/models/Team"
import store from "@/store"

export default class TeamGenerationService {
    static generateTeamsList(count = 20) {
        const getLogoColor = (main, secondary) => {
            const darkColors = [
                "#008080",
                "#800000",
                "#000080",
                "#1b1b1b",
                "#A52A2A",
                "#800080",
                "#0000FF",
                "#008000",
                "#808000",
            ]
            const lightColors = [
                "#808080",
                "#C0C0C0",
                "#FFD700",
                "#00FFFF",
                "#FF00FF",
                "#00FF00",
                "#FFFFFF",
                "#FFC0CB",
                "#FFFF00",
                "#FFA500",
                "#FF0000",
            ]
            const isDark = color => darkColors.map(color => color.toLowerCase()).includes(color.toLowerCase())
            const isLight = color => lightColors.map(color => color.toLowerCase()).includes(color.toLowerCase())
            if (isDark(main) && isDark(secondary)) return "#FFFFFF"
            if (isLight(main) && isLight(secondary)) return "#000000"
            return secondary;
        }
        // Shuffle cities and colors
        const shuffledCities = [...cities].sort(() => 0.5 - Math.random())
        let availableMainColors = [...colors].sort(() => 0.5 - Math.random())
        const logos = store.getters["images"].logos
            .sort(() => 0.5 - Math.random())
            .filter((item, index) => index < count)
        const teams = logos.sort(() => 0.5 - Math.random()).map((filename, index) => {
            let baseName = filename.replace(/\.png$/, '')
                .split('-')
                .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' ');

            const city = shuffledCities[index]
            const mainColor = availableMainColors.pop()

            const secondaryColor = colors[Math.floor(Math.random() * colors.length)]
            const shuffleJerseys = store.getters["jerseys"].sort(() => 0.5 - Math.random())
            const jersey = shuffleJerseys[0]
            if(altNames?.[filename]?.length) {
                const allNames = [filename, ...altNames?.[filename]]
                baseName = allNames.sort(() => 0.5 - Math.random())[0]
                    .split(' ')
                    .map(word =>
                        word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
                    )
                    .join(' ')
            }
            return {
                id: index,
                fullName: `${city} ${baseName}`,
                name: `${baseName}`,
                city,
                jersey: {
                    image: jersey,
                    colors: {
                        main: mainColor,
                        secondary: secondaryColor
                    },
                },
                logo: {
                    image: filename,
                    colors: {
                        main: getLogoColor(mainColor, secondaryColor)
                    }
                }
            }
        })
        return teams
    }
}
