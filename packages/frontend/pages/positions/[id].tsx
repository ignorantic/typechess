import { NextPage, NextPageContext } from 'next';
import { useRouter } from 'next/router';
import PositionsShow from '../../app/containers/PositionsShow';

interface PositionsShowProps {
  userAgent?: string;
}

const PositionsShowPage: NextPage<PositionsShowProps> = () => {
  const router = useRouter();
  const { id } = router.query;
  return <PositionsShow id={Number(id)} />;
};

PositionsShowPage.getInitialProps = async (
  { req }: NextPageContext,
  // eslint-disable-next-line @typescript-eslint/require-await
): Promise<PositionsShowProps> => {
  const userAgent = req ? req.headers['user-agent'] : navigator.userAgent;
  return { userAgent };
};

export default PositionsShowPage;
