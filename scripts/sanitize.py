import re

if __name__ == "__main__":
    with open("./raw-skills.txt") as f:
        txt = f.read()

    out = txt

    for (s, r) in [
        ("\|\+1-", "|+10"),
        ("Bomb boost", "Bomb Boost"),
        ("\[\[Category:MH3]]\n", ""),
        ("Reload speed", "Reload Speed"),
        ("Item use", "Item Use"),
        ("Item Use down", "Item Use Down"),
        ("trap Master", "Trap Master"),
        ("Recovery speed", "Recovery Speed"),
    ]:
        out = re.sub(s, r, out)

    with open("./raw-skills-sanitized.txt", "w") as f:
        f.writelines(out)
