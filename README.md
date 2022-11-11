# MH3 Armor Set Searcher

## About

This is an armor set searcher for the game Monster Hunter Tri, as seen for many of the newer (and even older) Monster Hunter games. Oddly enough, there wasn't one for this game when almost every other entry in the series has one, so now here it is 13 years after the fact. Put in your charms, select the skills you want to have and hopefully find your sets. The website is hosted [right here](TODO) on GitHub via gh-pages.

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
