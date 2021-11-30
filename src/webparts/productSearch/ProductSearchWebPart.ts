import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { setup as pnpSetup } from "@pnp/common";

import * as strings from 'ProductSearchWebPartStrings';
import ProductSearch from './components/ProductSearch';
import { IProductSearchProps } from './components/IProductSearchProps';
import { SearchService } from './../../services/searchService/searchService';

export interface IProductSearchWebPartProps {
  description: string;
}

export default class ProductSearchWebPart extends BaseClientSideWebPart<IProductSearchWebPartProps> {
  protected onInit(): Promise<void> {

    return super.onInit().then(_ => {

      // other init code may be present

      pnpSetup({
        spfxContext: this.context
      });
    });
  }  public render(): void {
    let searchService: SearchService = new SearchService();

    const element: React.ReactElement<IProductSearchProps > = React.createElement(
      ProductSearch,
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
