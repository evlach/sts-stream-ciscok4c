const sdk = require('@cedalo/sdk-streams');
const RestClientProducer = require('./Ck4CProducer');
const RestClientProviderConfiguration = require('./Ck4CProviderConfiguration');

module.exports = class RestClientProvider extends sdk.Provider {
	constructor(config) {
		super(new RestClientProviderConfiguration(config));
	}

	get canConsume() {
		return false;
	}

	get Producer() {
		return RestClientProducer;
	}
};
