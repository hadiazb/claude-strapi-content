/**
 * tabs-menu controller
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::tabs-menu.tabs-menu', ({ strapi }) => ({
	async find(ctx) {
		const response = await super.find(ctx);
		const data = response.data;
		const meta = response.meta;

		const { documentId, createdAt, updatedAt, publishedAt, locale, localizations, ...rest } = data;

		return {
			data: data?.map(({ documentId, createdAt, updatedAt, publishedAt, locale, localizations, ...rest }) => ({
				...rest,
			})),
			meta,
		};
	},
	async findOne(ctx) {
		const response = await super.find(ctx);
		const data = response.data;
		const meta = response.meta;

		const { documentId, createdAt, updatedAt, publishedAt, locale, localizations, ...rest } = data;

		return {
			data: {
				...rest,
			},
			meta,
		};
	},
}));
