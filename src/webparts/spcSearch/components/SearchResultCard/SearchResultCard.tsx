import * as React from 'react';
import { ISearchResultCardProps } from './ISearchResultCardProps';
import * as strings from 'SpcSearchWebPartStrings';
import styles from './SearchResultCard.module.scss';
import { SearchResult } from '@pnp/sp';

import {
    DocumentCard,
    DocumentCardActivity,
    DocumentCardDetails,
    DocumentCardPreview,
    DocumentCardTitle,
    IDocumentCardPreviewProps,
    DocumentCardType,
    IDocumentCardActivityPerson,
    DocumentCardImage,
  } from 'office-ui-fabric-react/lib/DocumentCard';
  import { ImageFit } from 'office-ui-fabric-react/lib/Image';

export class SearchResultCard extends React.Component<ISearchResultCardProps, {
}> {
    constructor(props: ISearchResultCardProps) {
        super(props);
    }

    public render(): React.ReactElement<ISearchResultCardProps> {
        return (
            <DocumentCard type={DocumentCardType.normal} onClickHref={this.props.item.Path}>
                {/* <DocumentCardImage imageSrc={this.props.item.PictureThumbnailURL} /> */}
                <DocumentCardPreview previewImages={
                    [
                        {
                            name: this.props.item.Title,
                            previewImageSrc: this.props.item.PictureThumbnailURL,
                            imageFit: ImageFit.cover,
                            width: 318,
                            height: 196
                        }
                    ]
                } />
                <DocumentCardDetails>
                    <DocumentCardTitle title={this.props.item.Title}  />
                </DocumentCardDetails>
            </DocumentCard>
        )
    }
}