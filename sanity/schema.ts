// Sanity schema definitions for PandaPaths CMS

export const caseStudySchema = {
    name: 'caseStudy',
    title: 'Case Study',
    type: 'document',
    fields: [
        {
            name: 'title',
            title: 'Title',
            type: 'string',
            validation: (Rule: any) => Rule.required(),
        },
        {
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'title',
                maxLength: 96,
            },
            validation: (Rule: any) => Rule.required(),
        },
        {
            name: 'client',
            title: 'Client Name',
            type: 'string',
            validation: (Rule: any) => Rule.required(),
        },
        {
            name: 'industry',
            title: 'Industry',
            type: 'string',
        },
        {
            name: 'duration',
            title: 'Project Duration',
            type: 'string',
        },
        {
            name: 'teamSize',
            title: 'Team Size',
            type: 'string',
        },
        {
            name: 'category',
            title: 'Category',
            type: 'string',
            options: {
                list: [
                    { title: 'Web', value: 'Web' },
                    { title: 'Mobile', value: 'Mobile' },
                    { title: 'AI', value: 'AI' },
                    { title: 'Cloud', value: 'Cloud' },
                ],
            },
            validation: (Rule: any) => Rule.required(),
        },
        {
            name: 'challenge',
            title: 'Challenge',
            type: 'text',
            validation: (Rule: any) => Rule.required(),
        },
        {
            name: 'solution',
            title: 'Solution',
            type: 'text',
            validation: (Rule: any) => Rule.required(),
        },
        {
            name: 'technologies',
            title: 'Technologies Used',
            type: 'array',
            of: [{ type: 'string' }],
        },
        {
            name: 'results',
            title: 'Results',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        { name: 'metric', type: 'string', title: 'Metric' },
                        { name: 'label', type: 'string', title: 'Label' },
                    ],
                },
            ],
        },
        {
            name: 'impact',
            title: 'Business Impact',
            type: 'text',
        },
        {
            name: 'testimonial',
            title: 'Client Testimonial',
            type: 'object',
            fields: [
                { name: 'quote', type: 'text', title: 'Quote' },
                { name: 'author', type: 'string', title: 'Author Name' },
                { name: 'role', type: 'string', title: 'Author Role' },
            ],
        },
        {
            name: 'image',
            title: 'Featured Image',
            type: 'image',
            options: {
                hotspot: true,
            },
        },
    ],
};

export const serviceSchema = {
    name: 'service',
    title: 'Service',
    type: 'document',
    fields: [
        {
            name: 'title',
            title: 'Title',
            type: 'string',
            validation: (Rule: any) => Rule.required(),
        },
        {
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'title',
                maxLength: 96,
            },
        },
        {
            name: 'description',
            title: 'Description',
            type: 'text',
            validation: (Rule: any) => Rule.required(),
        },
        {
            name: 'icon',
            title: 'Icon (Emoji)',
            type: 'string',
        },
        {
            name: 'technologies',
            title: 'Technologies',
            type: 'array',
            of: [{ type: 'string' }],
        },
        {
            name: 'features',
            title: 'Key Features',
            type: 'array',
            of: [{ type: 'string' }],
        },
        {
            name: 'order',
            title: 'Display Order',
            type: 'number',
        },
    ],
};

export const technologySchema = {
    name: 'technology',
    title: 'Technology',
    type: 'document',
    fields: [
        {
            name: 'name',
            title: 'Name',
            type: 'string',
            validation: (Rule: any) => Rule.required(),
        },
        {
            name: 'icon',
            title: 'Icon (Emoji)',
            type: 'string',
        },
        {
            name: 'category',
            title: 'Category',
            type: 'string',
            options: {
                list: [
                    { title: 'Frontend', value: 'Frontend' },
                    { title: 'Backend', value: 'Backend' },
                    { title: 'AI', value: 'AI' },
                    { title: 'Cloud', value: 'Cloud' },
                    { title: 'Database', value: 'Database' },
                ],
            },
        },
    ],
};

// Export schema array for Sanity Studio
export const schemaTypes = [caseStudySchema, serviceSchema, technologySchema];
