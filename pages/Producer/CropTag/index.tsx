import React from 'react';
import { Tag } from 'antd';
import { useTranslations } from 'next-intl';

import styles from './styles.module.scss';
import { CropResponse } from '~/app/domain/response/CropResponse';

const CropTag = ({ crop }: { crop: CropResponse }) => {
	const t = useTranslations('producers');
	return (
		<span className={styles.container}>
			<Tag className={styles[`crop-${crop.label.toLowerCase()}`]} color="default">
				{t(`crops.${crop.label.toLowerCase()}`).toUpperCase()}
			</Tag>
		</span>
	);
};

export default CropTag;
