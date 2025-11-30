// import fs from 'fs';
// import path from 'path';

// BEFORE USING got MUST DO: npm install got@9.6.0
import got from 'got';

// get filepath to data directory
// const dataDirectory = path.join(process.cwd(), 'data');

// define URL for rest endpoint
const dataURL = "https://dev-nleal-cs5513.pantheonsite.io/wp-json/twentytwentyfive-child/v1/contacts";



export async function getSortedContactsData() {
    // Get file path of posts
    // const filePath = path.join(dataDirectory, 'posts.json');

    // Read all data in the file
    // const jsonString = fs.readFileSync(filePath, 'utf-8');
    let jsonString;
    try {
        // next line use got snchronously to retrieve cia https our json data from wp site
        jsonString = await got(dataURL);
        console.log('Contacts endpoint response:', jsonString.body);
    } catch (error) {
        console.error('Error fetching contacts from endpoint:', error.message);
        // Return empty array if endpoint fails
        return [];
    }

    // Check if response body is empty or invalid
    if (!jsonString || !jsonString.body) {
        console.warn('Contacts endpoint returned empty or invalid response');
        return [];
    }

    let jsonObject;
    try {
        // Parse json data into an object value
        jsonObject = JSON.parse(jsonString.body);
    } catch (parseError) {
        console.error('Error parsing contacts JSON:', parseError.message);
        console.error('Response body:', jsonString.body);
        return [];
    }

    // Check if parsed data is an array and not empty
    if (!Array.isArray(jsonObject)) {
        console.warn('Contacts endpoint did not return an array:', typeof jsonObject);
        return [];
    }

    if (jsonObject.length === 0) {
        console.warn('Contacts endpoint returned empty array');
        return [];
    }

    // Sort all data based on title properties
    jsonObject.sort(function (a, b) {
        const titleA = a.post_title ?? a.name ?? '';
        const titleB = b.post_title ?? b.name ?? '';
        return titleA.localeCompare(titleB);
    });

    console.log(`Successfully processed ${jsonObject.length} contacts`);

    // Return reconfigured array organized by id converted to a string
    return jsonObject.map(item => {
        return {
            // id: item.id.toString(),
            id: item.ID.toString(),
            title: item.post_title ?? item.name ?? 'Untitled',
            date: item.post_date ?? item.date ?? '',
            // Keep additional fields for potential future use
            name: item.name,
            email: item.email,
            phone: item.phone,
            company: item.company,
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
        console.log('Contacts endpoint response (getAllPostIds):', jsonString.body);
    } catch (error) {
        console.error('Error fetching contacts from endpoint (getAllPostIds):', error.message);
        return [];
    }

    if (!jsonString || !jsonString.body) {
        console.warn('Contacts endpoint returned empty or invalid response (getAllPostIds)');
        return [];
    }

    let jsonObject;
    try {
        // Parse json data into an object value
        jsonObject = JSON.parse(jsonString.body);
    } catch (parseError) {
        console.error('Error parsing contacts JSON (getAllPostIds):', parseError.message);
        return [];
    }

    if (!Array.isArray(jsonObject) || jsonObject.length === 0) {
        console.warn('Contacts endpoint returned empty or non-array response (getAllPostIds)');
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
        console.log('Contacts endpoint response (getPostData):', jsonString.body);
    } catch (error) {
        console.error('Error fetching contacts from endpoint (getPostData):', error.message);
        return {
            id,
            name: 'Not found',
            email: 'Not found',
            phone: 'Not found',
            company: 'Not found',
        };
    }

    if (!jsonString || !jsonString.body) {
        console.warn('Contacts endpoint returned empty or invalid response (getPostData)');
        return {
            id,
            name: 'Not found',
            email: 'Not found',
            phone: 'Not found',
            company: 'Not found',
        };
    }

    let jsonObject;
    try {
        // Parse json data into an object value
        jsonObject = JSON.parse(jsonString.body);
    } catch (parseError) {
        console.error('Error parsing contacts JSON (getPostData):', parseError.message);
        return {
            id,
            name: 'Not found',
            email: 'Not found',
            phone: 'Not found',
            company: 'Not found',
        };
    }

    if (!Array.isArray(jsonObject)) {
        console.warn('Contacts endpoint did not return an array (getPostData)');
        return {
            id,
            name: 'Not found',
            email: 'Not found',
            phone: 'Not found',
            company: 'Not found',
        };
    }

    // Find single object value corresponding to the id value using the built in filter array object
    const objectReturned = jsonObject.filter(object => {
        // return object.id.toString() === id;
        return object.ID.toString() === id;
    });

    if (objectReturned.length === 0) {
        console.warn(`Contact with id ${id} not found`);
        return {
            id,
            name: 'Not found',
            email: 'Not found',
            phone: 'Not found',
            company: 'Not found',
        };
    }

    const post = objectReturned[0];

    return {
        id: post.ID ? post.ID.toString() : id,
        name: post.post_title ?? post.name ?? post.title ?? 'Untitled',
        email: post.email ?? post.post_date ?? post.date ?? '',
        phone: post.phone ?? post.post_content ?? post.contentHtml ?? '',
        company: post.company ?? post.post_category ?? post.category ?? '',
    };
}
