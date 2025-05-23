import { config, collection, fields } from '@keystatic/core';

export const markdocConfig = fields.markdoc.createMarkdocConfig({});

export default config({
  storage: {
    kind: 'cloud',
    pathPrefix: 'content',
  },
  cloud: {
    project: 'adgent/adgent-cms',
  },
  collections: {
    posts: collection({
      label: 'Posts',
      slugField: 'title',
      path: `posts/*`,
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
        image: fields.image({
          label: 'Image',
          directory: 'public/site/images',
          publicPath: '/site/images',
        }),
        categories: fields.array(fields.text({ label: 'Category' })),
        tags: fields.array(fields.text({ label: 'Tag' })),
        description: fields.text({ label: 'Description' }),
        publishedAt: fields.date({ label: 'Published At' }),
        parent: fields.relationship({
          label: 'Parent',
          collection: 'posts',
        }),
        language: fields.text({ label: 'Language' }),
        order: fields.number({ label: 'Order' }),
        content: getContentField(),
        status: fields.select({
          defaultValue: 'draft',
          label: 'Status',
          options: [
            { label: 'Draft', value: 'draft' },
            { label: 'Published', value: 'published' },
            { label: 'Review', value: 'review' },
            { label: 'Pending', value: 'pending' },
          ],
        }),
      },
    }),
  },
});

function getContentField() {
  return fields.markdoc({
    label: 'Content',
    options: {
      link: true,
      blockquote: true,
      bold: true,
      divider: true,
      orderedList: true,
      unorderedList: true,
      strikethrough: true,
      heading: true,
      code: true,
      italic: true,
      image: {
        directory: 'public/site/images',
        publicPath: '/site/images',
        schema: {
          title: fields.text({
            label: 'Caption',
            description: 'The text to display under the image in a caption.',
          }),
        },
      },
    },
  });
}