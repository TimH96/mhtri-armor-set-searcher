import json

if __name__ == "__main__":
    # read input
    with open("./parsed-armor.json") as f:
        armor = json.loads(f.read())
    with open("./parsed-decos.json") as f:
        decos = list(json.loads(f.read()))
    with open("./parsed-id-mapping.json") as f:
        id_map = json.loads(f.read())

    # init output
    pieces_per_category = []

    # iterate over armor
    for (armor_category, (_, c)) in enumerate(armor.items()):
        pieces_of_cat = []
        for piece in c["pieces"]:
            defense = {
                "base": piece["defense"],
                "max": piece.get("maxdefense", piece["defense"]),
            }
            lr_def = piece.get("maxlrdefense", None)
            if lr_def:
                defense["maxLr"] = lr_def
            res = [
                piece["fireres"],
                piece["waterres"],
                piece["iceres"],
                piece["thunderres"],
                piece["dragonres"],
            ]
            b = piece["blade"]
            g = piece["gunner"]
            t: int
            if b and g:
                t = 0
            elif b:
                t = 1
            else:
                t = 2
            new_s = {id_map[k]: v for (k, v) in piece["skills"].items()}

            modeled_piece = {
                "name": piece["name"],
                "slots": piece["slots"],
                "category": armor_category,
                "rarity": piece["rarity"],
                "type": t,
                "defense": defense,
                "resistance": res,
                "skills": new_s,
            }
            pieces_of_cat.append(modeled_piece)
        pieces_per_category.append(pieces_of_cat)

    # iterate over decorations
    new_decos = []
    for d in decos:
        new_s = {id_map[k]: v for (k, v) in d["skills"].items()}
        modeled_deco = {
            "name": d["name"],
            "requiredSlots": d["slots"],
            "skills": new_s,
            "rarity": d["rarity"],
        }
        new_decos.append(modeled_deco)

    # save files
    for (i, cat_name) in enumerate(["head", "chest", "arms", "waist", "legs"]):
        with open(f"../data/{cat_name}.json", "w") as f:
            f.write(json.dumps(pieces_per_category[i], indent=4, sort_keys=True))
    with open("../data/decorations.json", "w") as f:
        f.write(json.dumps(new_decos, indent=4, sort_keys=True))
