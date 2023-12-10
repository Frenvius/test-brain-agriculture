import { Button } from 'antd';
import { useRouter } from 'next/navigation';
import { ArrowLeftOutlined } from '@ant-design/icons';

import styles from './styles.module.scss';

const Breadcrumb = ({ label, link }: { label: string; link?: string }) => {
	const router = useRouter();

	const handleBack = () => {
		link ? router.push(link) : router.back();
	};

	return (
		<span className={styles.breadcrumb}>
			<ArrowLeftOutlined onClick={() => handleBack()} />
			<Button type="text" onClick={() => handleBack()}>
				{label}
			</Button>
		</span>
	);
};

export default Breadcrumb;
