import type { BrowserHistory } from 'history';
import { useLayoutEffect, useState } from 'react';
import { Router } from 'react-router-dom';

type HistoryRouterProps = {
  history: BrowserHistory;
  basename?: string;
  children?: React.ReactNode;
};

export const HistoryRouter: React.FC<HistoryRouterProps> = ({
  basename,
  children,
  history,
}) => {
  const [state, setState] = useState({
    action: history.action,
    location: history.location,
  });

  useLayoutEffect(() => history.listen(setState), [history]);

  return (
    <Router
      basename={basename}
      location={state.location}
      navigationType={state.action}
      navigator={history}
    >
      {children}
    </Router>
  );
};
