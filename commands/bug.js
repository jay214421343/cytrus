exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
  try {
    let msg;
    
    switch (args[0]) {
      case 'add':
        msg = await message.channel.send('Creating report...');
        
        await client.bugs.set(message.author.id+message.id, {txt: args.slice(1).join(' '), id: message.author.id+message.id, author: message.author.id});
        msg.edit('Bug report created with the ID of ' + message.author.id+message.id);
        break;
      case 'remove':
        if (client.bugs.has(args[1])) {
          if (level < 6) return message.reply(`You do not have permission to use this command exention.
Your permission level is ${level} (${client.config.permLevels.find(l => l.level === level).name})
This command requires level 6 (Bot Support)`);
          msg = await message.channel.send('Deleting bug report...');

          await client.bugs.delete(args[1]);
          msg.edit('Bug report deleted with the ID of ' + args[1]);
        } else message.reply('That is not a valid ReportID!');
        break;
      case 'clear':
        if (level < 6) return message.reply(`You do not have permission to use this command exention.
Your permission level is ${level} (${client.config.permLevels.find(l => l.level === level).name})
This command requires level 6 (Bot Support)`);
        await client.bugs.forEach((report)  => {
          client.bugs.delete(report.id);
        });
        
        message.channel.send('Cleared the bugs reports!');
        break;
      default:
          let output = '';

          await client.bugs.forEach((report)  => {
            output += '•' + '*' + report.id + '*\n' + report.txt + '\n\n';
          });

          if (output == '') message.reply('There are no bugs reports!');
          else message.channel.send(output);
        break;
    }
  } catch (err) {
    message.channel.send('There was an error!\n' + err).catch();
  }
};

exports.conf = {
  enabled: true,
  aliases: [],
  guildOnly: false,
  permLevel: 'User'
};

exports.help = {
  name: 'bug',
  category: 'System',
  description: 'Generates a bug report',
  usage: 'bug [add [text]/remove [id]]'
};
