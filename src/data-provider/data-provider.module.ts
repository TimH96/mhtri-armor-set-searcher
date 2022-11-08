const getRawData = async (url: string) => {
    return (await fetch(url)).json()
}

const getHead = async () => {
    return getRawData("./head.json")
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