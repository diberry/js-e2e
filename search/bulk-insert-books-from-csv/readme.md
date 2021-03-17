# Bulk import

* Node 15+: [bulk_insert_books.js](bulk_insert_books.js): uses streams with promises from Node 15.
* Node 10,12,14: [bulk_insert_books_no_streams.js](bulk_insert_books_no_streams.js)

## Download the book catalog to your local computer

This tutorial uploads data directly into the Search Index from a comma-separated list (CSV) of books.

1. Open the [books.csv](https://raw.githubusercontent.com/zygmuntz/goodbooks-10k/master/books.csv) file and save the contents to the local repository's subdirectory location, `search-web/bulk-insert` with the same file name `books.csv`. 

1. In Visual Studio Code, right-click this subdirectory and open an integrated terminal. 

## Prepare the bulk import script for Search

The script uses the Azure SDK for Cognitive Search:

* [npm package @azure/search-documents](https://www.npmjs.com/package/@azure/search-documents)
* [Reference Documentation](/javascript/api/overview/azure/search-documents-readme)

1. In Visual Studio Code, open the `bulk_insert_books.js` file in the subdirectory,  `search-web/bulk-insert`, replace the following variables with your own values to authenticate with the Azure Search SDK:

    * YOUR-SEARCH-RESOURCE-NAME
    * YOUR-SEARCH-ADMIN-KEY

    :::code language="javascript" source="~/
azure-search-javascript-samples/search-website/bulk-insert/bulk_insert_books.js" highlight="13,14" :::

1. Open an integrated terminal in Visual Studio for the project directory's subdirectory, `search-web/bulk-insert`, and run the following command to install the dependencies. 

    ```bash
    npm install 
    ```