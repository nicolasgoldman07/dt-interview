import type { CliOptions } from 'dt-app';

const config: CliOptions = {
  // live -> apps: https://community.dynatrace.com/t5/Developer-Q-A-Forum/Unable-to-start-dev-server-404-logging-into-environment/m-p/218977
  environmentUrl: 'https://azg39614.apps.dynatrace.com/',
  app: {
    name: 'Dynatrace Test Interview',
    version: '0.0.1',
    description: 'Dynatrace Test Interview App - ImpactScores heatmap and SimulationResults chart',
    id: 'my.dynatrace.test.interview',
    scopes: [
      { name: 'storage:logs:read', comment: 'default template' },
      { name: 'storage:buckets:read', comment: 'default template' },
      { name: 'app-engine:apps:run', comment: 'default template' },
      { name: 'environment-api:credentials:read', comment: 'default template' }
    ],
  },
  icon: './src/assets/Dynatrace_Logo.svg',
};

module.exports = config;