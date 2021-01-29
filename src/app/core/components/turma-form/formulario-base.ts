import { FormBuilder, FormGroup } from '@angular/forms';

export class FormularioBase {

    public form: FormGroup;

    constructor(
        public formBuilder: FormBuilder,
    ) {
        
    }

    public viewForm() {
        console.log(this.form)
    }

    public formValido(): boolean {
        return this.form.valid;
    }

}