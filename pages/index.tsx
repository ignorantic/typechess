import { NextPage, NextPageContext } from 'next';
import { Typography } from '@material-ui/core';

interface HomeProps {
  userAgent?: string;
}

const Home: NextPage<HomeProps> = ({ userAgent }) => (
  <Typography variant="h4">
    Hello world! - user agent:
    {userAgent}
  </Typography>
);

Home.getInitialProps = async (
  { req }: NextPageContext,
): Promise<HomeProps> => { // eslint-disable-line @typescript-eslint/require-await
  const userAgent = req ? req.headers['user-agent'] : navigator.userAgent;
  return { userAgent };
};

export default Home;
