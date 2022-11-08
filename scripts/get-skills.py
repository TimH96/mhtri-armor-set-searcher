# raw skill list gotten from here:
# https://monsterhunter.neoseeker.com/w/index.php?title=Skills_MH3&action=edit
# data has been sanitized just a little

import re

if __name__ == "__main__":
    skill_counter = 0

    with open("./raw-skills-sanitized.txt") as f:
        txt = "".join(f.readlines()[4:])
    tables = txt.split("\n\n")
    
    for category, table in enumerate(tables):
        split_table = table.splitlines()
        title = table[1:table[1:].find("=")+1]

        activation_exclusions = [
            re.compile('(\|-)(style=".*")?(style:".*")?(\n|$)'), # placeholders
        ]
        activation_finder = re.compile('(\|)([^\|]*)\|\|([^\|]*)\|\|([^\|]*)\|\|([^\|]*)\|\|([^\|]*)(\n|$)')

        name_finder = re.compile('(\|)(rowspan="\d"\|)?([^\|]*)(\n|$)')
        name_exclusions = [
            re.compile('(=)(.*)(=)'), # table name
            re.compile('{\|'), # table start
            re.compile('\|}'), # table end
            re.compile('\!'), # table header
            re.compile('[[Category:MH3]]'), # document end
            re.compile('(\|)(colspan="2"\|)?(Auto Guard) '), # special exception
            activation_finder
        ] + activation_exclusions

        skills = []
        for i, line in enumerate(split_table):
            if any([x.search(line) for x in name_exclusions]):
                continue
            
            name = name_finder.search(line).groups()[2]
            skills.append([name, i, skill_counter])
            skill_counter += 1

        for (skill_name, line_number, skill_id) in skills:
            if skill_name == "Auto Guard": # special exception
                skill_activation = {
                    "name": "Auto Guard",
                    "requiredPoints": 10,
                    "requiredSkill": skill_id,
                    "isPositive": True,
                    "category": category,
                }
                print(skill_activation)

            for i, line in enumerate(split_table[line_number+1:]):
                if any([x.search(line) for x in activation_exclusions]):
                    continue

                result = activation_finder.search(line)
                if not result:
                    break

                if line.startswith('|colspan="2"|Torso Up||'): # special exception
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
                print(skill_activation)


