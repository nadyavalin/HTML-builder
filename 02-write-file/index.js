const fs = require('fs');
const readline = require('readline');

const file = './02-write-file/your-text.txt';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

fs.writeFile(file, '', (err) => {
  if (err) {
    console.error('Error! File was not created!', err);
  } else {
    console.log('File created successfully!');
    rl.setPrompt('Enter text or press "Ctrl + C" or type "exit" to quit: ');
    rl.prompt();
  }
});

const writeToFile = (text) => {
  fs.appendFile(file, text + '\n', (err) => {
    if (err) {
      console.error('Error! Your text was not written into the file!', err);
    } else {
      console.log('Text is written to file successfully!');
      rl.prompt();
    }
  });
};

rl.on('SIGINT', () => {
  console.log('\nIt was a great job!');
  rl.close();
});

rl.on('line', (input) => {
  if (input.toLowerCase() === 'exit') {
    console.log('It was a great job!');
    rl.close();
  } else {
    writeToFile(input);
  }
});
