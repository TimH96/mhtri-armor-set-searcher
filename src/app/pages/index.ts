import { getArms, getChest, getHead, getLegs, getWaist } from "../../data-provider/data-provider.module"
import DataInput from "../../searcher/models/DataInput"
import { search } from "../../searcher/searcher.module"

async function main() {
    const data: DataInput = {
        head: await getHead(),
        chest: await getChest(),
        arms: await getArms(),
        waist: await getWaist(),
        legs: await getLegs(),
        decorations: undefined,
        charms: [],
    }

    search(data)
}

main()
