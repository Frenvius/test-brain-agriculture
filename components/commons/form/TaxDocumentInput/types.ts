import React from 'react';

export interface TaxDocumentInputProps {
	value: string;
	children?: React.ReactNode;
	onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
