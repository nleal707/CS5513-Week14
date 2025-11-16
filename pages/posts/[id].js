// Import the Layout component for a consistent page structure
import Layout from '../../components/layout';
// Import functions to get all post IDs and the data for a specific post. Changed from posts.js to posts-json.js.
import { getAllPostIds, getPostData } from '../../lib/posts-json';
// Import the Head component from Next.js to manage the document's <head>
import Head from 'next/head';
// Import a custom Date component to format and display dates
import Date from '../../components/date';
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


// Export an async function to fetch data for a specific post at build time
export async function getStaticProps({ params }) {
  // Fetch the data for a single post using the ID from the route parameters
  const postData = await getPostData(params.id);
  // Return the fetched data as props to the Post component
  return {
    props: {
      postData,
    },
  };
}

// Export an async function to define the list of paths to be statically generated
export async function getStaticPaths() {
  // Get the array of all possible post IDs
  // const paths = getAllPostIds();
  //The returned paths value is now an actual array of route objects instead of a pending Promise, which resolves a runtime error on /posts/[id].
  const paths = await getAllPostIds();  
  // Return the paths and set fallback to false (shows a 404 for unknown paths)
  return {
    paths,
    fallback: false,
  };
}

// Define and export the Post component, which displays a single blog post
export default function Post({ postData }) {
  // Return the JSX to be rendered for the page
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        
        <Container className={utilStyles.space}>
          <Row className={utilStyles.lightText}>
            <Col class="col-6">
            <Date dateString={postData.date} />
            </Col>
            <Col class="col-6">
            <Button className={utilStyles.categoryBtn}>{postData.category}</Button>
            </Col>
          </Row>
        </Container>
        
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
      <h2>
        <Button className={utilStyles.button}><Link className={utilStyles.buttonLink} href="/">Back to home</Link></Button>
      </h2>
    </Layout>
  );
}