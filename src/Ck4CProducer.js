const Ck4CConnector = require('./Ck4CConnector');
const { ProducerMixin, Connector, RequestResponse } = require('@cedalo/sdk-streams');

module.exports = class Ck4CProducer extends ProducerMixin(Ck4CConnector) {
	constructor(config) {
		super({ ...config, type: Connector.TYPE.PRODUCER });
	}

	async request(config_) {
		const requestId = config_.Metadata.requestId;
		const config = config_.Data;
		const { query } = config;

		this.logger.debug(JSON.stringify(config.Data));
		let response;
		const result = {
			Metadata: {
				query
			},
			Data: {}
		};
		if(this._client) {
			try {
				result.data = await this._client.query(query);
				return new RequestResponse(response, requestId);
			} catch (e) {
				this.handleWarningOnce(e);
			}
		} else {
			this.handleErrorOnce(new Error('NOT_CONNECTED'));
		}
	}



	async dispose() {
		// Discard all open requests
		this.handleResponse = () => null;
	}

	handleResponse(response) {
		return response;
	}
};
