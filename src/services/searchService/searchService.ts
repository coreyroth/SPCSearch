import { sp, SearchQuery, SearchResults, Sort, SortDirection  } from "@pnp/sp";

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