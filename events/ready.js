const request = require('request');

module.exports = async client => {
  const statusList = [
    {msg: `for commands | ${client.config.defaultSettings.prefix}help | https://app.cytrus.ga`, type: 'WATCHING'},
    {msg: `with async/await errors | ${client.config.defaultSettings.prefix}help | https://app.cytrus.ga`, type: 'PLAYING'},
    {msg: `bitch lasagnia | ${client.config.defaultSettings.prefix}help | https://app.cytrus.ga`, type: 'LISTENING'},
    {msg: `PewDiePie | ${client.config.defaultSettings.prefix}help | https://app.cytrus.ga`, type: 'WATCHING'},
    {msg: `with unhandled promise rejections | ${client.config.defaultSettings.prefix}help | https://app.cytrus.ga`, type: 'PLAYING'},
    {msg: `with linux permissions | ${client.config.defaultSettings.prefix}help | https://app.cytrus.ga`, type: 'PLAYING'},
    {msg: `with my new web dashboard! | ${client.config.defaultSettings.prefix}help | https://app.cytrus.ga`, type: 'PLAYING'},
    {msg: `minecraft | ${client.config.defaultSettings.prefix}help | https://app.cytrus.ga`, type: 'PLAYING'},
    {msg: `Discord be slow | ${client.config.defaultSettings.prefix}help | https://app.cytrus.ga`, type: 'WATCHING'},
    {msg: `over ${client.guilds.size} servers | ${client.config.defaultSettings.prefix}help | https://app.cytrus.ga`, type: 'WATCHING'}
  ];

  setInterval(async () => {
    let index = Math.floor(Math.random() * statusList.length + 1) - 1;
    await client.user.setActivity(statusList[index].msg, {
      type: statusList[index].type
    });
  }, 5000);
  
  setInterval(async () => {
    request('https://app.cytrus.ga', (err, res, html) => {
      if (err) client.logger.error(err);
    });
  }, 28000);

  client.user.setStatus('idle');

  //Logs the Status
  client.logger.log(`Ram Usage: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB`, 'ready');
  client.logger.log(`Users: ${client.users.size.toLocaleString().replace(/ /g, '')}`, 'ready');
  client.logger.log(`Servers: ${client.guilds.size.toLocaleString().replace(/ /g, '')}`, 'ready');
  client.logger.log(`Channels: ${client.channels.size.toLocaleString().replace(/ /g, '')}`, 'ready');
  client.logger.log(`Discord.js: v${require('discord.js').version.replace(/ /g, '')}`, 'ready');
  client.logger.log(`Node.js: ${process.version.replace(/ /g, '')}`, 'ready');

  //Starts the web server/API
  require('../modules/web')(client);

  client.logger.log('Cytrus V' + require('../package').version + ' | https://github.com/CelestialCrafter/cytrus');
  client.startuptime = new Date().getTime() - client.starttime;
  client.logger.log('It took ' + client.startuptime + 'ms to start Cytrus');
};
