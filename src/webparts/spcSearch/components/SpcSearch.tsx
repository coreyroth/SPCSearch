import * as React from 'react';
import styles from './SpcSearch.module.scss';
import { ISpcSearchProps } from './ISpcSearchProps';
import * as strings from 'SpcSearchWebPartStrings';

import { SearchBox } from 'office-ui-fabric-react/lib/SearchBox';
import { List } from 'office-ui-fabric-react/lib/List';
import { SearchResults, SearchResult } from '@pnp/sp';
import { MessageBar, MessageBarType } from 'office-ui-fabric-react/lib/MessageBar';

import { SearchResultCard } from './../../../components/SearchResultCard';
import { SearchResultCardCompact } from './../../../components/SearchResultCardCompact';

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
        <SearchBox value={this.state.query} onSearch={this._onSearch}
          onChange={newValue => {
            this.setState({
              query: newValue
            });
          }}
          />
          <List items={this.state.searchResults} onRenderCell={this._onRenderCell}></List>
          {this.state.searchResults && this.state.searchResults.length == 0 &&
            <MessageBar messageBarType={MessageBarType.warning}>
              {strings.NoSearchResults}
            </MessageBar>
          } 
      </div>
    );
  }

  public _onSearch = async (): Promise<void> => {
    let results: SearchResults = await this.props.searchService.search(this.state.query);
    this.setState({
      searchResults: results.PrimarySearchResults
    });
  }
  
  private _onRenderCell = (item: any, index: number | undefined): JSX.Element => {
    return <div>
      {item.Title}
    </div>;
    // return <div className={styles.marginTop}>
    //   <SearchResultCard item={item} />
    //   </div>;
    // return <div className={styles.marginTop}>
    // <SearchResultCardCompact item={item} />
    // </div>;  
  }
}
