import { NextPage, NextPageContext } from 'next';
import Main from '../containers/Main';

interface HomeProps {
  userAgent?: string;
}

const Home: NextPage<HomeProps> = () => (
  <Main />
);

Home.getInitialProps = async (
  { req }: NextPageContext,
): Promise<HomeProps> => { // eslint-disable-line @typescript-eslint/require-await
  const userAgent = req ? req.headers['user-agent'] : navigator.userAgent;
  return { userAgent };
};

export default Home;
