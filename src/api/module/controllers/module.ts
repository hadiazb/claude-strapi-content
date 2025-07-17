/**
 * module controller
 */

import { factories } from '@strapi/strapi';

export const deleteIdObject = (arr: Record<string, unknown>[]) => arr?.map(({ id, ...rest }) => ({ ...rest }));

export default factories.createCoreController('api::module.module', ({ strapi }) => ({
	async find(ctx) {
		const response = await super.find(ctx);
		const data = response.data;
		const meta = response.meta;

		return {
			data: data?.map(({ id, title, formatting, country, form_objects, actions, dataObjects, moduleId, description, uid, moduleName, ...rest }) => ({
				...rest,
				config: {
					uid,
					moduleName,
					title: {
						title: title?.name,
						show: title?.show,
					},
					moduleId,
					description,
					country: [country],
					actions: deleteIdObject(actions),
					form_objects: deleteIdObject(form_objects),
					formatting,
					dataObjects: {
						backend: dataObjects?.backend,
						frontend: dataObjects?.frontend,
					},
				},
			})),
			meta,
		};
	},
	async findOne(ctx) {
		const response = await super.findOne(ctx);

		const data = response.data;
		const meta = response.meta;

		const { id, title, formatting, country, form_objects, actions, dataObjects, moduleId, description, uid, moduleName, ...rest } = data;

		return {
			data: {
				...rest,
				config: {
					uid,
					moduleName,
					title: {
						title: title?.name,
						show: title?.show,
					},
					moduleId,
					description,
					country: [country],
					actions: deleteIdObject(actions),
					form_objects: deleteIdObject(form_objects),
					formatting,
					dataObjects: {
						backend: dataObjects?.backend,
						frontend: dataObjects?.frontend,
					},
				},
			},
			meta,
		};
	},
}));
