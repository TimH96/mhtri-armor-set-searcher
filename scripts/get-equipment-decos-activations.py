import json

if __name__ == "__main__":
    # read input
    with open("./parsed-skills.json") as f:
        skills = list(json.loads(f.read()))
    with open("./parsed-armor.json") as f:
        armor = list(json.loads(f.read()))
    with open("./parsed-decos.json") as f:
        decos = list(json.loads(f.read()))
    with open("./parsed-skill-map.json") as f:
        skill_map = json.loads(f.read())

    for skill in skills[:len(skills)-1]:  # remove Torso Up
        name = skill["name"]

