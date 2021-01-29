import { FormGroup } from '@angular/forms';

export class FormularioStepBase {

    public formGroup: FormGroup;

    constructor(
        protected camposParaValidar: string[]
    ) { }

    public camposValidos() {
        const validacaoDosCampos = this.validarCampos()

        /* .every() -> testa se todos os elementos do array passam pelo teste */
        return validacaoDosCampos.every(valido => {
            return valido == true
        });
    }

    private validarCampos(): boolean[] {

        const formGroup = this.formGroup.controls;

        return this.camposParaValidar.map(campo => {

            return formGroup[campo].valid;
        });
    }
}