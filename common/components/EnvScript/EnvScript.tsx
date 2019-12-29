import React, { FunctionComponent } from 'react';
import env from '../../../config/env';

const EnvScript: FunctionComponent = () => (
  <script
    // eslint-disable-next-line react/no-danger
    dangerouslySetInnerHTML={{
      __html: `window.env = ${JSON.stringify(env)}`,
    }}
  />
);

export default EnvScript;
