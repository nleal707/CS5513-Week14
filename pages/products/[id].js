// Import the Layout component for a consistent page structure
import Layout from '../../components/layout';
// Import functions to get all product IDs and the data for a specific product
import { getAllPostIds, getPostData } from '../../lib/products-json';
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


// Export an async function to fetch data for a specific product at build time
export async function getStaticProps({ params }) {
  // Fetch the data for a single product using the ID from the route parameters
  const productData = await getPostData(params.id);
  // Return the fetched data as props to the product component
  return {
    props: {
      productData,
    },
    revalidate: 60
  };
}

// Export an async function to define the list of paths to be statically generated
export async function getStaticPaths() {
  // Get the array of all possible product IDs
  const paths = await getAllPostIds();  
  // Return the paths and set fallback to false (shows a 404 for unknown paths)
  return {
    paths,
    fallback: false,
  };
}

// Define and export the product component, which displays a single product
export default function Product({ productData }) {
  // Return the JSX to be rendered for the page
  return (
    <Layout>
      <Head>
        <title>{productData.name || 'Product'}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{productData.name || 'Product'}</h1>
        
        <Container className={utilStyles.space}>
          <Row className={utilStyles.lightText}>
            <Col className="col-12">
              <p><strong>SKU:</strong> {productData.sku || 'N/A'}</p>
            </Col>
            <Col className="col-12">
              <p><strong>Description:</strong> {productData.description || 'N/A'}</p>
            </Col>
            <Col className="col-12">
              <p><strong>Price:</strong> {productData.price || 'N/A'}</p>
            </Col>
            <Col className="col-12">
              <p><strong>Payment Link:</strong> <a href={productData.link || 'N/A'} target="_blank" rel="noopener noreferrer">{productData.link || 'N/A'}</a></p>
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

