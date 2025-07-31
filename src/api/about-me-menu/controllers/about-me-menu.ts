/**
 * about-me-menu controller
 */

import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::about-me-menu.about-me-menu', ({ strapi }) => ({
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
