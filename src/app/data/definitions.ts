export interface RawDecan {
    name: string;
    keyword: string;
    position: string;
    planet: string;
    sefirah: string;
    page: string;
    influence: string;
    places: string;
    materials: string;
    spell: string;
}

export interface Decan extends RawDecan {
    positionValue: number;
    mana: number;
}

export function addDecanDetails(decan: RawDecan): Decan {
    const postionParts: string[] = decan.position.split(' ')

    return {
        name: decan.name,
        keyword: decan.keyword,
        position: decan.position,
        planet: decan.planet,
        sefirah: decan.sefirah,
        page: decan.page,
        influence: decan.influence,
        places: decan.places,
        materials: decan.materials,
        spell: decan.spell,
        positionValue: (zodiacOrder[postionParts[0]] - 1) * 3 + parseInt(postionParts[1]),
        mana: 0
    }
}

export interface Coordinates {
    x: number,
    y: number,
    z: number
}

export const startOfCampaign = 19640213123
export const oneDay: number = 60 * 60 * 24
export const oneHour: number = 60 * 60
export const oneMinute: number = 60
export const timeDif: number = 6 * oneHour
export const speedMultiplier: number = 15

export const zodiacOrder: { [key: string]: number } = {
    'Aries': 1,
    'Taurus': 2,
    'Gemini': 3,
    'Cancer': 4,
    'Leo': 5,
    'Virgo': 6,
    'Libra': 7,
    'Scorpio': 8,
    'Sagittarius': 9,
    'Capricorn': 10,
    'Aquarius': 11,
    'Pisces': 12
}
export const planetOrbitalCycles: { [key: string]: number } = {
    "Moon": 30.0,
    "Mercury": 88.0,
    "Venus": 224.7,
    "Mars": 687.0,
    "Jupiter": 4331.0,
    "Saturn": 10747.0,
    "Sun": 365.25
}
export const opposingPlanets: { [key: string]: string | null } = {
    "Sun": "Moon",
    "Moon": "Sun",
    "Mercury": null,
    "Venus": "Mars",
    "Mars": "Venus",
    "Jupiter": "Saturn",
    "Saturn": "Jupiter"
}