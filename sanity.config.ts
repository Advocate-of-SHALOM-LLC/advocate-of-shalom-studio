import { defineConfig } from 'sanity';
import { structureTool, type StructureBuilder } from 'sanity/structure';
import { iconPicker } from 'sanity-plugin-icon-picker';
import { HiScale, HiDocumentDuplicate } from 'react-icons/hi2';
import { schemaTypes } from './schemas';
import { deployButtonPlugin } from './plugins/deployButton';

// Types where clients can only edit existing documents, not create or delete.
// footerColumns and socialLinks are intentionally NOT locked — editors should
// be able to add new columns/profiles freely.
const LOCKED_TYPES = ['page', 'aboutPage', 'contactPage', 'partnersPage', 'servicesPage', 'resourcesPage', 'legalPage', 'siteSettings', 'navigation'];

const projectId = process.env.SANITY_STUDIO_PROJECT_ID!;

// Types we manually group in the desk — exclude them from the default list so
// they don't appear twice (once in their folder, once at the top level).
// `page` is included here because its schema title is "Pages" and would otherwise
// produce a second "Pages" entry alongside the manual folder.
const GROUPED_TYPES = new Set([
  'page',
  'aboutPage',
  'contactPage',
  'partnersPage',
  'servicesPage',
  'resourcesPage',
  'legalPage',
]);

// Desk structure: group the home page + all dedicated page singletons under
// a single "Pages" folder, and the three legal documents under "Legal Pages".
// Everything else falls through to Sanity's default list.
const customStructure = (S: StructureBuilder) =>
  S.list()
    .title('Content')
    .items([
      // Pages folder — Home (generic page) + the five dedicated singletons
      S.listItem()
        .title('Pages')
        .icon(HiDocumentDuplicate)
        .child(
          S.list()
            .title('Pages')
            .items([
              S.listItem()
                .title('Home')
                .child(S.document().schemaType('page').documentId('page-home')),
              S.listItem()
                .title('About Page')
                .child(S.document().schemaType('aboutPage').documentId('aboutPage')),
              S.listItem()
                .title('Services Page')
                .child(S.document().schemaType('servicesPage').documentId('servicesPage')),
              S.listItem()
                .title('Partners Page')
                .child(S.document().schemaType('partnersPage').documentId('partnersPage')),
              S.listItem()
                .title('Resources Page')
                .child(S.document().schemaType('resourcesPage').documentId('resourcesPage')),
              S.listItem()
                .title('Contact Page')
                .child(S.document().schemaType('contactPage').documentId('contactPage')),
            ])
        ),

      // Legal Pages folder
      S.listItem()
        .title('Legal Pages')
        .icon(HiScale)
        .child(
          S.list()
            .title('Legal Pages')
            .items([
              S.listItem()
                .title('Terms & Conditions')
                .child(S.document().schemaType('legalPage').documentId('legal-terms-and-conditions')),
              S.listItem()
                .title('Privacy Policy')
                .child(S.document().schemaType('legalPage').documentId('legal-privacy-policy')),
              S.listItem()
                .title('Accessibility Statement')
                .child(S.document().schemaType('legalPage').documentId('legal-accessibility')),
            ])
        ),

      S.divider(),

      // Everything else (siteSettings, navigation, footerColumns, socialLinks, page)
      ...S.documentTypeListItems().filter((item) => !GROUPED_TYPES.has(item.getId() ?? '')),
    ]);

const sharedConfig = {
  projectId,
  plugins: [structureTool({ structure: customStructure }), iconPicker(), deployButtonPlugin()],
  schema: { types: schemaTypes },
  document: {
    actions: (prev: any[], context: { schemaType: string }) => {
      if (LOCKED_TYPES.includes(context.schemaType)) {
        return prev.filter(
          (action: { action?: string }) => !['create', 'delete', 'duplicate'].includes(action.action ?? '')
        );
      }
      return prev;
    },
    newDocumentOptions: (prev: { templateId: string }[]) => {
      return prev.filter((opt) => !LOCKED_TYPES.includes(opt.templateId));
    },
  },
};

export default defineConfig([
  {
    ...sharedConfig,
    name: 'production',
    title: 'Advocate Of SHALOM',
    dataset: 'production',
    basePath: '/production',
  },
  {
    ...sharedConfig,
    name: 'staging',
    title: 'Advocate Of SHALOM (Staging)',
    dataset: 'staging',
    basePath: '/staging',
  },
]);
