import * as React from 'react';
import styles from './PagedSearch.module.scss';
import { IPagedSearchProps } from './IPagedSearchProps';
import { SearchBox } from 'office-ui-fabric-react/lib/SearchBox';

import { SearchResults, SearchResult } from '@pnp/sp';
import { Stack } from 'office-ui-fabric-react/lib/Stack';

import { SearchResultCard } from './../../../components/SearchResultCard';

export default class PagedSearch extends React.Component<IPagedSearchProps, {
  query: string;
  page: number;
  searchResults: SearchResult[],
  loading: boolean;
}> {
  private defaultRowLimit: number = 10;

  constructor(props: IPagedSearchProps) {
    super(props);
    this.state = {
      query: undefined,
      page: 1,
      searchResults: undefined,
      loading: true
    };
  }

  public render(): React.ReactElement<IPagedSearchProps> {
    return (
      <div className={styles.pagedSearch}>
        <SearchBox value={this.state.query} onSearch={this._pnSearch}
          onChange={newValue => {
            this.setState({
              query: newValue
            });
          }}
        />
        <Stack padding={10}>
          {!this.state.loading && this.state.searchResults &&
            <div>
              {this.state.searchResults.map(item => {
                return (
                  <SearchResultCard item={item} />
                );
              })}
            </div>
          }
        </Stack>
      </div>
    );
  }

  public _pnSearch = async (): Promise<void> => {
    this.setState({
      loading: true
    });
    let results: SearchResults = await this.props.searchService.searchWithPaging(this.state.query, (this.state.page - 1) * this.defaultRowLimit, this.defaultRowLimit);
    console.log('Results 2- ', results);
    this.setState({
      searchResults: results.PrimarySearchResults,
      loading: false
    });
  }
}
