import * as React from 'react';
import styles from './ProductSearch.module.scss';
import { IProductSearchProps } from './IProductSearchProps';
import { SearchResults, SearchResult } from '@pnp/sp';
import { SearchBox } from 'office-ui-fabric-react/lib/SearchBox';
import { SearchService } from "../../../services/searchService/searchService";
import { DetailsList, DetailsListLayoutMode, Selection, SelectionMode, IColumn } from 'office-ui-fabric-react/lib/DetailsList';


export default class ProductSearch extends React.Component<IProductSearchProps, {
  query: string,
  searchResults: SearchResult[],
  loading: boolean
}> {
  private _columns: IColumn[];

  constructor(props: IProductSearchProps) {
    super(props);
    this.state = {
        query: '',
        searchResults: undefined,
        loading: false
    };

    this._onSearch();
}
  public render(): React.ReactElement<IProductSearchProps> {
    this._columns = [
      { key: 'title', name: 'Title', fieldName: 'Title', minWidth: 100, maxWidth: 200, isResizable: true },
      { key: 'author', name: 'Author', fieldName: 'Author', minWidth: 100, maxWidth: 200, isResizable: true },
      { key: 'write', name: 'Write', fieldName: 'Write', minWidth: 100, maxWidth: 200, isResizable: true }
    ];
    return (
      <div className={ styles.productSearch }>
        <SearchBox value={this.state.query} onSearch={this._onSearch}
          onChange={newValue => {
            this.setState({
              query: newValue
            });
          }}
          />
          {!this.state.loading && this.state.searchResults &&
            <DetailsList items={this.state.searchResults} columns={this._columns} >
            </DetailsList>
          }
      </div>
    );
  }

  public _onSearch = async (): Promise<void> => {
    let listUrl: string = 'https://m365x301749.sharepoint.com/sites/Marketing/Lists/Product%20List';
    let results: SearchResults = await this.props.searchService.productSearch(this.state.query, `{searchTerms} site:${listUrl}`);    
    this.setState({
      searchResults: results.PrimarySearchResults
    });
  }
}
