import React from 'react';
import { Tag } from 'antd';
import { useTranslations } from 'next-intl';

import styles from './styles.module.scss';

const CropTag = ({ crop }: { crop: string }) => {
	const t = useTranslations('producers');
	return (
		<span className={styles.container}>
			<Tag className={styles[`crop-${crop.toLowerCase()}`]} color="default">
				{t(`crops.${crop.toLowerCase()}`).toUpperCase()}
			</Tag>
		</span>
	);
};

export default CropTag;
