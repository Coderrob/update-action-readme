/*
 * Copyright 2025 Robert Lindley
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */

import { CompositeRuns } from '../schema/composite/composite-runs.js';

/**
 * Generates a Mermaid flowchart from GitHub Actions
 * workflow composite job steps.
 */
export class MermaidFlowchartGenerator {
  private readonly runs: CompositeRuns;

  constructor(runs: CompositeRuns) {
    this.runs = runs;
  }

  generate(): string {
    const lines: string[] = ['flowchart TD'];
    const nodeIds: string[] = [];
    const conditionNodes: string[] = [];

    let nodeIndex = 0;
    let lastNodeId: string | null = null;

    const getNodeId = (): string => `N${nodeIndex++}`;

    for (const step of this.runs.steps) {
      const nodeId = getNodeId();
      const label = this.escape(step.name || step.id || 'Unnamed Step');
      lines.push(`${nodeId}["${label}"]`);
      nodeIds.push(nodeId);

      if (step.if) {
        const conditionNodeId = getNodeId();
        const conditionLabel = this.escape(step.if);
        lines.push(
          `${lastNodeId ?? nodeId} --> ${conditionNodeId}{"${conditionLabel}"}`
        );
        lines.push(`${conditionNodeId} -->|Yes| ${nodeId}`);
        conditionNodes.push(conditionNodeId);
        lastNodeId = conditionNodeId;
      } else if (lastNodeId) {
        lines.push(`${lastNodeId} --> ${nodeId}`);
        lastNodeId = nodeId;
      } else {
        lastNodeId = nodeId;
      }
    }

    return lines.join('\n');
  }

  private escape(text: string): string {
    return text.replace(/"/g, '\\"').replace(/\n/g, ' ');
  }
}
