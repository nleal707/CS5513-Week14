// Import the Layout component for a consistent page structure
import Layout from '../../components/layout';
// Import functions to get all place IDs and the data for a specific place
import { getAllPostIds, getPostData } from '../../lib/places-json';
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


// Export an async function to fetch data for a specific place at build time
export async function getStaticProps({ params }) {
  // Fetch the data for a single place using the ID from the route parameters
  const placeData = await getPostData(params.id);
  // Return the fetched data as props to the place component
  return {
    props: {
      placeData,
    },
    revalidate: 60
  };
}

// Export an async function to define the list of paths to be statically generated
export async function getStaticPaths() {
  // Get the array of all possible place IDs
  const paths = await getAllPostIds();  
  // Return the paths and set fallback to false (shows a 404 for unknown paths)
  return {
    paths,
    fallback: false,
  };
}

// Define and export the place component, which displays a single place
export default function Place({ placeData }) {
  // Return the JSX to be rendered for the page
  return (
    <Layout>
      <Head>
        <title>{placeData.place_name || placeData.name || 'Place'}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{placeData.place_name || placeData.name || 'Place'}</h1>
        
        <Container className={utilStyles.space}>
          <Row className={utilStyles.lightText}>
            <Col className="col-12">
              <p><strong>Physical Address:</strong> {placeData.physical_address || 'N/A'}</p>
            </Col>
            <Col className="col-12">
              <p><strong>Mailing Address:</strong> {placeData.mailing_address || 'N/A'}</p>
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

