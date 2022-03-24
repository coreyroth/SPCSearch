import { getSP } from "./../pnpjsConfig";
import { SPFI } from "@pnp/sp";
import { ISearchQuery, SearchResults, ISort, SortDirection } from "@pnp/sp/search";

export class SearchService {
    private _sp: SPFI;

    constructor() {
        this._sp = getSP();
    }
    public async search(query: string): Promise<SearchResults> {
        try {
            console.log('SP - ', this._sp);
            let results: SearchResults = await this._sp.search(
                <ISearchQuery>{
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
            let results: SearchResults = await this._sp.search(
                <ISearchQuery>{
                    Querytext: query,
                    SortList: [
                        <ISort>{
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

    public async searchWithPaging(query: string, startRow: number, rowsPerPage: number): Promise<SearchResults> {
        try {
            let results: SearchResults = await this._sp.search(
                <ISearchQuery>{
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
            let results: SearchResults = await this._sp.search(
                <ISearchQuery>{
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