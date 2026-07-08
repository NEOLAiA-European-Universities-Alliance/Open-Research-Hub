'use strict';

/**
 * researcher-search-stat service
 */

const { createCoreService } = require('@strapi/strapi').factories;
const crypto = require('crypto');

const SEARCH_FIELDS = [
  { key: 'university', label: 'University' },
  { key: 'department', label: 'First level structure' },
  { key: 'faculty', label: 'Second level structure' },
  { key: 'research_unit_tours', label: 'Research unit Tours' },
  { key: 'specific_unit_tours', label: 'Specific research unit Tours' },
  { key: 'erc_area', label: 'ERC area' },
  { key: 'erc_panel', label: 'ERC panel' },
  { key: 'erc_keyword', label: 'ERC keyword' },
  { key: 'erc_area_int', label: 'Interested ERC area' },
  { key: 'erc_panel_int', label: 'Interested ERC panel' },
  { key: 'erc_keyword_int', label: 'Interested ERC keyword' },
  { key: 'researcher_name', label: 'Researcher name' },
  { key: 'researcher_surname', label: 'Researcher surname' },
];

const normalizeValue = (value) => (
  String(value || '')
    .trim()
    .replace(/\s+/g, ' ')
);

const normalizeKeyPart = (value) => normalizeValue(value).toLowerCase();

const buildUniqueKey = (kind, components) => {
  const rawKey = components
    .map((component) => `${component.field}:${normalizeKeyPart(component.value)}`)
    .sort()
    .join('|');
  const hash = crypto.createHash('sha256').update(rawKey).digest('hex');

  return `${kind}:${hash}`;
};

const buildLabel = (components) => (
  components.map((component) => `${component.label}: ${component.value}`).join(' & ')
);

const buildComponents = (searchParams = {}, keywords = []) => {
  const fieldComponents = SEARCH_FIELDS
    .map((field) => ({
      field: field.key,
      label: field.label,
      value: normalizeValue(searchParams[field.key]),
    }))
    .filter((component) => component.value);

  const keywordComponents = (Array.isArray(keywords) ? keywords : [])
    .map((keyword) => normalizeValue(keyword))
    .filter(Boolean)
    .map((keyword) => ({
      field: 'free_keyword',
      label: 'Free keyword',
      value: keyword,
    }));

  return [...fieldComponents, ...keywordComponents];
};

const buildStatRecords = (components) => {
  if (components.length === 0) {
    return [];
  }

  if (components.length === 1) {
    const component = components[0];

    return [{
      unique_key: buildUniqueKey('term', [component]),
      kind: 'term',
      field: component.field,
      value: component.value,
      label: buildLabel([component]),
      components: [component],
    }];
  }

  return [{
    unique_key: buildUniqueKey('query_combination', components),
    kind: 'query_combination',
    field: null,
    value: null,
    label: buildLabel(components),
    components,
  }];
};

module.exports = createCoreService('api::researcher-search-stat.researcher-search-stat', ({ strapi }) => ({
  async recordSearch({ searchParams = {}, keywords = [], resultCount = 0 }) {
    const now = new Date().toISOString();
    const normalizedKeywords = (Array.isArray(keywords) ? keywords : [])
      .map((keyword) => normalizeValue(keyword))
      .filter(Boolean);
    const normalizedSearchParams = SEARCH_FIELDS.reduce((params, field) => {
      params[field.key] = normalizeValue(searchParams[field.key]);
      return params;
    }, {});
    const components = buildComponents(normalizedSearchParams, normalizedKeywords);

    await strapi.db.query('api::researcher-search-log.researcher-search-log').create({
      data: {
        submitted_at: now,
        ...normalizedSearchParams,
        keywords: normalizedKeywords,
        search_params: searchParams,
        normalized_query: {
          searchParams: normalizedSearchParams,
          keywords: normalizedKeywords,
        },
        result_count: resultCount,
      },
    });

    if (components.length === 0) {
      return;
    }

    const records = buildStatRecords(components);

    for (const record of records) {
      const existing = await strapi.db.query('api::researcher-search-stat.researcher-search-stat').findOne({
        where: {
          unique_key: record.unique_key,
        },
      });

      if (existing) {
        await strapi.db.query('api::researcher-search-stat.researcher-search-stat').update({
          where: {
            id: existing.id,
          },
          data: {
            count: (existing.count || 0) + 1,
            last_result_count: resultCount,
            last_searched_at: now,
          },
        });
      } else {
        await strapi.db.query('api::researcher-search-stat.researcher-search-stat').create({
          data: {
            ...record,
            count: 1,
            last_result_count: resultCount,
            last_searched_at: now,
          },
        });
      }
    }
  },
}));
