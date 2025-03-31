const TYPES = {
    // Services
    ICalculatorService: Symbol.for('ICalculatorService'),
    ICalculationHistoryService: Symbol.for('ICalculationHistoryService'),

    // UseCases
    PerformCalculationUseCase: Symbol.for('PerformCalculationUseCase'),
    SaveCalculationToHistoryUseCase: Symbol.for('SaveCalculationToHistoryUseCase'),
    GetCalculationHistoryUseCase: Symbol.for('GetCalculationHistoryUseCase'),
    CloneAndRecalculateUseCase: Symbol.for('CloneAndRecalculateUseCase'),

    // Proxies
    PerformCalculationUseCaseProxy: Symbol.for('PerformCalculationUseCaseProxy'),
    SaveCalculationToHistoryUseCaseProxy: Symbol.for('SaveCalculationToHistoryUseCaseProxy'),
    GetCalculationHistoryUseCaseProxy: Symbol.for('GetCalculationHistoryUseCaseProxy'),
    CloneAndRecalculateUseCaseProxy: Symbol.for('CloneAndRecalculateUseCaseProxy'),
};

export default TYPES;
