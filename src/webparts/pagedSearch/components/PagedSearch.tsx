import * as React from 'react';
import styles from './PagedSearch.module.scss';
import { IPagedSearchProps } from './IPagedSearchProps';
import { SearchBox } from 'office-ui-fabric-react/lib/SearchBox';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import * as strings from 'PagedSearchWebPartStrings';

import { SearchResults, SearchResult } from '@pnp/sp';
import { Stack } from 'office-ui-fabric-react/lib/Stack';
import { MessageBar, MessageBarType } from 'office-ui-fabric-react/lib/MessageBar';
import { Spinner, SpinnerSize } from 'office-ui-fabric-react/lib/Spinner';

import { SearchResultCard } from './../../../components/SearchResultCard';

export default class PagedSearch extends React.Component<IPagedSearchProps, {
  query: string;
  page: number;
  lastPage: number;
  searchResults: SearchResults,
  loading: boolean;
}> {
  private defaultRowLimit: number = 10;

  constructor(props: IPagedSearchProps) {
    super(props);
    this.state = {
      query: undefined,
      page: 1,
      lastPage: undefined,
      searchResults: undefined,
      loading: false
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
              {this.state.searchResults.PrimarySearchResults.map(item => {
                return (
                  <SearchResultCard item={item} />
                );
              })}
            </div>
          }
        </Stack>
        {this.state.searchResults && this.state.searchResults.PrimarySearchResults && this.state.searchResults.PrimarySearchResults.length == 0 &&
            <MessageBar messageBarType={MessageBarType.warning}>
              {strings.NoSearchResults}
            </MessageBar>
          }
        {this.state.loading && 
          <Spinner size={SpinnerSize.medium} />
        }
        <div>
          {this.state.searchResults && this.state.searchResults.PrimarySearchResults && this.state.page > 1 && (
            <DefaultButton
            iconProps={{ iconName: 'ChevronLeft' }}
            text={strings.PreviousButton}
            primary={true}
            className={styles.pagingButton}
            onClick={this._onPreviousClicked}
          />
          )}
           {this.state.searchResults && this.state.searchResults.PrimarySearchResults && this.state.page < this.state.lastPage && (
            <DefaultButton
            iconProps={{ iconName: 'ChevronRight' }}
            text={strings.NextButton}
            primary={true}
            className={styles.pagingButton}
            onClick={this._onNextClicked}
          />
          )}
        </div>
      </div>
    );
  }

  public _pnSearch = async (): Promise<void> => {
    this.setState({
      loading: true
    });
    let results: SearchResults = await this.props.searchService.searchWithPaging(this.state.query, (this.state.page - 1) * this.defaultRowLimit, this.defaultRowLimit);
    this.setState({
      searchResults: results,
      lastPage: results.TotalRows / this.defaultRowLimit,
      loading: false
    });
  }

  private _onNextClicked = async (): Promise<any> => {
    this.setState({
      loading: true
    });

    let results = await this.state.searchResults.getPage(this.state.page + 1, this.defaultRowLimit);

    this.setState({
      page: this.state.page + 1,
      searchResults: results,
      loading: false
    });
  }

  private _onPreviousClicked = async (): Promise<any> => {
    if (this.state.page > 1) {
      this.setState({
        loading: true
      });
    }

    let results = await this.state.searchResults.getPage(this.state.page - 1, this.defaultRowLimit);

    this.setState({
      page: this.state.page - 1,
      searchResults: results,
      loading: false
    });
  }
}
