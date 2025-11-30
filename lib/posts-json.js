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

    // Return reconfigured array organized by id converted to a string
    return jsonObject.map(item => {
        return {
            // id: item.id.toString(),
            id: item.ID.toString(),
            title: item.post_title,
            date: item.post_date,
            // featured_image: item.featured_image
        }
    });
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

    return {
        id: post.ID ? post.ID.toString() : id,
        title: post.post_title ?? post.title ?? 'Untitled',
        date: post.post_date ?? post.date ?? '',
        contentHtml: post.post_content ?? post.contentHtml ?? '',
        category: post.post_category ?? post.category ?? '',
        username: post.user_login ?? '',
    };
}