import { Button } from 'antd';
import { useRouter } from 'next/navigation';
import { ArrowLeftOutlined } from '@ant-design/icons';

import styles from './styles.module.scss';

const Breadcrumb = ({ label }: { label: string }) => {
	const router = useRouter();

	const handleBack = () => {
		router.back();
	};

	return (
		<span className={styles.breadcrumb}>
			<ArrowLeftOutlined />
			<Button type="text" onClick={() => handleBack()}>
				{label}
			</Button>
		</span>
	);
};

export default Breadcrumb;
