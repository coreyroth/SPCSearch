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

    public async searchWithCaching(query: string): Promise<SearchResults> {
        try {
            let results: SearchResults = await sp.searchWithCaching(
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

    public async searchWithCachingCustom(query: string, minutes: number): Promise<SearchResults> {
        try {
            let results: SearchResults = await sp.searchWithCaching(
                <SearchQuery>{
                    Querytext: query
                },
                {
                    key: `my-key-${query}`,
                    expiration: dateAdd(new Date(), "minute", minutes)
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
                    QueryTemplate: queryTemplate
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