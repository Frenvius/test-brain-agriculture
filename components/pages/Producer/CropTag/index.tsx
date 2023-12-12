import React from 'react';
import { Tag } from 'antd';
import { useTranslations } from 'next-intl';

import styles from './styles.module.scss';
import { CropResponse } from '~/app/domain/response/CropResponse';

const CropTags = ({ crops }: { crops: CropResponse[] }) => {
	const t = useTranslations('producers');
	return (
		<span className={styles.container}>
			{crops?.map((crop: CropResponse, index: number) => (
				<Tag key={index} className={styles[`crop-${crop.label.toLowerCase()}`]} color="default">
					{t(`crops.${crop.label.toLowerCase()}`).toUpperCase()}
				</Tag>
			))}
		</span>
	);
};

export default CropTags;
