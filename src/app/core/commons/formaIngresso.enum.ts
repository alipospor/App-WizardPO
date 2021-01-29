import { PoSelectOption } from '@po-ui/ng-components';

export class FormaIngressoEnum {

    static values = [
        FormaIngressoEnum.ENADE(),
        FormaIngressoEnum.VESTIBULAR(),
        FormaIngressoEnum.ENEM()
    ];

    private constructor() {

    }

    static ENADE(): PoSelectOption {
        return { value: 'ENADE', label: 'Enade' };
    }

    static VESTIBULAR(): PoSelectOption {
        return { value: 'VESTIBULAR', label: 'Vestibular' };
    }

    static ENEM(): PoSelectOption {
        return { value: 'ENEM', label: 'Enem' };
    }
}