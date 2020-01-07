import React, { FC } from 'react';
import env from '../../../config/env';

const EnvScript: FC = () => (
  <script
    // eslint-disable-next-line react/no-danger
    dangerouslySetInnerHTML={{
      __html: `window.env = ${JSON.stringify(env)}`,
    }}
  />
);

export default EnvScript;
