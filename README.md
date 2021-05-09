# Cupido
A discord bot used for [speeddating](https://en.wikipedia.org/wiki/Speed_dating).

## Details
This Bot you can run the following commands (and more):
* ```init```: Create a new category with a new lobby. Everyone who is in the lobby participates in speeddating.
* ```shuffle```: Creates new voice channels and randomly allocates users from the channel lobby to the new voice channels. The number of users per voice channel will passed as argument.
* ```stop```: Move every user back from the new voice channels to lobby and delete the new voice channels (except lobby and the category)
* ```auto_shuffle```: Iterates shuffle and stop. The number of iterations, as well as the duration of an iteration will passed as argument
* ```destroy```: Delete all created channels (this includes also lobby and the category)
* ```move```: Move members from one channel to another

## Preparations
* You need [node.js](https://nodejs.org/en/) and [discord.js](https://discord.js.org/#/) installed
* You need a [Discord API Bot](https://discord.com/developers/applications) with it's token
* You need a [Discord server](https://support.discord.com/hc/en-us/articles/204849977-How-do-I-create-a-server) that you have 
  Manage rights to, so you can invite the bot and give it the following permissions:
  * Manage Channels
  * View Channels
  * Send Messages
  * Read Message History
  * Move Members

## Configuration
1. Rename the configuration file *(/config/config-template.json)* from ```config-template.json``` to ```config.json```
2. Open the configuration file (now ```config.json```) and set:
   * your bot's prefix
   * your bot's token
   * admin id's: Enter a discord user id in quotation marks and separate several with a comma ```[ "<id>", "<id>", ..., "<id>"]```.\
     These are the only users who have the permission to execute the commands of this bot
3. Run ```npm install```

## Run
Run ```index.js``` with ```npm start``` or ```node index.js```

