import * as React from 'react';
import { ISearchResultCardProps } from './ISearchResultCardProps';
import * as strings from 'SpcSearchWebPartStrings';
import styles from './SearchResultCard.module.scss';

import {
    DocumentCard,
    DocumentCardActivity,
    DocumentCardDetails,
    DocumentCardPreview,
    DocumentCardTitle,
    DocumentCardType,
    IDocumentCardActivityPerson,
  } from 'office-ui-fabric-react/lib/DocumentCard';
  import { ImageFit } from 'office-ui-fabric-react/lib/Image';

export class SearchResultCard extends React.Component<ISearchResultCardProps, {
}> {
    constructor(props: ISearchResultCardProps) {
        super(props);
    }

    public render(): React.ReactElement<ISearchResultCardProps> {
        const people: IDocumentCardActivityPerson[] = [
            { name: this.props.item.Author, profileImageSrc: '' }
        ];
        
        return (
            <DocumentCard type={DocumentCardType.normal} onClickHref={this.props.item.Path}>
                <DocumentCardPreview previewImages={
                    [
                        {
                            name: this.props.item.Title,
                            previewImageSrc: (this.props.item.PictureThumbnailURL) ? this.props.item.PictureThumbnailURL : this.props.item.ServerRedirectedPreviewURL,
                            imageFit: ImageFit.cover,
                            width: 318,
                            height: 196
                        }
                    ]
                } />
                <DocumentCardDetails>
                    <DocumentCardTitle title={this.props.item.Title}  />
                    <DocumentCardActivity activity={this.props.item.Description} people={people} />
                </DocumentCardDetails>
            </DocumentCard>
        );
    }
}