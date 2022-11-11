import re
import json

# gets skills categories and ids from wiki data
# note: this script is quite messy cause it used to do a lot more and when refactoring i just got it to the point of working
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
    categories = []

    # iterate over all tables
    for category, table in enumerate(tables):
        split_table = table.splitlines()
        title = table[1 : table[1:].find("=") + 1]
        categories.append(title)

        name_finder = re.compile('(\|)(rowspan="\d"\|)?([^\|]*)(\n|$)')
        name_exclusions = [
            re.compile("(=)(.*)(=)"),  # table name
            re.compile('(\|)(colspan="2"\|)?(Auto Guard) '),  # special exception
            re.compile(
                "(\|)([^\|]*)\|\|([^\|]*)\|\|([^\|]*)\|\|([^\|]*)\|\|([^\|]*)(\n|$)"
            ),
        ]

        # find skill names
        skills_of_table = []
        for i, line in enumerate(split_table):
            if any([x.search(line) for x in name_exclusions]):
                continue

            name = name_finder.search(line).groups()[2]
            skills.append([name, i, skill_counter, category])
            skills_of_table.append([name, i, skill_counter, category])
            skill_counter += 1

    # names in this wiki data are not accurate, map to correct names
    name_replacements = {
        "Normal S Up": "NormalS Up",
        "Pierce S Up": "PierceS Up",
        "Pellet S Up": "PelletS Up",
        "Status Attack": "Status",
        "Elemental Attack": "Elemental",
        "Evade Distance": "Evade Dist",
        "Fast Charge": "FastCharge",
        "Free Element": "FreeElemnt",
        "Sharpening": "Sharpener",
        "Reload": "Reload Spd",
        "Clust": "Clust S+",
        "Wide Range": "Wide-Range",
        "Wind-Proof": "Wind Res",
        "Tremor-Proof": "Tremor Res",
        "Thunder Res": "ThunderRes",
        "Constitution": "Constitutn",
        "Theft": "Anti-Theft",
        "Transporter": "Transportr",
        "Heat Cancel": "Heat Res",
        "Cold Cancel": "Cold Res",
        "BBQ ": "BBQ",
        "Speed Setup": "SpeedSetup",
        "Preception": "Perception",
        "Current Res": "CurrentRes",
        "Auto Guard": "Auto-Guard",
        "Lasting Power": "LastingPwr",
    }

    # build skill name map
    skill_id_map = {}
    for (skill_name, line_number, skill_id, category) in skills:
        if skill_name in name_replacements:
            skill_name = name_replacements[skill_name]
        skill_id_map[skill_id] = {
            "name": skill_name,
            "category": category,
            "id": skill_id,
        }

    # save files
    with open("./parsed-skill-map.json", "w") as f:
        f.write(json.dumps(skill_id_map, indent=4))
    with open("../data/skill-categories.json", "w") as f:
        f.write(json.dumps(categories, indent=4))
