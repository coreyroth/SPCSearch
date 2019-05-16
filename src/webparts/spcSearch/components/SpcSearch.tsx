import * as React from 'react';
import styles from './SpcSearch.module.scss';
import { ISpcSearchProps } from './ISpcSearchProps';
import { escape } from '@microsoft/sp-lodash-subset';

import { SearchBox, ISearchBox } from 'office-ui-fabric-react/lib/SearchBox';


export default class SpcSearch extends React.Component<ISpcSearchProps, {
  query: string;
}> {

  constructor(props: ISpcSearchProps) {
    super(props);
    this.state = {
        query: undefined
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
      </div>
    );
  }

  public _pnSearch = async (): Promise<void> => {
    this.props.searchService.search(this.state.query);
  }
}
