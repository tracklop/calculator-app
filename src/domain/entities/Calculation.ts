export type Operator = '+' | '-' | '*' | '/';
export class Calculation {
    public readonly operand1: number;
    public readonly operand2: number;
    public readonly operator: Operator;
    public readonly result: number;
    public readonly timestamp: Date;

    constructor(operand1: number, operand2: number, operator: Operator, result: number, timestamp?: Date) {
        this.operand1 = operand1;
        this.operand2 = operand2;
        this.operator = operator;
        this.result = result;
        this.timestamp = timestamp ?? new Date();
    }

    public toString(): string {
        return `${this.operand1} ${this.operator} ${this.operand2} = ${this.result}`;
    }
}
