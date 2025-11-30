// Import the Layout component for a consistent page structure
import Layout from '../../components/layout';
// Import functions to get all contact IDs and the data for a specific contact
import { getAllPostIds, getPostData } from '../../lib/contacts-json';
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


// Export an async function to fetch data for a specific contact at build time
export async function getStaticProps({ params }) {
  // Fetch the data for a single contact using the ID from the route parameters
  const contactData = await getPostData(params.id);
  // Return the fetched data as props to the Contact component
  return {
    props: {
      contactData,
    },
    revalidate: 60
  };
}

// Export an async function to define the list of paths to be statically generated
export async function getStaticPaths() {
  // Get the array of all possible contact IDs
  const paths = await getAllPostIds();  
  // Return the paths and set fallback to false (shows a 404 for unknown paths)
  return {
    paths,
    fallback: false,
  };
}

// Define and export the Contact component, which displays a single contact
export default function Contact({ contactData }) {
  // Return the JSX to be rendered for the page
  return (
    <Layout>
      <Head>
        <title>{contactData.name || 'Contact'}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{contactData.name || 'Contact'}</h1>
        
        <Container className={utilStyles.space}>
          <Row className={utilStyles.lightText}>
            <Col className="col-12">
              <p><strong>Email:</strong> <a href={`mailto:${contactData.email || 'N/A'}`} target="_blank" rel="noopener noreferrer">{contactData.email || 'N/A'}</a></p>
            </Col>
            <Col className="col-12">
              <p><strong>Phone:</strong> <a href={`tel:${contactData.phone || 'N/A'}`} target="_blank" rel="noopener noreferrer">{contactData.phone || 'N/A'}</a></p>
            </Col>
            <Col className="col-12">
              <p><strong>Company:</strong> <a href={`https://${contactData.website || 'N/A'}`} target="_blank" rel="noopener noreferrer">{contactData.company || 'N/A'}</a></p>
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

