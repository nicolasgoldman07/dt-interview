import type { CliOptions } from 'dt-app';

const config: CliOptions = {
  environmentUrl: 'https://azg39614.live.dynatrace.com/',
  app: {
    name: 'Dynatrace Test Interview',
    version: '0.0.0',
    description: 'A starting project with routing, fetching data, and charting',
    id: 'my.dynatrace.test.interview',
    scopes: [{ name: 'storage:logs:read', comment: 'default template' }, { name: 'storage:buckets:read', comment: 'default template' }]
  },
};

module.exports = config;