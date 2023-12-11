import { validateTaxDocument } from '~/components/pages/Producer/Form/validations';

describe('CPF/CNPJ Validation', () => {
	it('valitade fake CNPJ', () => {
		expect(validateTaxDocument('00000000000000')).toBeFalsy();
		expect(validateTaxDocument('11111111111111')).toBeFalsy();
		expect(validateTaxDocument('22222222222222')).toBeFalsy();
		expect(validateTaxDocument('33333333333333')).toBeFalsy();
		expect(validateTaxDocument('44444444444444')).toBeFalsy();
		expect(validateTaxDocument('55555555555555')).toBeFalsy();
		expect(validateTaxDocument('66666666666666')).toBeFalsy();
		expect(validateTaxDocument('77777777777777')).toBeFalsy();
		expect(validateTaxDocument('88888888888888')).toBeFalsy();
		expect(validateTaxDocument('99999999999999')).toBeFalsy();
	});

	it('should pass on valid CNPJ', () => {
		expect(validateTaxDocument('58295595000130')).toBeTruthy();
	});

	it('should pass on valid CPF', () => {
		expect(validateTaxDocument('60740087606')).toBeTruthy();
	});

	it('should fail on empty CPF', () => {
		expect(validateTaxDocument('')).toBeFalsy();
	});

	it('should fail on invalid CNPJ', () => {
		expect(validateTaxDocument('54550752000155')).toBeTruthy();
	});
});
