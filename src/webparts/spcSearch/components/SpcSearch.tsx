import * as React from 'react';
import styles from './SpcSearch.module.scss';
import { ISpcSearchProps } from './ISpcSearchProps';
import { escape } from '@microsoft/sp-lodash-subset';

import { SearchBox } from 'office-ui-fabric-react/lib/SearchBox';
import { List } from 'office-ui-fabric-react/lib/List';
import { SearchResults, SearchResult } from '@pnp/sp';

import { SearchResultCard } from './SearchResultCard';


export default class SpcSearch extends React.Component<ISpcSearchProps, {
  query: string;
  searchResults: SearchResult[]
}> {

  constructor(props: ISpcSearchProps) {
    super(props);
    this.state = {
        query: undefined,
        searchResults: undefined
    };
}

  public render(): React.ReactElement<ISpcSearchProps> {
    return (
      <div className={ styles.spcSearch }>
        <SearchBox value={this.state.query} onSearch={this._pnSearch}
          onChange={newValue => {
            this.setState({
              query: newValue
            });
          }}
          />
          <List items={this.state.searchResults} onRenderCell={this._onRenderCell}></List>
      </div>
    );
  }

  public _pnSearch = async (): Promise<void> => {
    let results: SearchResults = await this.props.searchService.search(this.state.query);
    this.setState({
      searchResults: results.PrimarySearchResults
    });
  }

  private _onRenderCell = (item: any, index: number | undefined): JSX.Element => {
    // return <div>
    //   {item.Title}
    // </div>;
    return <SearchResultCard item={item} />;
  }
}
