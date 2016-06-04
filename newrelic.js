// New Relic agent configuration.
exports.config = {
    app_name: 'robocop',
    license_key: config.newrelic_key,
    logging: {
        /**
         * Level at which to log. 'trace' is most useful to New Relic when diagnosing
         * issues with the agent, 'info' and higher will impose the least overhead on
         * production applications.
         */
        level: 'info'
    }
};

