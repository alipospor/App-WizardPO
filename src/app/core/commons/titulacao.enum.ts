import { PoSelectOption } from '@po-ui/ng-components';

export class TitulacaoEnum {


    static values = [
        TitulacaoEnum.GRADUACAO(),
        TitulacaoEnum.ESPECIALIZACAO(),
        TitulacaoEnum.MESTRE(),
        TitulacaoEnum.DOUTOR()
    ];

    static GRADUACAO(): PoSelectOption {
        return { value: 'GRADUAÇÃO', label: 'Graduação' };
    }

    static ESPECIALIZACAO(): PoSelectOption {
        return { value: 'ESPECIALIZAÇÃO', label: 'Especialização' };
    }

    static MESTRE(): PoSelectOption {
        return { value: 'MESTRE', label: 'Mestre' };
    }

    static DOUTOR(): PoSelectOption {
        return { value: 'DOUTOR', label: 'Doutor' };
    }

}