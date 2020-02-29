import { NextPage, NextPageContext } from 'next';
import Main from '../app/containers/Main';

interface HomeProps {
  userAgent?: string;
}

const HomePage: NextPage<HomeProps> = () => (
  <Main />
);

HomePage.getInitialProps = async (
  { req }: NextPageContext,
): Promise<HomeProps> => {
  const userAgent = req ? req.headers['user-agent'] : navigator.userAgent;
  return { userAgent };
};

export default HomePage;
