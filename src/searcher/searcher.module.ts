import { getArms, getChest, getHead, getLegs, getWaist } from "../data-provider/data-provider.module"

const search = async () => {
    const head = await getHead()
    const chest = await getChest()
    const arms = await getArms()
    const waist = await getWaist()
    const legs = await getLegs()

    console.log(head[0].skills)
    console.log(head[0].skills["0001"])
}

export { search }