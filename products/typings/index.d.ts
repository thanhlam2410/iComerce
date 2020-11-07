declare module 'countly-sdk-nodejs' {
  type ServerInfo = {
    app_key: string;
    url: string;
    debug: boolean;
  };

  type Event = {
    key: string;
    count?: number;
    sum?: number;
    segmentation: { [key: string]: any };
  };

  export function init(info: ServerInfo): void;
  export function track_errors(): void;

  export function begin_session(noHeartBeat?: boolean): void;
  export function add_event(event: Event): void;
}
