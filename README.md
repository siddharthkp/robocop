# robocop

![robo-cop](https://avatars3.githubusercontent.com/u/12710934?v=3&s=460)

Robocop is a code review tool.

How to setup

1. `cp config.json.format config.json`
2. Add a [personal access token](https://github.com/settings/tokens) to config
3. `node index.js` or `pm2 start index.js --name robocop` (recommeneded)
4. Create a [webhook](https://developer.github.com/webhooks/creating/) and point it to  (server-where-robocop-is-running)/hook. You can host it on the cloud or use [ngrock](https://ngrok.com/)




Shout out to [shreyans264](https://github.com/shreyans264/robo-cop)!

