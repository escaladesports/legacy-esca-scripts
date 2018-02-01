import meow from 'meow'

import pkg from '../package.json'
import help from './help'
import webpack from './webpack'
import serve from './serve'
import test from './test'
import reset from './reset'
import getStage from './serverless/get-stage'
import serverlessDeploy from './serverless/deploy'
import serverlessTest from './serverless/test'
import serverlessLogs from './serverless/logs'
import serverlessDev from './serverless/dev'
import serverlessBuild from './serverless/build'

const cli = meow(help, {
	flags: {
		banner: {
			type: 'string'
		},
		cli: {
			type: 'boolean'
		},
		env: {
			type: 'string',
			default: 'production'
		},
		minify: {
			type: 'boolean',
			default: true
		},
		dir: {
			type: 'string',
			default: './dist'
		},
		browser: {
			type: 'boolean'
		},
		open: {
			type: 'boolean',
			default: true
		},
		port: {
			type: 'string',
		},
		serverless: {
			type: 'boolean'
		},
		stage: {
			type: 'string',
			default: 'staging'
		},
		prompt: {
			type: 'boolean'
		},
		start: {
			type: 'string'
		},
		function: {
			type: 'string'
		},
	}
})

function operation() {
	if (cli.flags.serverless) {
		cli.flags.stage = getStage(cli.flags.stage)
		switch (cli.input[0]) {
			case 'serve':
			case 'dev':
				return serverlessDev(cli.flags)
			case 'test':
				return serverlessTest(cli.flags)
			case 'deploy':
				return serverlessDeploy(cli.flags)
			case 'logs':
				return serverlessLogs(cli.flags)
			case 'build':
				return serverlessBuild(cli.flags)
		}
	}

	switch (cli.input[0]) {
		case 'serve':
			return serve(cli.flags)
		case 'test':
			return test(cli.flags)
		case 'dev':
			return webpack(cli, true)
		case 'build':
			return webpack(cli)
		case 'reset':
			return reset(cli.flags)
	}
}
operation()