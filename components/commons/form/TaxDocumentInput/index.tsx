import React from 'react';
import ReactInputMask from 'react-input-mask';

import { TaxDocumentInputProps } from './types';

const CpfCnpjInput: React.FC<TaxDocumentInputProps> = ({ children, ...props }) => {
	const { value, onChange } = props;
	const cpfMask = '999.999.999-99';
	const cnpjMask = '99.999.999/9999-99';

	const cleanValue = value && value.replace(/\D/g, '');
	const mask = cleanValue.slice(8, 11) !== '000' ? cpfMask : cnpjMask;

	return (
		<ReactInputMask mask={mask} value={value} onChange={onChange}>
			{children}
		</ReactInputMask>
	);
};

export default CpfCnpjInput;
