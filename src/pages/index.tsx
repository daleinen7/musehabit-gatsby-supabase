import * as React from 'react';
import Layout from '../components/Layout';
import type { HeadFC, PageProps } from 'gatsby';

const IndexPage: React.FC<PageProps> = () => {
  return (
    <Layout>
      <div className="text-center text-blue-600">Musehabit Homepage</div>
    </Layout>
  );
};

export default IndexPage;

export const Head: HeadFC = () => <title>Musehabit</title>;
