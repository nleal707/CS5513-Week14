// Import the Layout component for a consistent page structure
import Layout from '../../components/layout';
// Import functions to get all transaction IDs and the data for a specific transaction
import { getAllPostIds, getPostData } from '../../lib/transactions-json';
// Import the Head component from Next.js to manage the document's <head>
import Head from 'next/head';
// Import utility styles from a CSS Module for component-scoped styling
import utilStyles from '../../styles/utils.module.css';
// Import the Link component from Next.js for client-side navigation
import Link from 'next/link';
// Import the Button component from the react-bootstrap library
import Button from 'react-bootstrap/Button';
// Import the Grid component from the react-bootstrap library
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


// Export an async function to fetch data for a specific transaction at build time
export async function getStaticProps({ params }) {
  // Fetch the data for a single transaction using the ID from the route parameters
  const transactionData = await getPostData(params.id);
  // Return the fetched data as props to the transaction component
  return {
    props: {
      transactionData,
    },
    revalidate: 60
  };
}

// Export an async function to define the list of paths to be statically generated
export async function getStaticPaths() {
  // Get the array of all possible transaction IDs
  const paths = await getAllPostIds();  
  // Return the paths and set fallback to false (shows a 404 for unknown paths)
  return {
    paths,
    fallback: false,
  };
}

// Define and export the transaction component, which displays a single transaction
export default function Transaction({ transactionData }) {
  // Return the JSX to be rendered for the page
  return (
    <Layout>
      <Head>
        <title>{transactionData.title || 'Transaction'}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{transactionData.title || 'Transaction'}</h1>
        
        <Container className={utilStyles.space}>
          <Row className={utilStyles.lightText}>
            <Col className="col-12">
              <p><strong>Cardholder:</strong> {transactionData.cardholder || 'N/A'}</p>
            </Col>
            <Col className="col-12">
              <p><strong>Merchant:</strong> {transactionData.merchant || 'N/A'}</p>
            </Col>
            <Col className="col-12">
              <p><strong>Payment Gateway:</strong> {transactionData.payment_gateway || 'N/A'}</p>
            </Col>
            <Col className="col-12">
              <p><strong>Processor:</strong> {transactionData.processor || 'N/A'}</p>
            </Col>
            <Col className="col-12">
              <p><strong>Card Network:</strong> {transactionData.card_network || 'N/A'}</p>
            </Col>
            <Col className="col-12">
              <p><strong>Issuer:</strong> {transactionData.issuer || 'N/A'}</p>
            </Col>
            <Col className="col-12">
              <p><strong>Acquirer:</strong> {transactionData.acquirer || 'N/A'}</p>
            </Col>
          </Row>
        </Container>
      </article>
      <h2>
        <Button className={utilStyles.button}><Link className={utilStyles.buttonLink} href="/">Back to home</Link></Button>
      </h2>
    </Layout>
  );
}

