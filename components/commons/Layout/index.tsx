import React from 'react';
import { Col, Row, Card } from 'antd';

import styles from './styles.module.scss';

const Layout = ({ children }: { children: React.ReactNode }) => {
	return (
		<body>
			<Row className={styles.container}>
				<Col span={3}></Col>
				<Col span={21}>
					<Card className={styles.content} bordered={false}>
						{children}
					</Card>
				</Col>
			</Row>
		</body>
	);
};

export default Layout;
