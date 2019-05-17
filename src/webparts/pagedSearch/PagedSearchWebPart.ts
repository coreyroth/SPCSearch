import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';

import * as strings from 'PagedSearchWebPartStrings';
import PagedSearch from './components/PagedSearch';
import { IPagedSearchProps } from './components/IPagedSearchProps';
import { SearchService } from './../../services/searchService/searchService';

export interface IPagedSearchWebPartProps {
  description: string;
}

export default class PagedSearchWebPart extends BaseClientSideWebPart<IPagedSearchWebPartProps> {

  public render(): void {
    let searchService: SearchService = new SearchService();

    const element: React.ReactElement<IPagedSearchProps > = React.createElement(
      PagedSearch,
      {
        searchService: searchService
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
