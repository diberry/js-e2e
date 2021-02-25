// e2e test
const data = require('./cosmosdb-sql-api');
const expect = require('expect');

const DATABASE_DOCS = [{ name: "Joe", job: "banking" }, { name: "Jack", job: "security"}, { name: "Jill", job: "pilot" }];
const ALL_DOCS = null;


const dbProcess = async (data, docs) => {
    
    await data.connectToDatabase();

    // insert new docs
    const insertResult = await data.insert(docs);
    expect(insertResult.length).toEqual(3);

    // get first ID of array to delete later
    const id = insertResult[0].id;;

    // get all docs
    const findResult = await data.find(ALL_DOCS);
    expect(findResult.length).toEqual(3);

    // remove 1 then get all
    await data.remove(id);
    const findResult2 = await data.find(ALL_DOCS);
    expect(findResult2.length).toEqual(DATABASE_DOCS.length - 1);

    // remove all then make sure they are gone
    await data.remove(ALL_DOCS);
    const findResult3 = await data.find(ALL_DOCS);
    expect(findResult3.length).toEqual(0);

    return;

}

dbProcess(data, DATABASE_DOCS)
.then(() => console.log("done"))
.catch(err=>console.log)