const { Connector } = require('@cedalo/sdk-streams');
const CKC = require('ckc-api');

module.exports = class Ck4CConnector extends Connector {
	constructor(config) {
		super(config);
		this._client = null;
	}

	async connect() {
		const { client_secret, client_id, username, password} = this.config.connector;
		const ckcConfig = { client_secret, client_id, username, password };
		try {
			this._client =  await CKC.Client.connect(ckcConfig);
			this.setConnected();
			// this._capabilities = await this._client.getCustomerCapabilities();
			// this.logger.debug(JSON.stringify(this._capabilities));
		} catch (e) {
			this.handleError(e);
		}
	}

	async dispose() {
		// do nothing
	}

};
