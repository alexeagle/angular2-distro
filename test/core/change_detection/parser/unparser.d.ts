import { AST, AstVisitor, PropertyRead, PropertyWrite, Binary, Chain, Conditional, If, BindingPipe, FunctionCall, ImplicitReceiver, Interpolation, KeyedRead, KeyedWrite, LiteralArray, LiteralMap, LiteralPrimitive, MethodCall, PrefixNot, SafePropertyRead, SafeMethodCall } from 'angular2/src/core/change_detection/parser/ast';
export declare class Unparser implements AstVisitor {
    private static _quoteRegExp;
    private _expression;
    unparse(ast: AST): string;
    visitPropertyRead(ast: PropertyRead): void;
    visitPropertyWrite(ast: PropertyWrite): void;
    visitBinary(ast: Binary): void;
    visitChain(ast: Chain): void;
    visitConditional(ast: Conditional): void;
    visitIf(ast: If): void;
    visitPipe(ast: BindingPipe): void;
    visitFunctionCall(ast: FunctionCall): void;
    visitImplicitReceiver(ast: ImplicitReceiver): void;
    visitInterpolation(ast: Interpolation): void;
    visitKeyedRead(ast: KeyedRead): void;
    visitKeyedWrite(ast: KeyedWrite): void;
    visitLiteralArray(ast: LiteralArray): void;
    visitLiteralMap(ast: LiteralMap): void;
    visitLiteralPrimitive(ast: LiteralPrimitive): void;
    visitMethodCall(ast: MethodCall): void;
    visitPrefixNot(ast: PrefixNot): void;
    visitSafePropertyRead(ast: SafePropertyRead): void;
    visitSafeMethodCall(ast: SafeMethodCall): void;
    private _visit(ast);
    private _visitExpOrBlock(ast);
}
