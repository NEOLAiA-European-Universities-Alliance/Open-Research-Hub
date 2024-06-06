'use strict';

/**
 * research-info-survey router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::research-info-survey.research-info-survey', {
    config:{
        create: {
            middlewares: ["global::otp-auth","global::research_mapping_adapter"]
        },
        update: {
            middlewares: ["global::otp-auth","global::research_mapping_adapter"]
        },
        delete: {
            middlewares: ["global::otp-auth"]
        }
    }
});
