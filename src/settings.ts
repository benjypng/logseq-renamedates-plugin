import { SettingSchemaDesc } from '@logseq/libs/dist/LSPlugin.user'

export const settings: SettingSchemaDesc[] = [
  {
    key: 'oldDateFormat',
    type: 'string',
    default: '',
    title: 'Old Date Format',
    description:
      'The date format that old date pages are on. These will be renamed.',
  },
]
