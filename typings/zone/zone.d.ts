declare module Zone {
	export class Stacktrace {
		constructor(e: Error);
		get(): string;
	}
}


declare class Zone {
	constructor(parentZone: Zone, data: any);
	fork(locals: any): Zone;
	bind(fn: Function, skipEnqueue: boolean): void;
	bindOnce(fn: Function): any;
	run(fn: Function, applyTo?: any, applyWith?: any): void;
	beforeTask(): void;
	onZoneCreated(): void;
	afterTask(): void;
	enqueueTask(): void;
	dequeueTask(): void;

	static patchSetClearFn(obj: Object, fnNames: any): string;
	static patchPrototype(obj: Object, fnNames: any): any;
	static bindArguments(args: any[]): any;
	static bindArgumentsOnce(args: any[]): any;
	static patchableFn(obj: Object, fnNames: any): any
	static patchProperty(obj: Object, prop: string): void;
	static patchProperties(obj: Object, properties: string[]): void;
	static patchEventTargetMethods(obj: Object): void;
	static patch(): void;
	static canPatchViaPropertyDescriptor(): boolean;
	static patchViaPropertyDescriptor(): void;
	static patchViaCapturingAllTheEvents(): void;
	static patchWebSocket(): void;
	static patchClass(className: string): void;
	static patchMutationObserverClass(className: string): void;
	static patchDefineProperty(): void;
	static patchRegisterElement(): void;
	static eventNames: string;
	static onEventNames: string;
	static init(): void;
	static exceptZone: {
        boringZone: Zone;
        interestingZone: Zone,
        beforeTask: () => void;
        afterTask: () => void;
        fork: (ops: any) => Zone;
	};
	static longStackTraceZone: {
		getLongStacktrace(exception: any): string;
		stackFramesFilter(line: string): boolean;
		onError(exception: any): void;
		fork(locals: any): Zone;
	};
	static getStacktrace(): Zone.Stacktrace;
	static countingZone: {
		'+enqueueTask': () => void;
		'-dequeueTask': () => void;
		'+afterTask': () => void;
		counter: () => void;
		data: {
			count: number;
			flushed: boolean;
		};
		onFlush: () => void;
	};
}
