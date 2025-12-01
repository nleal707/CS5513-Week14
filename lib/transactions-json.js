// import fs from 'fs';
// import path from 'path';

// BEFORE USING got MUST DO: npm install got@9.6.0
import got from 'got';

// get filepath to data directory
// const dataDirectory = path.join(process.cwd(), 'data');

// define URL for rest endpoint
const dataURL = "https://dev-nleal-cs5513.pantheonsite.io/wp-json/twentytwentyfive-child/v1/transactions";



export async function getSortedTransactionsData() {
    // Get file path of posts
    // const filePath = path.join(dataDirectory, 'posts.json');

    // Read all data in the file
    // const jsonString = fs.readFileSync(filePath, 'utf-8');
    let jsonString;
    try {
        // next line use got snchronously to retrieve cia https our json data from wp site
        jsonString = await got(dataURL);
        console.log('Transactions endpoint response:', jsonString.body);
    } catch (error) {
        console.error('Error fetching transactions from endpoint:', error.message);
        // Return empty array if endpoint fails
        return [];
    }

    // Check if response body is empty or invalid
    if (!jsonString || !jsonString.body) {
        console.warn('Transactions endpoint returned empty or invalid response');
        return [];
    }

    let jsonObject;
    try {
        // Parse json data into an object value
        jsonObject = JSON.parse(jsonString.body);
    } catch (parseError) {
        console.error('Error parsing transactions JSON:', parseError.message);
        console.error('Response body:', jsonString.body);
        return [];
    }

    // Check if parsed data is an array and not empty
    if (!Array.isArray(jsonObject)) {
        console.warn('Transactions endpoint did not return an array:', typeof jsonObject);
        return [];
    }

    if (jsonObject.length === 0) {
        console.warn('Transactions endpoint returned empty array');
        return [];
    }

    // Sort all data based on title properties
    jsonObject.sort(function (a, b) {
        const titleA = a.post_title ??  '';
        const titleB = b.post_title ??  '';
        return titleA.localeCompare(titleB);
    });

    console.log(`Successfully processed ${jsonObject.length} transactions`);

    // Return reconfigured array organized by id converted to a string
    return jsonObject.map(item => {
        return {
            // id: item.id.toString(),
            id: item.ID.toString(),
            title: item.post_title ?? 'Untitled',
            date: item.post_date ?? item.transaction_timestamp ?? '',
            // Keep additional fields for potential future use
            cardholder: item.cardholder,
            merchant: item.merchant,
            payment_gateway: item.payment_gateway,
            processor: item.processor,
            card_network: item.card_network,
            issuer: item.issuer,
            acquirer: item.acquirer,
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
        console.log('Transactions endpoint response (getAllPostIds):', jsonString.body);
    } catch (error) {
        console.error('Error fetching transactions from endpoint (getAllPostIds):', error.message);
        return [];
    }

    if (!jsonString || !jsonString.body) {
        console.warn('Transactions endpoint returned empty or invalid response (getAllPostIds)');
        return [];
    }

    let jsonObject;
    try {
        // Parse json data into an object value
        jsonObject = JSON.parse(jsonString.body);
    } catch (parseError) {
        console.error('Error parsing transactions JSON (getAllPostIds):', parseError.message);
        return [];
    }

    if (!Array.isArray(jsonObject) || jsonObject.length === 0) {
        console.warn('Transactions endpoint returned empty or non-array response (getAllPostIds)');
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
        console.log('Transactions endpoint response (getPostData):', jsonString.body);
    } catch (error) {
        console.error('Error fetching transactions from endpoint (getPostData):', error.message);
        return {
            id,
            name: 'Not found',
            sku: 'Not found',
            description: 'Not found',
            price: 'Not found',
            link: 'Not found',
        };
    }

    if (!jsonString || !jsonString.body) {
        console.warn('Transactions endpoint returned empty or invalid response (getPostData)');
        return {
            id,
            name: 'Not found',
            sku: 'Not found',
            description: 'Not found',
            price: 'Not found',
            link: 'Not found',
        };
    }

    let jsonObject;
    try {
        // Parse json data into an object value
        jsonObject = JSON.parse(jsonString.body);
    } catch (parseError) {
        console.error('Error parsing transactions JSON (getPostData):', parseError.message);
        return {
            id,
            name: 'Not found',
            sku: 'Not found',
            description: 'Not found',
            price: 'Not found',
            link: 'Not found',
        };
    }

    if (!Array.isArray(jsonObject)) {
        console.warn('Transactions endpoint did not return an array (getPostData)');
        return {
            id,
            name: 'Not found',
            sku: 'Not found',
            description: 'Not found',
            price: 'Not found',
            link: 'Not found',
        };
    }

    // Find single object value corresponding to the id value using the built in filter array object
    const objectReturned = jsonObject.filter(object => {
        // return object.id.toString() === id;
        return object.ID.toString() === id;
    });

    if (objectReturned.length === 0) {
        console.warn(`Transaction with id ${id} not found`);
        return {
            id,
            name: 'Not found',
            sku: 'Not found',
            description: 'Not found',
            price: 'Not found',
            link: 'Not found',
        };
    }

    const transaction = objectReturned[0];

    return {
        id: transaction.ID ? transaction.ID.toString() : id,
        name: transaction.post_title ?? 'Untitled',
        date: transaction.post_date ?? transaction.transaction_timestamp ?? '',
        cardholder: transaction.cardholder ?? '',
        merchant: transaction.merchant ?? '',
        payment_gateway: transaction.payment_gateway ?? '',
        processor: transaction.processor ?? '',
        card_network: transaction.card_network ?? '',
        issuer: transaction.issuer ?? '',
        acquirer: transaction.acquirer ?? '',
    };
}
