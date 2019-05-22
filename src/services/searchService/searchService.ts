import { sp, SearchQuery, SearchResults, Sort, SortDirection  } from "@pnp/sp";
import { dateAdd } from "@pnp/common";

export class SearchService {

    public async search(query: string): Promise<SearchResults> {
        try {
            let results: SearchResults = await sp.search(
                <SearchQuery>{
                    Querytext: query
                }
            );

            console.log("Results - ", results);
            return results;
        }
        catch (error) {
            console.error("Error executing search query - ", error);
            throw error;
          }
    }

    public async searchWithSorting(query: string, sort: string, descending: boolean): Promise<SearchResults> {
        try {
            let results: SearchResults = await sp.search(
                <SearchQuery>{
                    Querytext: query,
                    SortList: [
                        <Sort>{
                            Property: sort,
                            Direction: (descending) ? SortDirection.Descending : SortDirection.Ascending
                        }
                    ]
                }
            );

            console.log("Results - ", results);
            return results;
        }
        catch (error) {
            console.error("Error executing search query - ", error);
            throw error;
          }
    }

    public async searchWithCaching(query: string, sort: string, descending: boolean): Promise<SearchResults> {
        try {
            let results: SearchResults = await sp.searchWithCaching(
                <SearchQuery>{
                    Querytext: query,
                    SortList: [
                        <Sort>{
                            Property: sort,
                            Direction: (descending) ? SortDirection.Descending : SortDirection.Ascending
                        }
                    ]
                }
            );

            console.log("Results - ", results);
            return results;
        }
        catch (error) {
            console.error("Error executing search query - ", error);
            throw error;
          }
    }

    public async searchWithCachingCustom(query: string, sort: string, descending: boolean, minutes: number): Promise<SearchResults> {
        try {
            let results: SearchResults = await sp.searchWithCaching(
                <SearchQuery>{
                    Querytext: query,
                    SortList: [
                        <Sort>{
                            Property: sort,
                            Direction: (descending) ? SortDirection.Descending : SortDirection.Ascending
                        }
                    ]
                },
                {
                    key: `my-key-${query}`,
                    expiration: dateAdd(new Date(), "minute", minutes),
                    storeName: 'local'
                }
            );

            console.log("Results - ", results);
            return results;
        }
        catch (error) {
            console.error("Error executing search query - ", error);
            throw error;
          }
    }

    public async searchWithPaging(query: string, startRow: number, rowsPerPage: number): Promise<SearchResults> {
        try {
            let results: SearchResults = await sp.search(
                <SearchQuery>{
                    Querytext: query,
                    RowsPerPage: rowsPerPage,
                    RowLimit: rowsPerPage,
                    StartRow: startRow,
                }
            );

            console.log("Results - ", results);
            return results;
        }
        catch (error) {
            console.error("Error executing search query - ", error);
            throw error;
          }
    }

    public async productSearch(query: string, queryTemplate: string): Promise<SearchResults> {
        try {
            let results: SearchResults = await sp.search(
                <SearchQuery>{
                    Querytext: query,
                    QueryTemplate: queryTemplate,
                    SelectProperties: ['Title', 'Author', 'Write', 'ProductCode', 'ProductColor'],
                    RowLimit: 50,
                }
            );

            console.log("Results - ", results);
            return results;
        }
        catch (error) {
            console.error("Error executing search query - ", error);
            throw error;
          }
    }
}