import { FormGroup } from '@angular/forms';

export class FormularioStepBase {

    public formGroup: FormGroup;

    constructor(
        protected camposParaValidar: string[],
    ) { }

    public camposValidos() {
        const validacaoDosCampos = this.validarCampos();
        /* .every() -> testa se todos os elementos do array passam pelo teste */
        return validacaoDosCampos.every(valido => valido);
    }

    private validarCampos(): boolean[] {

        const formGroup = this.formGroup.controls;

        return this.camposParaValidar.map(campo => {
            formGroup[campo].updateValueAndValidity();
            formGroup[campo].markAsTouched();
            formGroup[campo].markAsDirty();

            return formGroup[campo].valid;
        });
    }
}