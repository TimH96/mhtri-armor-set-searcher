import ArmorPiece from "./models/equipment/ArmorPiece"

const getRawData = async (url: string) => {
    return (await fetch(url)).json()
}

const getHead = async (): Promise<ArmorPiece[]> => {
    return getRawData("./head.json") as unknown as ArmorPiece[]
}

const getChest = async () => {
    return getRawData("./chest.json")
}

const getArms = async () => {
    return getRawData("./arms.json")
}

const getWaist = async () => {
    return getRawData("./waist.json")
}

const getLegs = async () => {
    return getRawData("./legs.json")
}

const getDecorations = async () => {
    return getRawData("./decorations.json")
}

export {
    getRawData,
    getHead,
    getChest,
    getArms,
    getWaist,
    getLegs,
    getDecorations,
}