export type planet = {
    'name': string,
    'rotation_period': string,
    'orbital_period': string,
    'diameter': string,
    'climate': string,
    'gravity': string,
    'terrain': string,
    'surface_water': string,
    'population': string,
    'residents': string[],
    'films': string[],
    'created': string,
    'edited': string,
    'url': string,
}

export type film = {
    "title": string,
    "episode_id": number, 
    "opening_crawl": string,
    "director": string,
    "producer": string,
    "release_date": string,
    "characters": string[],

    "planets": string[],
    "starships": string[],
    "vehicles": string[],
    "species": string[],
    "created": string,
    "edited": string,
    "url": string,
}

export type residents = {
    "name": string,
    "height": string,
    "mass": string,
    "hair_color": string,
    "skin_color": string, 
    "eye_color": string,
    "birth_year": string,
    "gender": string,
    "homeworld": string,

    "films": string[],
    "species": string[],

    "vehicles": any[],
    "starships": any[],
    
    "created": string,
    "edited": string,
    "url": string,
}

export type data = {
    header: string[];
    values: planet[],
    'actions' : {
        'label' : string,
        'action': (row:planet) => void
    }[]
}

export function hasKey<O>(obj: O, key: keyof any): key is keyof O {
    return key in obj
}