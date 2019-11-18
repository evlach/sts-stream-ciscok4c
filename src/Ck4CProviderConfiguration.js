const { ProviderConfiguration } = require('@cedalo/sdk-streams');

module.exports = class Ck4CProviderConfiguration extends ProviderConfiguration {
	constructor() {
		super({
			name: 'Cisco Client for Cities provider'
		});

		this.canConsume = false;
		this.canProduce = true;

		this.addConnectorDefinition({
			id: 'client_id',
			label: 'Client ID',
			type: ProviderConfiguration.FIELDTYPES.TEXT
		});

		this.addConnectorDefinition({
			id: 'client_secret',
			label: 'Client Secret',
			type: ProviderConfiguration.FIELDTYPES.PASSWORD
		});

		this.addConnectorDefinition({
			id: 'username',
			label: {
				en: 'User Name',
				de: 'Benutzername'
			}
		});

		this.addConnectorDefinition({
			id: 'password',
			label: {
				en: 'Password',
				de: 'Kennwort'
			},
			type: ProviderConfiguration.FIELDTYPES.PASSWORD
		});

		this.addFunctionDefinition(
			this.requestFunction((target, resultKeys, timeout) => ({
				name: 'CKC.QUERY',
				baseFunction: 'request',
				parameters: [
					{
						id: 'query',
						label: 'Query',
						description: {
							en: 'JSON used for the query',
							de: 'JSON das für Query benutzt wird',
							el: 'JSON για χρήση σαν ερώτηση'
						},
						type: {
							name: 'json'
						},
						defaultValue: {}
					},
					target,
					resultKeys,
					timeout
				]
			}))
		);
	}
};
