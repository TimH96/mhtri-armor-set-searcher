# Scripts

These scripts are used to scrape and parse the game data from other sources into a workable format. They are not part of the actual app, but rather are kept here for documentation and repeatability in case the data model every requires some changes. There are some dependency between the scripts, so the order of execution matter and goes as follows:

1. `get-skill-categories.py`
2. `get-skills.py`
3. `get-equipment-and-decos.py`

## Sources

### Skill Categories

Skill categories were obtained from the edit view of [this neoseeker wiki](https://monsterhunter.neoseeker.com/w/index.php?title=Skills_MH3). They are parsed using the `get-skill-categories.py` script.

### Skills, Equipment and Decorations

All the equipment and decoration data, as well as exact skill names, were obtained from source inspection (Ctrl+U) of the web archive of [this setbuilder](https://web.archive.org/web/20200725050434/http://mhtri.stilltruth.com/armor.html). The `parsed-decos.json`, `parsed-skills.json` and `parsed-armor.json` files were arranged manually from there. The data is parsed using the `get-skills.py` and `get-equipment-and-decos.py` scripts.
