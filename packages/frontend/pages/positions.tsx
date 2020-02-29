import { NextPage, NextPageContext } from 'next';
import PositionsList from '../app/containers/PositionsList';

interface PositionsListProps {
  userAgent?: string;
}

const PositionsListPage: NextPage<PositionsListProps> = () => (
  <PositionsList />
);

PositionsListPage.getInitialProps = async (
  { req }: NextPageContext,
  // eslint-disable-next-line @typescript-eslint/require-await
): Promise<PositionsListProps> => {
  const userAgent = req ? req.headers['user-agent'] : navigator.userAgent;
  return { userAgent };
};

export default PositionsListPage;
