import {
  header,
  p as paragraph,
  table,
  tsMarkdown as markdown
} from 'ts-markdown';

import { Inputs } from '../../schema/inputs.js';
import { SectionRenderer } from './section-renderer.js';

export class InputsRenderer extends SectionRenderer {
  constructor(inputs: Inputs = {}) {
    super(
      markdown([
        header(2, 'Inputs'),
        Object.keys(inputs).length > 0
          ? table({
              columns: [
                { name: 'Name' },
                { name: 'Description' },
                { name: 'Default' },
                { name: 'Required' }
              ],
              rows: Object.entries(inputs)
                .sort(([a], [b]) => a.localeCompare(b))
                .map(([key, input]) => [
                  key,
                  input.description || '-',
                  input.default || '-',
                  input.required ? '✅ Yes' : '❌ No'
                ])
            })
          : paragraph('This action does not define any inputs.')
      ])
    );
  }
}
