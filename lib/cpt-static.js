import { fetchCptDetail, fetchCptList } from './wordpress';

export function createCptStaticPaths(postType) {
  return async function getStaticPaths() {
    const posts = await fetchCptList(postType);
    const paths = posts
      .filter((post) => Boolean(post.slug))
      .map((post) => ({
        params: {
          slug: post.slug,
        },
      }));

    return {
      paths,
      fallback: 'blocking',
    };
  };
}

export function createCptStaticProps(postType) {
  return async function getStaticProps({ params }) {
    const post = await fetchCptDetail(postType, params.slug);

    if (!post) {
      return {
        notFound: true,
      };
    }

    return {
      props: {
        post,
      },
      revalidate: 60,
    };
  };
}

