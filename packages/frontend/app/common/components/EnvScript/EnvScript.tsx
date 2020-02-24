import React, { FC } from 'react';
import config from '../../../../config';

const EnvScript: FC = () => (
  <script
    // eslint-disable-next-line react/no-danger
    dangerouslySetInnerHTML={{
      __html: `window.env = ${JSON.stringify(config)}`,
    }}
  />
);

export default EnvScript;
