import { ElementFinder } from 'protractor';

export interface TermosDeBusca {
    elementoPai: ElementFinder | undefined;
    termo: string | undefined;
    teclas: Array<string> | undefined;
}