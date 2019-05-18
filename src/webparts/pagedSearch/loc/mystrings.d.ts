declare interface IPagedSearchWebPartStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  DescriptionFieldLabel: string;
  PreviousButton: string;
  NextButton: string;
  NoSearchResults: string;
}

declare module 'PagedSearchWebPartStrings' {
  const strings: IPagedSearchWebPartStrings;
  export = strings;
}
