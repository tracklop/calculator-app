export type Operator = '+' | '-' | '*' | '/';

export class Calculation {
    public readonly operand1: number;
    public readonly operand2: number;
    public readonly operator: Operator;
    public readonly result: number;
    public readonly timestamp: Date;

    constructor(operand1: number, operand2: number, operator: Operator, timestamp?: Date) {
        if (!['+', '-', '*', '/'].includes(operator)) {
            throw new Error(`Invalid operator: ${operator}`);
        }

        if (operator === '/' && operand2 === 0) {
            throw new Error('Division by zero is not allowed.');
        }

        this.operand1 = operand1;
        this.operand2 = operand2;
        this.operator = operator;
        this.result = this.calculateResult();
        this.timestamp = timestamp ?? new Date();
    }

    private calculateResult(): number {
        switch (this.operator) {
            case '+':
                return this.operand1 + this.operand2;
            case '-':
                return this.operand1 - this.operand2;
            case '*':
                return this.operand1 * this.operand2;
            case '/':
                return this.operand1 / this.operand2;
        }
    }

    public toString(): string {
        return `${this.operand1} ${this.operator} ${this.operand2} = ${this.result}`;
    }
}
