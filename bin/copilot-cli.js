#!/usr/bin/env node

const { program } = require('commander');
const chalk = require('chalk');
const inquirer = require('inquirer');
const packageJson = require('../package.json');

// Configure the CLI
program
  .name('copilot-cli')
  .description('A Copilot CLI tool for Malks NFT Garage')
  .version(packageJson.version);

function displayHelp() {
  console.log(chalk.cyan('\n🚀 Malks NFT Garage Copilot CLI\n'));
  console.log('Available commands:');
  console.log(chalk.green('  copilot-cli help') + '       - Display this help message');
  console.log(chalk.green('  copilot-cli version') + '    - Display version information');
  console.log(chalk.green('  copilot-cli interactive') + ' - Start interactive mode');
  console.log(chalk.green('  copilot-cli info') + '        - Display project information\n');
}

// Help command
program
  .command('help')
  .description('Display help information')
  .action(displayHelp);

// Interactive command
program
  .command('interactive')
  .description('Start interactive mode')
  .action(async () => {
    console.log(chalk.cyan('\n🤖 Welcome to Copilot CLI Interactive Mode!\n'));
    
    const answers = await inquirer.prompt([
      {
        type: 'list',
        name: 'action',
        message: 'What would you like to do?',
        choices: [
          'View project information',
          'Display help',
          'Exit'
        ]
      }
    ]);

    switch (answers.action) {
      case 'View project information':
        displayProjectInfo();
        break;
      case 'Display help':
        displayHelp();
        break;
      case 'Exit':
        console.log(chalk.yellow('Goodbye! 👋\n'));
        process.exit(0);
        break;
    }
  });

// Info command
program
  .command('info')
  .description('Display project information')
  .action(() => {
    displayProjectInfo();
  });

function displayProjectInfo() {
  console.log(chalk.cyan('\n📦 Project Information\n'));
  console.log(chalk.white('Name: ') + chalk.green(packageJson.name));
  console.log(chalk.white('Version: ') + chalk.green(packageJson.version));
  console.log(chalk.white('Description: ') + chalk.green(packageJson.description));
  console.log(chalk.white('Author: ') + chalk.green(packageJson.author));
  console.log(chalk.white('License: ') + chalk.green(packageJson.license));
  console.log('');
}

// If no command is specified, display help
if (!process.argv.slice(2).length) {
  displayHelp();
  process.exit(0);
}

// Parse arguments
program.parse(process.argv);
