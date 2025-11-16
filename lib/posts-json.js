// import fs from 'fs';
// import path from 'path';

// BEFORE USING got MUST DO: npm install got@9.6.0
import got from 'got';

// get filepath to data directory
// const dataDirectory = path.join(process.cwd(), 'data');

// define URL for rest endpoint
const dataURL = "https://dev-nleal-cs5513.pantheonsite.io/wp-json/twentytwentyfive-child/v1/latest_posts/1";



export async function getSortedPostsData() {
    // Get file path of posts
    // const filePath = path.join(dataDirectory, 'posts.json');

    // Read all data in the file
    // const jsonString = fs.readFileSync(filePath, 'utf-8');
    let jsonString;
    try {
        // next line use got snchronously to retrieve cia https our json data from wp site
        jsonString = await got(dataURL);
        console.log(jsonString.body);
    } catch (error) {
        jsonString.body = [];
        console.log(error);
    }

    // Parse json data into an object value
    // const jsonObject = JSON.parse(jsonString);
    const jsonObject = JSON.parse(jsonString.body);

    // Sort all data based on title properties
    jsonObject.sort(function (a, b) {
        // return a.title.localeCompare(b.title);
        return a.post_title.localeCompare(b.post_title);
    });
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
        console.log(jsonString.body);
    } catch (error) {
        jsonString.body = [];
        console.log(error);
    }


    // Parse json data into an object value
    // const jsonObject = JSON.parse(jsonString);
    const jsonObject = JSON.parse(jsonString.body);

    // Return reconfigured array organized by id converted to a string
    // console.log(jsonObject);
    // return jsonObject.map(item => {
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
        console.log(jsonString.body);
    } catch (error) {
        jsonString.body = [];
        console.log(error);
    }

    // Parse json data into an object value
    // const jsonObject = JSON.parse(jsonString);
    const jsonObject = JSON.parse(jsonString.body);

    // Find single object value corresponding to the id value using the built in filter array object
    const objectReturned = jsonObject.filter(object => {
        // return object.id.toString() === id;
        return object.ID.toString() === id;
    });

    if (objectReturned.length === 0) {
        return {
            /*"id": ID,
            "title": 'Not found',
            "date": '',
            "contentHtml": 'Not found',
            "category": 'Not found',
        }
    } else {
        return objectReturned[0];
    }*/
            id,
            title: 'Not found',
            date: '',
            contentHtml: 'Not found',
            category: 'Not found',
        };
    }

    const post = objectReturned[0];

    return {
        id: post.ID ? post.ID.toString() : id,
        title: post.post_title ?? post.title ?? 'Untitled',
        date: post.post_date ?? post.date ?? '',
        contentHtml: post.post_content ?? post.contentHtml ?? '',
        category: post.post_category ?? post.category ?? '',
    };
}