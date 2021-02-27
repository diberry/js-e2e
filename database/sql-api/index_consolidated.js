    const CosmosClient = require("@azure/cosmos").CosmosClient;

    // CHANGE THESE VALUES
    const COSMOS_DB_RESOURCE_NAME = "YOUR-RESOURCE-NAME";
    const COSMOS_DB_RESOURCE_KEY = "YOUR-RESOURCE-KEY";

    let client = null;      // Cosmos DB SQL API connection object
    let db = null;          // DB object
    let container = null;   // Container object

    // data
    const DATABASE_DOCS = [
        { name: "Joe", job: "banking" },
        { name: "Jack", job: "security" },
        { name: "Jill", job: "pilot" }];
        
    const ALL_DOCS = null;

    // Azure Cosmos DB config
    const config = {
        COSMOSDB_SQL_API_URI: `https://${COSMOS_DB_RESOURCE_NAME}.documents.azure.com:443/`,
        COSMOSDB_SQL_API_KEY: COSMOS_DB_RESOURCE_KEY,
        COSMOSDB_SQL_API_DATABASE_NAME: "DemoDb",
        COSMOSDB_SQL_API_CONTAINER_NAME: "DemoContainer"
    }

    // Unique Id = Guid
    const newGuid = () => {
        const s4 = () => Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
        return `${s4() + s4()}-${s4()}-${s4()}-${s4()}-${s4() + s4() + s4()}`;
    }

    // insert array
    const insert = async (newItems) => {

        const results = [];
        for (const item of newItems) {

            item.id = newGuid();
            const result = await container.items.create(item);
            results.push(result.item);
        }
        return results;
    };
    // find all or by id
    const find = async (query) => {

        if (query == null) {
            query = "SELECT * from c"
        } else {
            query = `SELECT * from c where c.id = ${query}`
        }

        const result = await container.items
            .query(query)
            .fetchAll();

        return result && result.resources ? result.resources : [];
    }
    // remove all or by id
    const remove = async (id) => {

        // remove 1
        if (id) {
            await container.item(id).delete();
        } else {

            // get all items
            const items = await find();

            // remove all
            for await (const item of items) {
                await container.item(item.id).delete();
            }
        }

        return;
    }
    // connection with SDK
    const connect = () => {
        try {

            const connectToCosmosDB = {
                endpoint: config.COSMOSDB_SQL_API_URI,
                key: config.COSMOSDB_SQL_API_KEY
            }

            return new CosmosClient(connectToCosmosDB);

        } catch (err) {
            console.log('Cosmos DB SQL API - can\'t connected - err');
            console.log(err);
        }
    }
    const connectToDatabase = async () => {

        client = connect();

        if (client) {

            // get DB
            const databaseResult = await client.databases.createIfNotExists({ id: config.COSMOSDB_SQL_API_DATABASE_NAME });
            db = databaseResult.database;

            if (db) {
                // get Container
                const containerResult = await db.containers.createIfNotExists({ id: config.COSMOSDB_SQL_API_CONTAINER_NAME });
                container = containerResult.container;
                return !!db;
            }
        } else {
            throw new Error("can't connect to database");
        }


    }

    // use Database
    const dbProcess = async (docs) => {

        // connect
        const db = await connectToDatabase();
        if (!db) throw Error("db not working")
        console.log("connected to " + config.COSMOSDB_SQL_API_DATABASE_NAME + "/" + config.COSMOSDB_SQL_API_CONTAINER_NAME)
        
        // insert new docs
        const insertResult = await insert(docs);
        console.log("inserted " + insertResult.length)

        // get all docs
        const findResult = await find(ALL_DOCS);
        console.log("found " + findResult.length);

        // remove all then make sure they are gone
        await remove(ALL_DOCS);
        const findResult3 = await find(ALL_DOCS);
        console.log("removed all, now have " + findResult3.length);

        return;

    }

    dbProcess(DATABASE_DOCS)
    .then(() => {
        console.log("done")
    }).catch(err => {
        console.log(err)
    })