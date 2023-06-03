# MH3 Armor Set Searcher

## About

This is an armor set searcher for the game Monster Hunter Tri, as seen for many of the newer (and even older) Monster Hunter games. Oddly enough, there wasn't one for this game when almost every other entry in the series has one, so now here it is 13 years after the fact. Put in your charms, select the skills you want to have and hopefully find your sets. The website is hosted [right here](https://timh96.github.io/mhtri-armor-set-searcher/) on GitHub via gh-pages.

The development of this was driven by the revival of the online features and return to Loc Lac by the community developed and hosted servers. Here you can find the [MH3SP repository](https://github.com/sepalani/MH3SP) and the related [community Discord server](https://discord.com/invite/4sBmXC55V6).

## Development

### Dependencies

- Node v14 or higher to run and develop the actual app
- Python v3.9 or higher to run the data scripts

### Init

Clone the repo and install its dependencies.

```shell
$ git clone https://github.com/TimH96/mhtri-armor-set-searcher
$ cd mhtri-armor-set-searcher
$ npm i
```

### Run development server

```shell
$ npm run start
```

### Build and deploy

```shell
$ npm run build
$ npm run deploy
```

### Run data scripts

```shell
$ cd scripts
$ python get-skill-categories.py
$ python get-skills.py
$ python get-equipment-and-decos.py
```

## Known issues

This is a list of currently known bugs or other issues with the searcher. I believe these are low priority and I don't consider them worth the effort fixing. Please do not report them.

+ The searcher will sometimes recommend too many decorations, "overkilling" on a skill when it doesn't need to. The resulting set is still valid and fullfills all requirements, and this only happens with unoptimized sets with plenty of slots to spare. This is the case because of how the decoration search logic works, and fixing it would require reimagining the current approach entirely.
+ The searcher struggles with sets that include 2 or more skills which commonly cancel each other out, that is to say that decorations/armor pieces that have skill A often have negative points in skill B. The searcher is still complete in finding these sets, however it might take quite some time, especially when using the "More Skills" feature. The app should not crash and you can simply wait for the search to complete. This happens because some of the heuristics that are used to prune search paths don't properly work when considering negative skills, and fixing it would require reimagining said heuristics entirely.
+ The frontend code is a mess. I started writing simple script-style JavaScript like we are in 2010. Started out very good, but as scope and my laziness grew it became quite ugly. This should not impede on function however. Maybe one day I will rewrite it in some very baseline framework, or in webcomponents.
