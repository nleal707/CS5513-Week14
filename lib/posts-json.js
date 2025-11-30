// import fs from 'fs';
// import path from 'path';

// BEFORE USING got MUST DO: npm install got@9.6.0
import got from 'got';

// get filepath to data directory
// const dataDirectory = path.join(process.cwd(), 'data');

// define URL for rest endpoint
const dataURL = "https://dev-nleal-cs5513.pantheonsite.io/wp-json/twentytwentyfive-child/v1/special";



export async function getSortedPostsData() {
    // Get file path of posts
    // const filePath = path.join(dataDirectory, 'posts.json');

    // Read all data in the file
    // const jsonString = fs.readFileSync(filePath, 'utf-8');
    let jsonString;
    try {
        // next line use got snchronously to retrieve cia https our json data from wp site
        jsonString = await got(dataURL);
        console.log('Posts endpoint response:', jsonString.body);
    } catch (error) {
        console.error('Error fetching posts from endpoint:', error.message);
        // Return empty array if endpoint fails
        return [];
    }

    // Check if response body is empty or invalid
    if (!jsonString || !jsonString.body) {
        console.warn('Posts endpoint returned empty or invalid response');
        return [];
    }

    let jsonObject;
    try {
        // Parse json data into an object value
        jsonObject = JSON.parse(jsonString.body);
    } catch (parseError) {
        console.error('Error parsing posts JSON:', parseError.message);
        console.error('Response body:', jsonString.body);
        return [];
    }

    // Check if parsed data is an array and not empty
    if (!Array.isArray(jsonObject)) {
        console.warn('Posts endpoint did not return an array:', typeof jsonObject);
        return [];
    }

    if (jsonObject.length === 0) {
        console.warn('Posts endpoint returned empty array');
        return [];
    }

    // Sort all data based on title properties
    jsonObject.sort(function (a, b) {
        const titleA = a.post_title ?? '';
        const titleB = b.post_title ?? '';
        return titleA.localeCompare(titleB);
    });

    console.log(`Successfully processed ${jsonObject.length} posts`);

    // Map to reconfigured array and filter out posts without WordPress block content
    const mappedPosts = jsonObject.map(item => {
        return {
            // id: item.id.toString(),
            id: item.ID.toString(),
            title: item.post_title,
            date: item.post_date,
            post_content: item.post_content, // Keep temporarily for filtering
            // featured_image: item.featured_image
        }
    });

    // Filter to only include posts that have WordPress block comments
    const postsWithBlocks = mappedPosts.filter(post => {
        const content = post.post_content ?? '';
        return hasBlockContent(content);
    });

    // Remove post_content from final result (not needed in the list)
    const filteredPosts = postsWithBlocks.map(({ post_content, ...post }) => post);

    const filteredCount = mappedPosts.length - filteredPosts.length;
    if (filteredCount > 0) {
        console.log(`Filtered out ${filteredCount} posts without WordPress block content`);
    }
    console.log(`Returning ${filteredPosts.length} posts with block content`);

    return filteredPosts;
}

export async function getAllPostIds() {
    // Get file path of posts
    // const filePath = path.join(dataDirectory, 'posts.json');

    // Read all data in the file
    // const jsonString = fs.readFileSync(filePath, 'utf-8');

    let jsonString;
    try {
        // next line use got snchronously to retrieve cia https our json data from wp site
        jsonString = await got(dataURL);
        console.log('Posts endpoint response (getAllPostIds):', jsonString.body);
    } catch (error) {
        console.error('Error fetching posts from endpoint (getAllPostIds):', error.message);
        return [];
    }

    if (!jsonString || !jsonString.body) {
        console.warn('Posts endpoint returned empty or invalid response (getAllPostIds)');
        return [];
    }

    let jsonObject;
    try {
        // Parse json data into an object value
        jsonObject = JSON.parse(jsonString.body);
    } catch (parseError) {
        console.error('Error parsing posts JSON (getAllPostIds):', parseError.message);
        return [];
    }

    if (!Array.isArray(jsonObject) || jsonObject.length === 0) {
        console.warn('Posts endpoint returned empty or non-array response (getAllPostIds)');
        return [];
    }

    // Return reconfigured array organized by id converted to a string
    return jsonObject.map(item => {
        return {
            params: {
                //id: item.id.toString()
                id: item.ID.toString()
            }
        }
    });
}

/**
 * Checks if content contains WordPress block comments.
 * Lightweight validation function for filtering posts.
 * 
 * @param {string} content - The post content to check
 * @returns {boolean} - True if content contains WordPress block comments, false otherwise
 */
function hasBlockContent(content) {
    if (!content || typeof content !== 'string') {
        return false;
    }

    // Check if content contains both opening and closing WordPress block comments
    return /<!--\s*wp:/i.test(content) && /<!--\s*\/wp:/i.test(content);
}

/**
 * Filters post content to extract only WordPress block-formatted content.
 * Returns content that contains WordPress block comments (<!-- wp: --> and <!-- /wp: -->).
 * Filters out ACF metadata, serialized PHP data, and other non-block content.
 * 
 * @param {string} content - The raw post content to filter
 * @returns {string} - Filtered content containing only WordPress blocks, or empty string if no blocks found
 */
function filterBlockContent(content) {
    if (!content || typeof content !== 'string') {
        return '';
    }

    // Check if content contains WordPress block comments
    const hasBlockComments = /<!--\s*wp:/i.test(content) && /<!--\s*\/wp:/i.test(content);
    
    if (!hasBlockComments) {
        // No block comments found, return empty string
        return '';
    }

    // Extract complete WordPress blocks
    // Pattern matches: <!-- wp:block-type [attributes] --> ... content ... <!-- /wp:block-type -->
    // This regex matches from opening comment to closing comment, including all content in between
    const blockPattern = /<!--\s*wp:[^>]*-->[\s\S]*?<!--\s*\/wp:[^>]*-->/g;
    const blocks = content.match(blockPattern);
    
    if (!blocks || blocks.length === 0) {
        // Pattern didn't match, but block comments exist
        // Try alternative: extract everything from first block comment to last closing comment
        const firstBlockIndex = content.indexOf('<!-- wp:');
        const lastBlockIndex = content.lastIndexOf('<!-- /wp:');
        
        if (firstBlockIndex !== -1 && lastBlockIndex !== -1 && lastBlockIndex > firstBlockIndex) {
            // Find the end of the last closing comment
            const lastBlockEnd = content.indexOf('-->', lastBlockIndex) + 3;
            if (lastBlockEnd > lastBlockIndex) {
                return content.substring(firstBlockIndex, lastBlockEnd);
            }
        }
        
        // If we can't extract blocks properly, return empty to avoid showing non-block content
        return '';
    }

    // Join all extracted blocks together with newlines
    const filteredContent = blocks.join('\n');
    
    return filteredContent;
}

export async function getPostData(id) {
    // Get file path of posts
    // const filePath = path.join(dataDirectory, 'posts.json');

    // Read all data in the file
    // const jsonString = fs.readFileSync(filePath, 'utf-8');

    let jsonString;
    try {
        // next line use got snchronously to retrieve cia https our json data from wp site
        jsonString = await got(dataURL);
        console.log('Posts endpoint response (getPostData):', jsonString.body);
    } catch (error) {
        console.error('Error fetching posts from endpoint (getPostData):', error.message);
        return {
            id,
            title: 'Not found',
            date: '',
            contentHtml: 'Not found',
            category: 'Not found',
            username: 'Not found',
        };
    }

    if (!jsonString || !jsonString.body) {
        console.warn('Posts endpoint returned empty or invalid response (getPostData)');
        return {
            id,
            title: 'Not found',
            date: '',
            contentHtml: 'Not found',
            category: 'Not found',
            username: 'Not found',
        };
    }

    let jsonObject;
    try {
        // Parse json data into an object value
        jsonObject = JSON.parse(jsonString.body);
    } catch (parseError) {
        console.error('Error parsing posts JSON (getPostData):', parseError.message);
        return {
            id,
            title: 'Not found',
            date: '',
            contentHtml: 'Not found',
            category: 'Not found',
            username: 'Not found',
        };
    }

    if (!Array.isArray(jsonObject)) {
        console.warn('Posts endpoint did not return an array (getPostData)');
        return {
            id,
            title: 'Not found',
            date: '',
            contentHtml: 'Not found',
            category: 'Not found',
            username: 'Not found',
        };
    }

    // Find single object value corresponding to the id value using the built in filter array object
    const objectReturned = jsonObject.filter(object => {
        // return object.id.toString() === id;
        return object.ID.toString() === id;
    });

    if (objectReturned.length === 0) {
        console.warn(`Post with id ${id} not found`);
        return {
            id,
            title: 'Not found',
            date: '',
            contentHtml: 'Not found',
            category: 'Not found',
            username: 'Not found',
        };
    }

    const post = objectReturned[0];

    // Get raw post content
    const rawContent = post.post_content ?? post.contentHtml ?? '';
    
    // Filter to only include WordPress block-formatted content
    const filteredContent = filterBlockContent(rawContent);

    return {
        id: post.ID ? post.ID.toString() : id,
        title: post.post_title ?? post.title ?? 'Untitled',
        date: post.post_date ?? post.date ?? '',
        contentHtml: filteredContent,
        category: post.post_category ?? post.category ?? '',
        username: post.user_login ?? '',
    };
}