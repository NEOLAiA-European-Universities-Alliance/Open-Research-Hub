'use strict';

/**
 * researcher-search-stat controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

const ALLOWED_KINDS = ['term', 'query_combination'];

module.exports = createCoreController('api::researcher-search-stat.researcher-search-stat', ({ strapi }) => ({
  async top(ctx) {
    const limit = Math.min(Number(ctx.query.limit) || 20, 100);
    const kind = ctx.query.kind;
    const where = {};

    if (kind && ALLOWED_KINDS.includes(kind)) {
      where.kind = kind;
    }

    return strapi.db.query('api::researcher-search-stat.researcher-search-stat').findMany({
      where,
      orderBy: [
        { count: 'desc' },
        { last_searched_at: 'desc' },
      ],
      limit,
    });
  },
}));
