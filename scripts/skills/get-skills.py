# raw skill list gotten from here:
# https://monsterhunter.neoseeker.com/w/index.php?title=Skills_MH3&action=edit

import re
import json

if __name__ == "__main__":
    # read input
    with open("./raw-skills.txt") as f:
        txt = f.read()

    # sanitize input
    for (s, r) in [
        ("\|\+1-", "|+10"),
        ("Bomb boost", "Bomb Boost"),
        ("\[\[Category:MH3]]\n", ""),
        ("Reload speed", "Reload Speed"),
        ("Item use", "Item Use"),
        ("Item Use down", "Item Use Down"),
        ("trap Master", "Trap Master"),
        ("Recovery speed", "Recovery Speed"),
        ("Critcal Eye", "Critical Eye"),
        ("UP", "Up"),
        ("({{Skills}})\n(\<br \/>)\n(This is a list of skills .*)(\n\n)", ""),
        ('(\|-)(style|sytle)?(:|=)?(".*")?(\n|$)', ""),
        ("\|}\n", ""),
        ("{\|(.*)\n", ""),
        ("\!(.*)\n", ""),
    ]:
        txt = re.sub(s, r, txt)

    # initiate tables
    tables = txt.split("\n\n")
    skill_counter = 0
    skills = []
    activations = []
    categories = []

    # iterate over all tables
    for category, table in enumerate(tables):
        split_table = table.splitlines()
        title = table[1 : table[1:].find("=") + 1]
        categories.append(title)

        activation_finder = re.compile(
            "(\|)([^\|]*)\|\|([^\|]*)\|\|([^\|]*)\|\|([^\|]*)\|\|([^\|]*)(\n|$)"
        )
        name_finder = re.compile('(\|)(rowspan="\d"\|)?([^\|]*)(\n|$)')
        name_exclusions = [
            re.compile("(=)(.*)(=)"),  # table name
            re.compile('(\|)(colspan="2"\|)?(Auto Guard) '),  # special exception
            activation_finder,
        ]

        # find skill names
        skills_of_table = []
        for i, line in enumerate(split_table):
            if any([x.search(line) for x in name_exclusions]):
                continue

            name = name_finder.search(line).groups()[2]
            skills.append([name, i, skill_counter])
            skills_of_table.append([name, i, skill_counter])
            skill_counter += 1

        # find all activations
        for (skill_name, line_number, skill_id) in skills_of_table:
            if skill_name == "Auto Guard":  # special exception
                skill_activation = {
                    "name": "Auto Guard",
                    "requiredPoints": 10,
                    "requiredSkill": skill_id,
                    "isPositive": True,
                    "category": category,
                }
                activations.append(skill_activation)

            for i, line in enumerate(split_table[line_number + 1 :]):
                result = activation_finder.search(line)
                if not result:
                    break

                if line.startswith('|colspan="2"|Torso Up||'):  # special exception
                    break

                act_name = result.groups()[1].strip()
                act_points = int(result.groups()[5])

                skill_activation = {
                    "name": act_name,
                    "requiredPoints": act_points,
                    "requiredSkill": skill_id,
                    "isPositive": act_points > 0,
                    "category": category,
                }
                activations.append(skill_activation)

    # build skill name map
    skill_name_map = {}
    for (skill_name, line_number, skill_id) in skills:
        skill_name_map[skill_id] = skill_name

    # build skill activation map
    skill_activation_map = {}
    for (skill_name, line_number, skill_id) in skills:
        skill_activation_map[skill_id] = []
    for activation in activations:
        id = activation["requiredSkill"]
        skill_activation_map[id].append(activation)

    # save files
    with open("../../data/skill-names.json", "w") as f:
        f.write(json.dumps(skill_name_map, indent=4))
    with open("../../data/skills.json", "w") as f:
        f.write(json.dumps(skill_activation_map, indent=4))
    with open("../../data/skill-categories.json", "w") as f:
        f.write(json.dumps(categories, indent=4))
