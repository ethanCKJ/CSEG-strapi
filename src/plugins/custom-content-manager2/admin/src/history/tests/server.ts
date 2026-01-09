import { type RequestHandler, rest } from 'msw';

import { mockHistoryVersionsData } from './mockData';

const historyHandlers: RequestHandler[] = [
  rest.get('/custom-content-manager2/history-versions', (req, res, ctx) => {
    return res(ctx.json(mockHistoryVersionsData.historyVersions));
  }),
];

export { historyHandlers };
