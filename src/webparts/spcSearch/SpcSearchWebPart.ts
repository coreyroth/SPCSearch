import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';

import * as strings from 'SpcSearchWebPartStrings';
import SpcSearch from './components/SpcSearch';
import { ISpcSearchProps } from './components/ISpcSearchProps';
import { SearchService } from './../../services/searchService/searchService';
import { getSP } from './../../services/pnpjsConfig';

export interface ISpcSearchWebPartProps {
  description: string;
}

export default class SpcSearchWebPart extends BaseClientSideWebPart<ISpcSearchWebPartProps> {
  protected onInit(): Promise<void> {

    return super.onInit().then(_ => {

      getSP(this.context);
    });
  }
  
  public render(): void {
    let searchService: SearchService = new SearchService();

    const element: React.ReactElement<ISpcSearchProps > = React.createElement(
      SpcSearch,
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
