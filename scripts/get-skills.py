import json

if __name__ == "__main__":
    # read input
    with open("./parsed-skills.json") as f:
        skills = list(json.loads(f.read()))
    with open("./parsed-skill-map.json") as f:
        skill_map = json.loads(f.read())

    # init output
    skill_names = {}
    skill_activations = {}
    id_mapping = {}

    # iterate over skills
    name_list = [x["name"] for x in skill_map.values()]
    for (i, skill) in enumerate(skills[: len(skills) - 1]):  # remove Torso Up
        # get attributes
        name = skill["name"]
        mapped_i = str(name_list.index(name))
        mapped = skill_map[mapped_i]
        category = mapped["category"]
        id = mapped["id"]

        # build activations
        activations = []
        for (key, val) in skill["bounds"].items():
            p = int(key)
            act = {
                "name": val,
                "requiredPoints": p,
                "requiredSkill": id,
                "isPositive": p > 0,
                "category": category,
            }
            activations.append(act)

        # populate output
        skill_names[id] = name
        skill_activations[id] = activations
        id_mapping[i] = id

    # save files
    with open("../data/skill-names.json", "w") as f:
        f.write(json.dumps(skill_names, indent=4, sort_keys=True))
    with open("../data/skills.json", "w") as f:
        f.write(json.dumps(skill_activations, indent=4, sort_keys=True))
    with open("./parsed-id-mapping.json", "w") as f:
        f.write(json.dumps(id_mapping, indent=4, sort_keys=True))
