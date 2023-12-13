import { FormInstance } from 'antd';

import { producerService } from '~/app/usecase/service/producer/service';
import { ProducerFormState } from '~/components/pages/Producer/Form/types';

export const normalizeString = (value: string) => {
	return value.replace(/[^A-Za-z \u00C0-\u00FF\u0300-\u036f´˜^'~`¨]+/g, '');
};

export const validateCPFString = async (data: ProducerFormState | null, form: FormInstance, t: any) => {
	const cleanedInput = form.getFieldValue('taxDocument')?.replace(/\D/g, '');
	const isCNPJ = cleanedInput?.length > 11;
	const complete = cleanedInput?.length === 11 || cleanedInput?.length === 14;
	const isValid = validateTaxDocument(cleanedInput!);
	if (!data && complete && isValid) {
		const response = await producerService.search({ query: { taxDocument: cleanedInput } });
		return response.items?.length > 0 ? Promise.reject(new Error(t('messages.taxDocument.alreadyExists'))) : Promise.resolve();
	}
	if (!cleanedInput || isValid) return Promise.resolve();
	return Promise.reject(new Error(isCNPJ ? t('messages.taxDocument.invalidCNPJ') : t('messages.taxDocument.invalidCPF')));
};

export const validateAreaInput = (form: FormInstance, t: any) => {
	const totalArea = form.getFieldValue('area');
	const arableArea = form.getFieldValue('usefulArea');
	const vegetationArea = form.getFieldValue('vegetationArea');

	if (totalArea && arableArea && vegetationArea) {
		const total = Number(arableArea) + Number(vegetationArea);
		if (total > Number(totalArea)) {
			return Promise.reject(new Error(t('messages.area')));
		}
	}
	return Promise.resolve();
};

export const validateTaxDocument = (input: string): boolean => {
	if (input.length > 11) return validateCNPJ(input);

	return isValidCPF(input);
};

const isValidCPF = (cpf: string): boolean => {
	if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) {
		return false;
	}

	const calculateDigit = (cpf: string, factor: number): number => {
		let total = 0;
		for (const digit of cpf) {
			if (factor > 1) total += parseInt(digit) * factor--;
		}
		const remainder = total % 11;
		return remainder < 2 ? 0 : 11 - remainder;
	};

	const digit1 = calculateDigit(cpf.substring(0, 9), 10);
	const digit2 = calculateDigit(cpf.substring(0, 9) + digit1, 11);

	return digit1 === parseInt(cpf.charAt(9)) && digit2 === parseInt(cpf.charAt(10));
};

const validateCNPJ = (cnpj: string): boolean => {
	const factor = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];

	if (cnpj.length !== 14) return false;
	if (/0{14}/.test(cnpj)) return false;

	let sum = 0;
	for (let i = 0; i < 12; i++) {
		sum += parseInt(cnpj[i]) * factor[i + 1];
	}
	if (parseInt(cnpj[12]) !== ((sum %= 11) < 2 ? 0 : 11 - sum)) return false;

	sum = 0;
	for (let i = 0; i <= 12; i++) {
		sum += parseInt(cnpj[i]) * factor[i];
	}

	return parseInt(cnpj[13]) === ((sum %= 11) < 2 ? 0 : 11 - sum);
};
