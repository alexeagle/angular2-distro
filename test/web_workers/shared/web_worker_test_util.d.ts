import { MessageBusSink, MessageBusSource, MessageBus } from 'angular2/src/web_workers/shared/message_bus';
import { MockEventEmitter } from './mock_event_emitter';
import { NgZone } from 'angular2/src/core/zone/ng_zone';
/**
 * Returns two MessageBus instances that are attached to each other.
 * Such that whatever goes into one's sink comes out the others source.
 */
export declare function createPairedMessageBuses(): PairedMessageBuses;
export declare class PairedMessageBuses {
    ui: MessageBus;
    worker: MessageBus;
    constructor(ui: MessageBus, worker: MessageBus);
}
export declare class MockMessageBusSource implements MessageBusSource {
    private _channels;
    constructor(_channels: {
        [key: string]: MockEventEmitter;
    });
    initChannel(channel: string, runInZone?: boolean): void;
    from(channel: string): MockEventEmitter;
    attachToZone(zone: NgZone): void;
}
export declare class MockMessageBusSink implements MessageBusSink {
    private _channels;
    constructor(_channels: {
        [key: string]: MockEventEmitter;
    });
    initChannel(channel: string, runInZone?: boolean): void;
    to(channel: string): MockEventEmitter;
    attachToZone(zone: NgZone): void;
}
/**
 * Mock implementation of the {@link MessageBus} for tests.
 * Runs syncronously, and does not support running within the zone.
 */
export declare class MockMessageBus extends MessageBus {
    sink: MockMessageBusSink;
    source: MockMessageBusSource;
    constructor(sink: MockMessageBusSink, source: MockMessageBusSource);
    initChannel(channel: string, runInZone?: boolean): void;
    to(channel: string): MockEventEmitter;
    from(channel: string): MockEventEmitter;
    attachToZone(zone: NgZone): void;
}
