import { factories } from '@strapi/strapi';
export default factories.createCoreController('api::post.post', ({ strapi }) => ({
  async findBySlug(ctx) {
    const { slug } = ctx.params;
    const entity = await strapi.db.query('api::post.post').findOne({
      where: { slug },
      populate: ['cover'],
    });
    if (!entity) return ctx.notFound('Post not found');
    ctx.body = await (this as any).transformResponse(entity);
  },
}));
