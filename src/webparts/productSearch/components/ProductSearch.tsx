import * as React from 'react';
import styles from './ProductSearch.module.scss';
import { IProductSearchProps } from './IProductSearchProps';
import { SearchResults, SearchResult } from '@pnp/sp';
import { SearchBox } from 'office-ui-fabric-react/lib/SearchBox';
import { SearchService } from "../../../services/searchService/searchService";
import { DetailsList, DetailsListLayoutMode, Selection, SelectionMode, IColumn } from 'office-ui-fabric-react/lib/DetailsList';


export default class ProductSearch extends React.Component<IProductSearchProps, {
  query: string;
  searchResults: SearchResult[]
}> {
  constructor(props: IProductSearchProps) {
    super(props);
    this.state = {
        query: undefined,
        searchResults: undefined
    };
}
  public render(): React.ReactElement<IProductSearchProps> {
    return (
      <div className={ styles.productSearch }>
        <SearchBox value={this.state.query} onSearch={this._pnSearch}
          onChange={newValue => {
            this.setState({
              query: newValue
            });
          }}
          />
      </div>
    );
  }

  public _pnSearch = async (): Promise<void> => {
    let listUrl: string = 'https://m365x301749.sharepoint.com/sites/Marketing/Lists/Product%20List';
    let results: SearchResults = await this.props.searchService.productSearch(this.state.query, `{searchTerms} ${listUrl}`);    
    this.setState({
      searchResults: results.PrimarySearchResults
    });
  }
}
