import * as React from 'react';
import { ISearchResultCardCompactProps } from './ISearchResultCardCompactProps';
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

export class SearchResultCardCompact extends React.Component<ISearchResultCardCompactProps, {
}> {
    constructor(props: ISearchResultCardCompactProps) {
        super(props);
    }

    public render(): React.ReactElement<ISearchResultCardCompactProps> {
        const people: IDocumentCardActivityPerson[] = [
            { name: this.props.item.Author, profileImageSrc: '' }
        ];
        
        return (
            <DocumentCard type={DocumentCardType.compact} onClickHref={this.props.item.Path}>
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